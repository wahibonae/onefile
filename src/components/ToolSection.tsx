"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, FileText, Download } from "lucide-react";
import Sparkles from "@/components/icons/Sparkles";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";
import { cn } from "@/lib/utils";
import { GitHubImportDialog } from "@/components/GitHubImportDialog";
import { TextContentDialog } from "@/components/TextContentDialog";
import { PostSuccessCard } from "@/components/PostSuccessCard";
import { useFileManager } from "@/hooks/useFileManager";
import { usePromptOutput } from "@/hooks/usePromptOutput";
import { useGitHubBrowser } from "@/hooks/useGitHubBrowser";
import { useTextContentDialog } from "@/hooks/useTextContentDialog";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

const IMPORT_SOURCES = ["text content", "public GitHub repos"];

export function ToolSection() {
  const { files, handleFiles, removeFile, clearAllFiles, handleGitHubImport } =
    useFileManager();
  const { finalPrompt, copyToClipboard, triggerDownload, executeDownload, downloadRequested } =
    usePromptOutput(files);
  const {
    isGitHubBrowserOpen,
    setIsGitHubBrowserOpen,
    handleGitHubImportClick,
    isAuthLoaded,
  } = useGitHubBrowser(files);
  const {
    isTextContentDialogOpen,
    setIsTextContentDialogOpen,
    handleTextContentClick,
  } = useTextContentDialog();
  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDragAndDrop(handleFiles);

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSourceIndex((prev) => (prev + 1) % IMPORT_SOURCES.length);
        setIsVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-7">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                Input
              </h2>
              <span className="hidden sm:block bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                NEW: Import from{" "}
                <span
                  className={cn(
                    "inline-block transition-opacity duration-300",
                    isVisible ? "opacity-100" : "opacity-0"
                  )}
                >
                  {IMPORT_SOURCES[currentSourceIndex]}!
                </span>
              </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <FileUpload
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileChange={handleFileChange}
                onGitHubImport={handleGitHubImportClick}
                onTextContent={handleTextContentClick}
                isImportDisabled={!isAuthLoaded}
              />

              {files.length === 0 && (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    No files uploaded yet. <br />
                    Upload your files to get started.
                  </p>
                </div>
              )}

              <FileList
                files={files}
                onRemoveFile={removeFile}
                onClearAll={clearAllFiles}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                Your One File
              </h2>
              <a
                href="https://github.com/wahibonae/onefile"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-muted/60 hover:bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                Open Source
              </a>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <ScrollArea className="h-[300px] sm:h-[400px] rounded-xl border border-border bg-muted/30 p-4 sm:p-6">
                <pre className="text-xs sm:text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed">
                  {finalPrompt ||
                    "Your one file (extracted content from your files) will appear here..."}
                </pre>
              </ScrollArea>

              {finalPrompt && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-background text-foreground/80 hover:bg-muted border border-border/50 shadow-sm h-10 sm:h-11 rounded-lg font-medium"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy To Clipboard
                  </Button>
                  <Button
                    className={cn(
                      "flex-1 bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-10 sm:h-11 rounded-lg font-medium"
                    )}
                    onClick={triggerDownload}
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <GitHubImportDialog
        open={isGitHubBrowserOpen}
        onClose={() => setIsGitHubBrowserOpen(false)}
        onImport={handleGitHubImport}
      />

      <TextContentDialog
        open={isTextContentDialogOpen}
        onClose={() => setIsTextContentDialogOpen(false)}
        onImport={handleGitHubImport}
      />

      <PostSuccessCard downloadRequested={downloadRequested} onDownload={executeDownload} />
    </>
  );
}
