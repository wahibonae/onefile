"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, FileText, Download, X, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";
import { FileWithContent } from "@/types";
import {
  processFile,
  processEntry,
  generatePromptText,
  isPathIgnored,
  isFileAllowed,
  skippedStats,
} from "@/utils/files";
import { IGNORED_PATHS } from "@/constants/files";
import { cn } from "@/lib/utils";
import { useUser, useClerk } from "@clerk/nextjs";
import { GitHubRepositoryBrowser } from "@/components/GitHubRepositoryBrowser";
import { FAQSection } from "@/components/FAQSection";
import { LogoCloud } from "@/components/LogoCloud";
import { Navbar } from "@/components/Navbar";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

// Compute SHA-256 hash of file content for duplicate detection
async function getFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Generate a unique path by appending (1), (2), etc.
function getUniquePath(basePath: string, existingPaths: Set<string>): string {
  if (!existingPaths.has(basePath)) {
    return basePath;
  }

  const lastDotIndex = basePath.lastIndexOf(".");
  const hasExtension = lastDotIndex > 0 && lastDotIndex > basePath.lastIndexOf("/");

  const namePart = hasExtension ? basePath.slice(0, lastDotIndex) : basePath;
  const extPart = hasExtension ? basePath.slice(lastDotIndex) : "";

  let counter = 1;
  let newPath = `${namePart} (${counter})${extPart}`;

  while (existingPaths.has(newPath)) {
    counter++;
    newPath = `${namePart} (${counter})${extPart}`;
  }

  return newPath;
}

