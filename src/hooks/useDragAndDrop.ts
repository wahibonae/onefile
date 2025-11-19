"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { processEntry, skippedStats } from "@/utils/files";

interface UseDragAndDropReturn {
  isDragging: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => Promise<void>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useDragAndDrop(
  handleFiles: (fileList: FileList | null) => Promise<void>
): UseDragAndDropReturn {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent): Promise<void> => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFiles(e.target.files);
  };

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  };
}
