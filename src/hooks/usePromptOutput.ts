"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { FileWithContent } from "@/types";
import { generatePromptText, getTotalContentSize, formatFileSize, MAX_TOTAL_CONTENT_SIZE } from "@/utils/files";

interface UsePromptOutputReturn {
  finalPrompt: string;
  copyToClipboard: () => void;
  triggerDownload: () => void;
  executeDownload: () => void;
  downloadRequested: number;
}

export function usePromptOutput(files: FileWithContent[]): UsePromptOutputReturn {
  const [finalPrompt, setFinalPrompt] = useState("");
  const [downloadRequested, setDownloadRequested] = useState(0);
  const filesRef = useRef<FileWithContent[]>(files);
  filesRef.current = files;

  useEffect(() => {
    if (files.length > 0) {
      // Safety check: don't try to build a string that would crash the browser
      const totalSize = getTotalContentSize(files);
      if (totalSize > MAX_TOTAL_CONTENT_SIZE) {
        setFinalPrompt(
          `[Content too large to preview (${formatFileSize(totalSize)}). Use the Download button to save directly.]`
        );
        return;
      }
      const result = generatePromptText(files);
      setFinalPrompt(result);
    } else {
      setFinalPrompt("");
    }
  }, [files]);

  const finalPromptRef = useRef(finalPrompt);
  finalPromptRef.current = finalPrompt;

  const copyToClipboard = useCallback((): void => {
    const totalSize = getTotalContentSize(filesRef.current);
    if (totalSize > MAX_TOTAL_CONTENT_SIZE) {
      toast.error(
        `Content too large to copy (${formatFileSize(totalSize)}). Please use Download instead.`
      );
      return;
    }
    navigator.clipboard
      .writeText(finalPromptRef.current)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => toast.error("Failed to copy to clipboard"));
  }, []);

  const triggerDownload = useCallback((): void => {
    setDownloadRequested((c) => c + 1);
  }, []);

  const executeDownload = useCallback((): void => {
    // For large files, build the Blob from parts to avoid creating one huge string
    const currentFiles = filesRef.current;
    const totalSize = getTotalContentSize(currentFiles);

    let blob: Blob;
    if (totalSize > MAX_TOTAL_CONTENT_SIZE) {
      // Stream-style: build Blob from individual parts without concatenating
      const parts: string[] = ['======== FILES ========\n'];
      for (const file of currentFiles) {
        parts.push(`*** ${file.path} ***\n`, file.content, '\n\n');
      }
      blob = new Blob(parts, { type: "text/plain" });
    } else {
      blob = new Blob([finalPromptRef.current], { type: "text/plain" });
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "onefile-prompt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    finalPrompt,
    copyToClipboard,
    triggerDownload,
    executeDownload,
    downloadRequested,
  };
}
