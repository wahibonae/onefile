"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { FileWithContent } from "@/types";
import {
  generatePromptText,
  generatePromptBlob,
  generateMarkdownBlob,
  calculateOutputSize,
} from "@/utils/files";
import { formatBytes } from "@/lib/utils";

const PREVIEW_LIMIT = 50_000; // ~50KB preview
const COPY_SIZE_LIMIT = 100 * 1024 * 1024; // 100MB safety guard for clipboard

export type DownloadFormat = "txt" | "md";

interface UsePromptOutputReturn {
  finalPrompt: string;
  outputSize: number;
  isTruncated: boolean;
  fileCount: number;
  copyToClipboard: () => void;
  triggerDownload: (format?: DownloadFormat) => void;
  executeDownload: () => void;
  downloadRequested: number;
}

function buildPreview(files: FileWithContent[], limit: number): string {
  let result = "======== FILES ========\n";
  for (const file of files) {
    const entry = `*** ${file.path} ***\n${file.content}\n\n`;
    if (result.length + entry.length > limit) {
      const remaining = limit - result.length;
      if (remaining > 0) {
        result += entry.substring(0, remaining);
      }
      break;
    }
    result += entry;
  }
  return result + "\n...";
}

export function usePromptOutput(
  files: FileWithContent[]
): UsePromptOutputReturn {
  const [finalPrompt, setFinalPrompt] = useState("");
  const [outputSize, setOutputSize] = useState(0);
  const [isTruncated, setIsTruncated] = useState(false);
  const [downloadRequested, setDownloadRequested] = useState(0);

  const filesRef = useRef(files);
  filesRef.current = files;

  const pendingFormatRef = useRef<DownloadFormat>("txt");

  useEffect(() => {
    if (files.length > 0) {
      const size = calculateOutputSize(files);
      setOutputSize(size);

      if (size <= PREVIEW_LIMIT) {
        setFinalPrompt(generatePromptText(files));
        setIsTruncated(false);
      } else {
        setFinalPrompt(buildPreview(files, PREVIEW_LIMIT));
        setIsTruncated(true);
      }
    } else {
      setFinalPrompt("");
      setOutputSize(0);
      setIsTruncated(false);
    }
  }, [files]);

  const copyToClipboard = useCallback((): void => {
    const currentFiles = filesRef.current;
    const size = calculateOutputSize(currentFiles);

    if (size > COPY_SIZE_LIMIT) {
      toast.error(
        `Output too large to copy (${formatBytes(size)}). Use Download instead.`
      );
      return;
    }

    try {
      const text = generatePromptText(currentFiles);
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Copied to clipboard!");
        })
        .catch(() => toast.error("Failed to copy to clipboard"));
    } catch {
      toast.error("Output too large to copy. Use Download instead.");
    }
  }, []);

  const triggerDownload = useCallback((format: DownloadFormat = "txt"): void => {
    pendingFormatRef.current = format;
    setDownloadRequested((c) => c + 1);
  }, []);

  const executeDownload = useCallback((): void => {
    const format = pendingFormatRef.current;
    const currentFiles = filesRef.current;

    const blob =
      format === "md"
        ? generateMarkdownBlob(currentFiles)
        : generatePromptBlob(currentFiles);

    const filename =
      format === "md" ? "onefile-prompt.md" : "onefile-prompt.txt";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    finalPrompt,
    outputSize,
    isTruncated,
    fileCount: files.length,
    copyToClipboard,
    triggerDownload,
    executeDownload,
    downloadRequested,
  };
}
