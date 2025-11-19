"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FileWithContent } from "@/types";
import {
  processFile,
  isPathIgnored,
  isFileAllowed,
  skippedStats,
  getFileHash,
  getUniquePath,
} from "@/utils/files";
import { IGNORED_PATHS } from "@/constants/files";

interface UseFileManagerReturn {
  files: FileWithContent[];
  handleFiles: (fileList: FileList | null) => Promise<void>;
  removeFile: (index: number) => void;
  clearAllFiles: () => void;
  handleGitHubImport: (importedFiles: Array<{ path: string; content: string }>) => void;
}

export function useFileManager(): UseFileManagerReturn {
  const [files, setFiles] = useState<FileWithContent[]>([]);

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

  const handleFiles = async (fileList: FileList | null): Promise<void> => {
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

  const removeFile = (index: number): void => {
    setFiles(files.filter((_: FileWithContent, i: number) => i !== index));
  };

  const clearAllFiles = (): void => {
    setFiles([]);
  };

  const handleGitHubImport = (
    importedFiles: Array<{ path: string; content: string }>
  ): void => {
    const newFiles: FileWithContent[] = importedFiles.map((file) => ({
      name: file.path.split("/").pop() || file.path,
      path: file.path,
      content: file.content,
    }));

    setFiles((prev: FileWithContent[]) => [...prev, ...newFiles]);
  };

  return {
    files,
    handleFiles,
    removeFile,
    clearAllFiles,
    handleGitHubImport,
  };
}
