"use client";

import { ReactNode, useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface CodeBlockProps {
  children: ReactNode;
  copyText?: string;
}

export function CodeBlock({ children, copyText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      toast.success("Prompt copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="relative bg-card border border-border rounded-lg py-1.5 px-6 my-4">
      {copyText && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md transition-colors text-muted-foreground hover:bg-primary/10 hover:text-primary"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      )}
      <p
        className={`text-sm font-mono text-muted-foreground mb-0 ${copyText ? "pr-8" : ""}`}
      >
        {children}
      </p>
    </div>
  );
}
