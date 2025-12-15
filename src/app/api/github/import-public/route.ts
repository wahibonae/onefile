import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import {
  ALLOWED_EXTENSIONS,
  IGNORED_PATHS,
  DOCUMENT_EXTENSIONS,
} from "@/constants/files";

// Size limits for security
const MAX_ZIP_SIZE = 100 * 1024 * 1024; // 100MB max download
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_FILES = 500; // Max files to process

interface ImportedFile {
  path: string;
  content?: string;
  base64Content?: string;
  needsExtraction?: boolean;
}

// Parse GitHub URL to extract owner/repo
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  // Handle formats:
  // - https://github.com/owner/repo
  // - https://github.com/owner/repo/
  // - https://github.com/owner/repo.git
  // - https://github.com/owner/repo/tree/branch
  // - github.com/owner/repo
  const patterns = [
    /^https?:\/\/github\.com\/([^/]+)\/([^/.\s]+)/,
    /^github\.com\/([^/]+)\/([^/.\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.trim().match(pattern);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
    }
  }
  return null;
}

// Check if file path should be ignored
function shouldIgnorePath(filePath: string): boolean {
  const parts = filePath.split("/");
  return parts.some((part) => IGNORED_PATHS.has(part));
}

// Check if file extension is allowed
function isExtensionAllowed(filePath: string): boolean {
  const parts = filePath.split(".");
  if (parts.length < 2) return false;
  const extension = "." + parts.pop()?.toLowerCase();
  return ALLOWED_EXTENSIONS.has(extension);
}

// Check if file is a document that needs extraction
function isDocumentFile(filePath: string): boolean {
  const parts = filePath.split(".");
  if (parts.length < 2) return false;
  const extension = "." + parts.pop()?.toLowerCase();
  return DOCUMENT_EXTENSIONS.has(extension);
}

// Simple GitignoreParser for server-side use
class ServerGitignoreParser {
  private patterns: Array<{ regex: RegExp; isNegation: boolean }> = [];

  addRules(content: string): void {
    const lines = content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      let pattern = trimmed;
      let isNegation = false;

      if (pattern.startsWith("!")) {
        isNegation = true;
        pattern = pattern.substring(1);
      }

      // Remove trailing slash for directory patterns
      pattern = pattern.replace(/\/$/, "");

      // Convert gitignore pattern to regex
      const regexPattern = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*\*/g, "{{GLOBSTAR}}")
        .replace(/\*/g, "[^/]*")
        .replace(/\?/g, "[^/]")
        .replace(/{{GLOBSTAR}}/g, ".*");

      try {
        this.patterns.push({
          regex: new RegExp(`(^|/)${regexPattern}(/|$)`),
          isNegation,
        });
      } catch {
        // Invalid pattern, skip
      }
    }
  }

  shouldIgnore(path: string): boolean {
    let ignored = false;
    for (const { regex, isNegation } of this.patterns) {
      if (regex.test(path)) {
        ignored = !isNegation;
      }
    }
    return ignored;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Parse the GitHub URL
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid GitHub URL. Expected format: github.com/owner/repo" },
        { status: 400 }
      );
    }

    const { owner, repo } = parsed;

    // Try to download ZIP (main branch first, then master)
    let zipBuffer: ArrayBuffer | null = null;
    let successfulBranch = "";

    for (const branch of ["main", "master"]) {
      const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;

      try {
        const response = await fetch(zipUrl, {
          headers: {
            "User-Agent": "OneFile-App/1.0",
          },
        });

        if (response.ok) {
          // Check content length
          const contentLength = response.headers.get("content-length");
          if (contentLength && parseInt(contentLength) > MAX_ZIP_SIZE) {
            return NextResponse.json(
              {
                error: `Repository is too large (max ${MAX_ZIP_SIZE / 1024 / 1024}MB)`,
              },
              { status: 413 }
            );
          }

          zipBuffer = await response.arrayBuffer();
          successfulBranch = branch;
          break;
        }
      } catch {
        // Try next branch
        continue;
      }
    }

    if (!zipBuffer) {
      return NextResponse.json(
        {
          error:
            "Repository not found or is private. Only public repositories are supported.",
        },
        { status: 404 }
      );
    }

    // Extract ZIP
    const zip = new JSZip();
    const zipContents = await zip.loadAsync(zipBuffer);

    // Find .gitignore files first
    const gitignoreParser = new ServerGitignoreParser();
    const gitignoreFiles = Object.keys(zipContents.files).filter(
      (path) => path.endsWith(".gitignore") && !zipContents.files[path].dir
    );

    for (const gitignorePath of gitignoreFiles) {
      const content = await zipContents.files[gitignorePath].async("string");
      gitignoreParser.addRules(content);
    }

    // Process files
    const textFiles: ImportedFile[] = [];
    const documentFiles: ImportedFile[] = [];
    let processedCount = 0;

    // ZIP structure: {repo}-{branch}/... - we need to strip the root folder
    const rootFolder =
      Object.keys(zipContents.files)[0]?.split("/")[0] || "";

    for (const [fullPath, zipEntry] of Object.entries(zipContents.files)) {
      if (processedCount >= MAX_TOTAL_FILES) break;
      if (zipEntry.dir) continue;

      // Strip root folder from path
      const relativePath = fullPath.replace(`${rootFolder}/`, "");
      if (!relativePath) continue;

      // Apply filters
      if (shouldIgnorePath(relativePath)) continue;
      if (!isExtensionAllowed(relativePath)) continue;
      if (gitignoreParser.shouldIgnore(relativePath)) continue;

      // Check file size
      const fileData = await zipEntry.async("arraybuffer");
      if (fileData.byteLength > MAX_FILE_SIZE) continue;

      if (isDocumentFile(relativePath)) {
        // Document files need server-side extraction
        const base64 = Buffer.from(fileData).toString("base64");
        documentFiles.push({
          path: relativePath,
          base64Content: base64,
          needsExtraction: true,
        });
      } else {
        // Text files - decode as UTF-8
        try {
          const content = new TextDecoder("utf-8").decode(fileData);
          // Skip binary files that might have snuck through
          if (content.includes("\0")) continue;

          textFiles.push({
            path: relativePath,
            content: content,
          });
        } catch {
          // Skip files that cannot be decoded as text
          continue;
        }
      }

      processedCount++;
    }

    return NextResponse.json({
      repository: `${owner}/${repo}`,
      branch: successfulBranch,
      textFiles,
      documentFiles,
      totalFiles: textFiles.length + documentFiles.length,
      skippedByLimit: processedCount >= MAX_TOTAL_FILES,
    });
  } catch (error) {
    console.error("Error importing public GitHub repository:", error);

    return NextResponse.json(
      { error: "Failed to import repository" },
      { status: 500 }
    );
  }
}
