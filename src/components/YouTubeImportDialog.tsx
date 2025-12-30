"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import YouTube from "@/components/icons/YouTube";

interface YouTubeImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (files: Array<{ path: string; content: string }>) => void;
}

type ImportState = "idle" | "fetching" | "processing";

interface TranscriptResponse {
  videoId: string;
  videoTitle?: string;
  channelName?: string;
  transcript: string;
  error?: string;
}

export function YouTubeImportDialog({
  open,
  onClose,
  onImport,
}: YouTubeImportDialogProps): React.ReactElement {
  const [url, setUrl] = useState("");
  const [importState, setImportState] = useState<ImportState>("idle");
  const [error, setError] = useState<string | null>(null);

  const isValidYouTubeUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/shorts\/[\w-]+/,
    ];
    return patterns.some((pattern) => pattern.test(url.trim()));
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /youtube\.com\/watch\?v=([\w-]+)/,
      /youtu\.be\/([\w-]+)/,
      /youtube\.com\/embed\/([\w-]+)/,
      /youtube\.com\/shorts\/([\w-]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const sanitizeFileName = (title: string): string => {
    return title
      .replace(/[<>:"/\\|?*]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100);
  };

  const isUrlValid = isValidYouTubeUrl(url);
  const isLoading = importState !== "idle";

  const handleImport = async (): Promise<void> => {
    if (!isUrlValid) {
      setError("Invalid YouTube URL. Please enter a valid video URL.");
      return;
    }

    const videoId = extractVideoId(url.trim());
    if (!videoId) {
      setError("Could not extract video ID from URL.");
      return;
    }

    setError(null);
    setImportState("fetching");

    try {
      const response = await fetch("/api/youtube/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      const data: TranscriptResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch transcript");
      }

      setImportState("processing");

      if (!data.transcript || !data.transcript.trim()) {
        throw new Error("No transcript available for this video");
      }

      const fileName = `youtube-${sanitizeFileName(data.videoTitle || videoId)}.txt`;
      const content = formatTranscript(data);

      onImport([{ path: fileName, content }]);
      toast.success(
        `Imported transcript from "${data.videoTitle || videoId}"`
      );

      setUrl("");
      setImportState("idle");
      onClose();
    } catch (err) {
      console.error("YouTube import error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to import transcript"
      );
      setImportState("idle");
    }
  };

  const formatTranscript = (data: TranscriptResponse): string => {
    let content = "";
    if (data.videoTitle) {
      content += `Video: ${data.videoTitle}\n`;
    }
    if (data.channelName) {
      content += `Channel: ${data.channelName}\n`;
    }
    content += `URL: https://youtube.com/watch?v=${data.videoId}\n`;
    content += `\n--- Transcript ---\n\n`;
    content += data.transcript;
    return content;
  };

  const handleDialogClose = (openState: boolean): void => {
    if (!openState && isLoading) return;
    if (!openState) {
      setUrl("");
      setError(null);
      setImportState("idle");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <YouTube className="h-5 w-5" />
            Import from YouTube
          </DialogTitle>
          <DialogDescription>
            Enter a YouTube video URL to import its transcript
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label htmlFor="youtube-url" className="text-sm font-medium">
              YouTube Video URL
            </label>
            <input
              id="youtube-url"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isLoading}
              className={cn(
                "w-full px-3 py-2 rounded-lg border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "placeholder:text-muted-foreground",
                error ? "border-destructive" : "border-border"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && isUrlValid) {
                  handleImport();
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              The video must have captions/subtitles available
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={isLoading || !isUrlValid}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {importState === "fetching" ? "Fetching..." : "Processing..."}
                </>
              ) : (
                "Import Transcript"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