export default function Home() {
  const [files, setFiles] = useState<FileWithContent[]>([]);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isGitHubBrowserOpen, setIsGitHubBrowserOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Restore files from sessionStorage on mount (after OAuth redirect)
  useEffect(() => {
    try {
      const savedFiles = sessionStorage.getItem("onefile-temp-files");
      if (savedFiles) {
        const parsed = JSON.parse(savedFiles) as FileWithContent[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFiles(parsed);
          toast.success(
            `Restored ${parsed.length} file${parsed.length === 1 ? "" : "s"}`
          );
        }
        sessionStorage.removeItem("onefile-temp-files");
      }
    } catch (error) {
      console.error("Failed to restore files from sessionStorage:", error);
      sessionStorage.removeItem("onefile-temp-files");
    }
  }, []);

  // Save files to sessionStorage whenever they change
  useEffect(() => {
    try {
      if (files.length === 0) {
        sessionStorage.removeItem("onefile-temp-files");
      } else {
        sessionStorage.setItem("onefile-temp-files", JSON.stringify(files));
      }
    } catch (error) {
      console.error("Failed to sync files to sessionStorage:", error);
    }
  }, [files]);

  // Check for pending actions after OAuth redirect
  useEffect(() => {
    if (isSignedIn) {
      try {
        const pendingAction = sessionStorage.getItem("onefile-pending-action");
        if (pendingAction === "github-import") {
          sessionStorage.removeItem("onefile-pending-action");
          // Small delay to ensure UI is ready
          setTimeout(() => {
            setIsGitHubBrowserOpen(true);
          }, 100);
        }
      } catch (error) {
        console.error("Failed to check pending action:", error);
        sessionStorage.removeItem("onefile-pending-action");
      }
    }
  }, [isSignedIn]);

  useEffect(() => {
    // Update the final prompt whenever files change
    if (files.length > 0) {
      const result = generatePromptText(files);
      setFinalPrompt(result);
    } else {
      setFinalPrompt("");
    }
  }, [files]);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;

    try {
      const existingPaths = new Set(files.map((f: FileWithContent) => f.path));
      const newFiles: { file: File; path: string }[] = [];
      const skippedFiles: string[] = [];
      const skippedImageFiles: string[] = [];
      const ignoredFiles: string[] = [];
      const ignoredDirectories = new Map<string, number>();

      // Build a map of existing file hashes for duplicate content detection
      const existingFileHashes = new Map<string, string>();
      for (const f of files) {
        // Create a simple hash from content for existing files
        const contentHash = await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(f.content)
        );
        const hashArray = Array.from(new Uint8Array(contentHash));
        const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        existingFileHashes.set(f.path, hash);
      }

      // Track paths we're adding in this batch to avoid conflicts
      const pendingPaths = new Set<string>();

      // Process all files
      for (const file of Array.from(fileList)) {
        const relativePath = file.webkitRelativePath || file.name;

        // Check if path should be ignored
        if (isPathIgnored(relativePath)) {
          ignoredFiles.push(relativePath);

          // Track which directories are being skipped
          const pathParts = relativePath.split("/");
          for (const part of pathParts) {
            if (part && IGNORED_PATHS.has(part)) {
              const count = ignoredDirectories.get(part) || 0;
              ignoredDirectories.set(part, count + 1);
              break; // Only count the first ignored directory in the path
            }
          }

          continue;
        }

        // Check if file type is allowed
        if (!isFileAllowed(file)) {
          // Check if it's an image file
          const isImage = file.type.startsWith("image/");
          if (isImage) {
            skippedImageFiles.push(file.name);
          } else {
            skippedFiles.push(file.name);
          }
          continue;
        }

        // Check for duplicate path
        if (existingPaths.has(relativePath) || pendingPaths.has(relativePath)) {
          // Path exists - check if content is different
          const newFileHash = await getFileHash(file);
          const existingHash = existingFileHashes.get(relativePath);

          if (existingHash && newFileHash === existingHash) {
            // Same content - skip as true duplicate
            continue;
          }

          // Different content - generate unique path
          const allPaths = new Set([
            ...Array.from(existingPaths),
            ...Array.from(pendingPaths),
          ]);
          const uniquePath = getUniquePath(relativePath, allPaths);
          newFiles.push({ file, path: uniquePath });
          pendingPaths.add(uniquePath);
        } else {
          // New path - add directly
          newFiles.push({ file, path: relativePath });
          pendingPaths.add(relativePath);
        }
      }

      // Get additional skipped directories from the directory traversal process
      const skippedDirsFromTraversal = skippedStats.getDirectoryCounts();
      skippedDirsFromTraversal.forEach((count, dir) => {
        ignoredDirectories.set(dir, (ignoredDirectories.get(dir) || 0) + count);
      });

      // Get any additional skipped images from the directory traversal
      const additionalSkippedImages = skippedStats.getImageCount();
      const totalSkippedImages =
        skippedImageFiles.length + additionalSkippedImages;

      // Get gitignore skipped count
      const gitignoreSkippedCount = skippedStats.getGitignoreCount();

      // Handle both unsupported files, images, ignored directories, and gitignore in one message
      if (
        skippedFiles.length > 0 ||
        totalSkippedImages > 0 ||
        ignoredDirectories.size > 0 ||
        gitignoreSkippedCount > 0
      ) {
        let message = "";

        const hasUnsupportedFiles = skippedFiles.length > 0;
        const hasSkippedImages = totalSkippedImages > 0;

        if (hasUnsupportedFiles || hasSkippedImages) {
          // Build message for skipped files
          if (hasUnsupportedFiles) {
            message = `Skipped ${skippedFiles.length} unsupported file${
              skippedFiles.length === 1 ? "" : "s"
            }`;
          }

          // Add skipped images info if any
          if (hasSkippedImages) {
            if (message) {
              message += `, ${totalSkippedImages} image${
                totalSkippedImages === 1 ? "" : "s"
              }`;
            } else {
              message = `Skipped ${totalSkippedImages} image${
                totalSkippedImages === 1 ? "" : "s"
              }`;
            }
          }

          // Add ignored directories info if any
          if (ignoredDirectories.size > 0) {
            const dirNames = Array.from(ignoredDirectories.keys()).join(", ");
            message += ` + ${dirNames}`;
          }

          // Add gitignore info if any
          if (gitignoreSkippedCount > 0) {
            message += ` + ${gitignoreSkippedCount} from .gitignore`;
          }
        } else if (ignoredDirectories.size > 0 || gitignoreSkippedCount > 0) {
          const parts = [];

          if (ignoredDirectories.size > 0) {
            const dirNames = Array.from(ignoredDirectories.keys()).join(", ");
            parts.push(dirNames);
          }

          if (gitignoreSkippedCount > 0) {
            parts.push(`${gitignoreSkippedCount} from .gitignore`);
          }

          message = `Skipped files from: ${parts.join(", ")}`;
        }

        toast.error(message);
      }

      if (newFiles.length === 0) {
        if (
          skippedFiles.length === 0 &&
          skippedImageFiles.length === 0 &&
          ignoredFiles.length === 0
        ) {
          toast.error("These files have already been added");
        }
        return;
      }

      // Show loading toast only if there are files to process
      const loadingToastId = toast.loading("Processing files...", {
        duration: Infinity, // Keep loading until manually dismissed
      });

      try {
        const results = await Promise.allSettled(
          newFiles.map(({ file, path }) => processFile(file, path))
        );

        const successfulFiles: FileWithContent[] = [];
        const emptyFiles: string[] = [];
        const failedFiles: string[] = [];

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            successfulFiles.push(result.value);
          } else {
            const fileName = newFiles[index].file.name;
            if (result.reason.message.includes("appears to be empty")) {
              emptyFiles.push(fileName);
            } else {
              failedFiles.push(fileName);
            }
          }
        });

        if (successfulFiles.length > 0) {
          setFiles((prev: FileWithContent[]) => [...prev, ...successfulFiles]);
        }

        // Wait a brief moment to ensure state updates are processed
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Dismiss loading toast before showing results
        toast.dismiss(loadingToastId);

        // Show appropriate feedback
        if (successfulFiles.length > 0) {
          toast.success(
            `Added ${successfulFiles.length} file${
              successfulFiles.length === 1 ? "" : "s"
            }`
          );
        }

        if (emptyFiles.length > 0) {
          toast.error(
            `Skipped ${emptyFiles.length} empty file${
              emptyFiles.length === 1 ? "" : "s"
            }`
          );
        }

        if (failedFiles.length > 0) {
          toast.error(
            `Failed to process ${failedFiles.length} file${
              failedFiles.length === 1 ? "" : "s"
            }`
          );
        }
      } catch (processingError) {
        toast.dismiss(loadingToastId);
        console.error("Failed during file processing:", processingError);
        toast.error("Failed to process some files");
      }
    } catch (error) {
      console.error("Failed to read some files:", error);
      toast.error("Failed to read some files");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const items = Array.from(e.dataTransfer.items);
    const entries = items
      .map((item) => item.webkitGetAsEntry())
      .filter((entry): entry is FileSystemEntry => entry !== null);

    try {
      // Reset stats before processing
      skippedStats.reset();

      // Process files without showing immediate feedback
      const files = await Promise.all(
        entries.map((entry) => processEntry(entry))
      );
      const flattenedFiles = files.flat();

      // Collect information about skipped items
      const skippedImages = skippedStats.getImageCount();
      const ignoredDirs = skippedStats.getDirectoryCounts();
      const gitignoreSkipped = skippedStats.getGitignoreCount();

      // If we have no valid files but we skipped some content, show a message
      if (
        flattenedFiles.length === 0 &&
        (skippedImages > 0 || ignoredDirs.size > 0 || gitignoreSkipped > 0)
      ) {
        let message = "";

        if (skippedImages > 0) {
          message = `Skipped ${skippedImages} image${
            skippedImages === 1 ? "" : "s"
          }`;

          if (ignoredDirs.size > 0) {
            const dirNames = Array.from(ignoredDirs.keys()).join(", ");
            message += ` + ${dirNames}`;
          }

          if (gitignoreSkipped > 0) {
            message += ` + ${gitignoreSkipped} from .gitignore`;
          }
        } else if (ignoredDirs.size > 0 || gitignoreSkipped > 0) {
          const parts = [];

          if (ignoredDirs.size > 0) {
            const dirNames = Array.from(ignoredDirs.keys()).join(", ");
            parts.push(dirNames);
          }

          if (gitignoreSkipped > 0) {
            parts.push(`${gitignoreSkipped} from .gitignore`);
          }

          message = `Skipped files from: ${parts.join(", ")}`;
        }

        toast.error(message);
        return;
      }

      if (flattenedFiles.length > 0) {
        handleFiles(flattenedFiles as unknown as FileList);
      }
    } catch (error) {
      console.error("Failed to process some dropped items:", error);
      toast.error("Failed to process some dropped items");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_: FileWithContent, i: number) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(finalPrompt)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  const downloadPrompt = () => {
    const blob = new Blob([finalPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "onefile-prompt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("One File downloaded successfully");
  };

  const handleSignInClick = (): void => {
    // Explicitly save files before OAuth redirect (extra safety)
    if (files.length > 0) {
      try {
        sessionStorage.setItem("onefile-temp-files", JSON.stringify(files));
      } catch (error) {
        console.error("Failed to save files before sign-in:", error);
      }
    }
  };

  const handleGitHubImportClick = () => {
    if (!isSignedIn) {
      handleSignInClick(); // Save files before OAuth redirect
      sessionStorage.setItem("onefile-pending-action", "github-import"); // Save intent
      openSignIn(); // Open sign-in modal programmatically
      return;
    }
    setIsGitHubBrowserOpen(true);
  };

  const handleGitHubImport = (
    importedFiles: Array<{ path: string; content: string }>
  ) => {
    const newFiles: FileWithContent[] = importedFiles.map((file) => ({
      name: file.path.split("/").pop() || file.path,
      path: file.path,
      content: file.content,
    }));

    setFiles((prev: FileWithContent[]) => [...prev, ...newFiles]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col space-y-6">
      {/* Top Section with Background */}
      <div className="relative pb-8 sm:pb-12 md:pb-20">
        {/* Background Image Layer with Fade */}
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] dark:bg-[url('/hero-bg-dark.png')] bg-cover bg-center bg-no-repeat">
          {/* Fade out overlay at bottom - only affects background */}
          <div className="absolute bottom-0 left-0 right-0 h-[20%] dark:h-[35%] bg-gradient-to-b from-transparent to-background"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10">
          {/* Navbar */}
          <Navbar />

          <div className="flex-grow container max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
            <div className="space-y-4 sm:space-y-6">
              {/* Hero Section */}
              <div className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8 md:py-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Bypass AI Upload Limits
                </h1>
                <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
                  Break through ChatGPT&apos;s 3-file limit. Combine unlimited
                  files into one AI-ready file.
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> </span>Works with Claude, Gemini,
                  Grok, and all AI platforms.
                </p>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-7">
                {/* Input Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                        Input
                      </h2>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <FileUpload
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onFileChange={handleFileChange}
                        onGitHubImport={handleGitHubImportClick}
                      />

                      {files.length === 0 && (
                        <div className="text-center py-2">
                          <p className="text-sm text-muted-foreground/80 leading-relaxed">
                            No files uploaded yet. <br />
                            Upload your files to get started.
                          </p>
                        </div>
                      )}

                      <FileList
                        files={files}
                        onRemoveFile={removeFile}
                        onClearAll={clearAllFiles}
                      />
                    </div>
                  </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                        >
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                          <path d="M5 3v4" />
                          <path d="M19 17v4" />
                          <path d="M3 5h4" />
                          <path d="M17 19h4" />
                        </svg>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                        Your One File
                      </h2>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <ScrollArea className="h-[300px] sm:h-[400px] rounded-xl border border-border bg-muted/30 p-4 sm:p-6">
                        <pre className="text-xs sm:text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed">
                          {finalPrompt ||
                            "Your one file (extracted content from your files) will appear here..."}
                        </pre>
                      </ScrollArea>

                      {finalPrompt && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            className="flex-1 bg-background text-foreground/80 hover:bg-muted border border-border/50 shadow-sm h-10 sm:h-11 rounded-lg font-medium"
                            onClick={copyToClipboard}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy To Clipboard
                          </Button>
                          <Button
                            className={cn(
                              "flex-1 bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-10 sm:h-11 rounded-lg font-medium"
                            )}
                            onClick={downloadPrompt}
                            variant="outline"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Sections */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-32">
        {/* Logo Cloud - AI Platforms */}
        <LogoCloud />

        {/* Why OneFile Solves AI Upload Limits - Visual Before/After */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Why OneFile Solves AI Upload Limits
          </h2>

          {/* Before/After Comparison - Visual First */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT: Without OneFile (Problem Visual) */}
            <div className="space-y-4">
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/before.jpg"
                    alt="ChatGPT file upload limit error - You've reached your file upload limit, Upgrade to Plus"
                    fill
                    className="object-cover dark:opacity-95"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Badge overlay */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                    <X className="h-4 w-4" />
                    Without OneFile
                  </div>
                </div>
              </div>

              {/* Short caption */}
              <p className="text-center text-muted-foreground text-sm">
                Frustrated by file upload limits on AI platforms
              </p>
            </div>

            {/* RIGHT: With OneFile (Solution Visual) */}
            <div className="space-y-4">
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/after.jpg"
                    alt="OneFile success - your-onefile.txt ready to upload with unlimited files combined"
                    fill
                    className="object-cover dark:opacity-95"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Badge overlay */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                    <Check className="h-4 w-4" />
                    With OneFile
                  </div>
                </div>
              </div>

              {/* Short caption */}
              <p className="text-center text-muted-foreground text-sm">
                Upload unlimited files in one go - no restrictions
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            How It Works
          </h2>
          <FeaturesShowcase />
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />
      </div>

      {/* GitHub Repository Browser Dialog */}
      <GitHubRepositoryBrowser
        open={isGitHubBrowserOpen}
        onClose={() => setIsGitHubBrowserOpen(false)}
        onImport={handleGitHubImport}
      />
    </div>
  );
}
