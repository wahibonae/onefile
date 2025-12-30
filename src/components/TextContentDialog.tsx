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
import { HugeiconsIcon } from "@hugeicons/react";
import { TextCursorInput } from "@hugeicons/core-free-icons";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface TextContentDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (files: Array<{ path: string; content: string }>) => void;
}

export function TextContentDialog({
  open,
  onClose,
  onImport,
}: TextContentDialogProps): React.ReactElement {
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");

  const isContentValid = content.trim().length > 0;
  const isFilenameValid = filename.trim().length > 0;
  const canSubmit = isContentValid && isFilenameValid;

  const handleAdd = (): void => {
    if (!canSubmit) return;

    const finalFilename = filename.trim().endsWith(".txt")
      ? filename.trim()
      : `${filename.trim()}.txt`;

    onImport([{ path: finalFilename, content: content }]);
    toast.success(`Added "${finalFilename}"`);

    // Reset and close
    setFilename("text-content.txt");
    setContent("");
    onClose();
  };

  const handleDialogClose = (openState: boolean): void => {
    if (!openState) {
      setFilename("text-content.txt");
      setContent("");
      onClose();
    }
  };

  const characterCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={TextCursorInput} className="h-5 w-5" />
            Add Text Content
          </DialogTitle>
          <DialogDescription>
            Paste or type text content to add to your files
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label htmlFor="filename" className="text-sm font-medium">
              Filename
            </label>
            <input
              id="filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Name your content"
              className={cn(
                "w-full px-3 py-2 rounded-lg border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "placeholder:text-muted-foreground",
                !isFilenameValid && filename !== "" ? "border-destructive" : "border-border"
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or type in content..."
              rows={12}
              className={cn(
                "w-full px-3 py-2 rounded-lg border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "placeholder:text-muted-foreground",
                "border-border"
              )}
            />
            <div className="flex justify-end text-xs text-muted-foreground">
              {wordCount} words &middot; {characterCount.toLocaleString()} characters
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={!canSubmit}
              className="flex-1"
            >
              Add Content
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
