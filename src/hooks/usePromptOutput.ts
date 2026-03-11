"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { FileWithContent } from "@/types";
import { generatePromptText } from "@/utils/files";

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

  useEffect(() => {
    if (files.length > 0) {
      const result = generatePromptText(files);
      setFinalPrompt(result);
    } else {
      setFinalPrompt("");
    }
  }, [files]);

  const finalPromptRef = useRef(finalPrompt);
  finalPromptRef.current = finalPrompt;

  const copyToClipboard = useCallback((): void => {
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
    const blob = new Blob([finalPromptRef.current], { type: "text/plain" });
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
