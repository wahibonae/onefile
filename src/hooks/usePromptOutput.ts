"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FileWithContent } from "@/types";
import { generatePromptText } from "@/utils/files";

interface UsePromptOutputReturn {
  finalPrompt: string;
  copyToClipboard: () => void;
  downloadPrompt: () => void;
}

export function usePromptOutput(files: FileWithContent[]): UsePromptOutputReturn {
  const [finalPrompt, setFinalPrompt] = useState("");

  // Update the final prompt whenever files change
  useEffect(() => {
    if (files.length > 0) {
      const result = generatePromptText(files);
      setFinalPrompt(result);
    } else {
      setFinalPrompt("");
    }
  }, [files]);

  const copyToClipboard = (): void => {
    navigator.clipboard
      .writeText(finalPrompt)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  const downloadPrompt = (): void => {
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

  return {
    finalPrompt,
    copyToClipboard,
    downloadPrompt,
  };
}
