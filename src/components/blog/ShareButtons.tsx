"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import X from "@/components/icons/X";
import LinkedIn from "../icons/Linkedin";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareOnTwitter = (): void => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = (): void => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Share This Post
      </h3>

      <div className="space-y-2">
        {/* Twitter */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={shareOnTwitter}
        >
          <X className="h-4 w-4" />
          Share on Twitter
        </Button>

        {/* LinkedIn */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={shareOnLinkedIn}
        >
          <LinkedIn className="h-4 w-4" />
          Share on LinkedIn
        </Button>

        {/* Copy Link */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
