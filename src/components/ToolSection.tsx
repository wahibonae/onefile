"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, FileText, Download, ChevronDown, File, Pencil, Search, Check, X } from "lucide-react";
import Sparkles from "@/components/icons/Sparkles";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";
import { cn, formatBytes } from "@/lib/utils";
import { GitHubImportDialog } from "@/components/GitHubImportDialog";
import { TextContentDialog } from "@/components/TextContentDialog";
import { PostSuccessCard } from "@/components/PostSuccessCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import getFullContext from "@/services/service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFileManager } from "@/hooks/useFileManager";
import { usePromptOutput, sanitizeBaseFileName } from "@/hooks/usePromptOutput";
import { useGitHubBrowser } from "@/hooks/useGitHubBrowser";
import { useTextContentDialog } from "@/hooks/useTextContentDialog";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

const HIGHLIGHTS = [
  "OneFile is now 10x faster",
  "Rename your downloaded one files",
];

// Click-to-edit output file name, shown as an accent chip in the output card
// header. Resting state shows the sanitized name; editing keeps the same chip
// styling. A pulsing pencil hints it can be renamed.
function EditableFileName({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}): React.ReactElement {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function startEditing(): void {
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  }

  if (editing) {
    return (
      <div className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-1.5">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") setEditing(false);
          }}
          size={Math.min(Math.max(value.length, 4), 24)}
          aria-label="Output file name"
          className="w-auto bg-transparent text-sm font-mono text-primary/90 focus:outline-none"
        />
        <Pencil className="h-3.5 w-3.5 shrink-0 text-primary/70 animate-pulse motion-reduce:animate-none" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      title="Click to rename"
      aria-label="Rename output file"
      className="group ml-auto inline-flex max-w-full items-center gap-2 rounded-lg bg-primary/5 px-3 py-1.5 transition-colors hover:bg-primary/10"
    >
      <span className="truncate text-sm font-mono text-primary/90">
        {sanitizeBaseFileName(value)}
      </span>
      <Pencil className="h-3.5 w-3.5 shrink-0 text-primary/70 animate-pulse motion-reduce:animate-none" />
    </button>
  );
}

export function ToolSection() {
  const { files, handleFiles, removeFile, clearAllFiles, handleGitHubImport } =
    useFileManager();
  const {
    finalPrompt,
    outputSize,
    isTruncated,
    fileCount,
    copyToClipboard,
    triggerDownload,
    executeDownload,
    downloadRequested,
    baseFileName,
    setBaseFileName,
  } = usePromptOutput(files);
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

  const [userPrompt, setUserPrompt] = useState("");
  const [contextData, setContextData] = useState<{ context: string; prompt_suggestion: string } | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [activeTab, setActiveTab] = useState("one-file");

  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSourceIndex((prev) => (prev + 1) % HIGHLIGHTS.length);
        setIsVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleFilterContext = () => {
    const result = getFullContext(finalPrompt, userPrompt);
    setContextData(result);
    if (result.prompt_suggestion) {
      setShowSuggestion(true);
    }
    setActiveTab("one-context");
  };

  return (
    <>
      <div className="space-y-4 mb-6">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-2">
          <div className="flex gap-2">
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="w-full bg-background border border-border
                rounded-xl pl-3 pr-4 py-3 text-sm text-foreground
                placeholder:text-muted-foreground focus:outline-none
                focus:ring-2 focus:ring-white/20 focus:border-white
                hover:border-white/40 transition-all duration-200"
              />
            </div>

            <Button
              onClick={handleFilterContext}
              className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] font-medium text-xs sm:text-sm px-5 h-[46px] rounded-xl flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200 shrink-0"
            >
              Get Context
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-7">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                Input
              </h2>
              <span className="hidden sm:block bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                NEW:{" "}
                <span
                  className={cn(
                    "inline-block transition-opacity duration-300",
                    isVisible ? "opacity-100" : "opacity-0"
                  )}
                >
                  {HIGHLIGHTS[currentSourceIndex]}
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <TabsList className="bg-muted/50 p-1">
                    <TabsTrigger value="one-file" className="text-xs sm:text-sm px-3 py-1">
                      One File
                    </TabsTrigger>
                    <TabsTrigger value="one-context" className="text-xs sm:text-sm px-3 py-1 relative">
                      One Context
                    </TabsTrigger>
                  </TabsList>
                </div>
                {activeTab === "one-file" && finalPrompt && (
                  <EditableFileName
                    value={baseFileName}
                    onChange={setBaseFileName}
                  />
                )}
              </div>

              <TabsContent value="one-file" className="space-y-4 sm:space-y-6 mt-0">
                <div className="h-[300px] sm:h-[400px] rounded-xl border border-border bg-muted/30 flex flex-col">
                  <ScrollArea className="flex-1 min-h-0">
                    <div className="p-4 sm:p-6 overflow-hidden">
                      <pre className="text-xs sm:text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed [overflow-wrap:anywhere]">
                        {finalPrompt ||
                          "Your one file (extracted content from your files) will appear here..."}
                      </pre>
                    </div>
                  </ScrollArea>
                  {isTruncated && (
                    <p className="shrink-0 text-xs text-muted-foreground text-center border-t border-border px-4 py-2">
                      Showing preview. Full output: {formatBytes(outputSize)},{" "}
                      {fileCount} file{fileCount === 1 ? "" : "s"}
                    </p>
                  )}
                </div>

                {finalPrompt && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-background text-foreground/80 hover:bg-muted border border-border/50 shadow-sm h-10 sm:h-11 rounded-lg font-medium"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy To Clipboard
                    </Button>
                    <div className="flex-1 flex">
                      <Button
                        className="flex-1 bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-10 sm:h-11 rounded-l-lg rounded-r-none border-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                        onClick={() => triggerDownload("txt")}
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download .txt
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-10 sm:h-11 rounded-l-none rounded-r-lg border-l border-white/20 border-y-0 border-r-0 px-2 font-medium ring-0 ring-offset-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none transition-none"
                            variant="outline"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-fit space-y-1 p-2">
                          <DropdownMenuItem
                            onClick={() => triggerDownload("txt")}
                            className="flex items-center gap-2.5 cursor-pointer text-muted-foreground"
                          >
                            <File className="h-4 w-4" />
                            Download as .txt
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => triggerDownload("md")}
                            className="flex items-center gap-2.5 cursor-pointer text-muted-foreground"
                          >
                            <FileText className="h-4 w-4" />
                            Download as .md
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="one-context" className="space-y-4 sm:space-y-6 mt-0">
                <div className="h-[300px] sm:h-[400px] rounded-xl border border-border bg-muted/30 flex flex-col">
                  <ScrollArea className="flex-1 min-h-0">
                    <div className="p-4 sm:p-6 overflow-hidden">
                      <pre className="text-xs sm:text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed [overflow-wrap:anywhere]">
                        {userPrompt
                          ? `=== RELEVANT CONTEXT [Prompt: "${userPrompt}"] ===\n\n${contextData ? contextData.context : "Loading context..."}`
                          : "Please enter a prompt above and click 'Get Context' to see the targeted context."}
                      </pre>
                    </div>
                  </ScrollArea>
                </div>

                {finalPrompt && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-background text-foreground/80 hover:bg-muted border border-border/50 shadow-sm h-10 sm:h-11 rounded-lg font-medium"
                      onClick={() => {
                        const contentToCopy = userPrompt
                          ? `=== RELEVANT CONTEXT [Prompt: "${userPrompt}"] ===\n\n${contextData?.context || ""}\n\n${finalPrompt}`
                          : finalPrompt;
                        navigator.clipboard.writeText(contentToCopy);
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Relevant Context
                    </Button>
                    <div className="flex-1 flex">
                      <Button
                        className="flex-1 bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-10 sm:h-11 rounded-l-lg rounded-r-none border-none font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                        onClick={() => {
                          const content = userPrompt
                            ? `=== RELEVANT CONTEXT [Prompt: "${userPrompt}"] ===\n\n${contextData?.context || ""}\n\n${finalPrompt}`
                            : finalPrompt;
                          const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${baseFileName}-onecontext-prompt.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download .txt
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-10 sm:h-11 rounded-l-none rounded-r-lg border-l border-white/20 border-y-0 border-r-0 px-2 font-medium ring-0 ring-offset-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none transition-none"
                            variant="outline"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-fit space-y-1 p-2">
                          <DropdownMenuItem
                            onClick={() => {
                              const content = userPrompt
                                ? `=== RELEVANT CONTEXT [Prompt: "${userPrompt}"] ===\n\n${contextData?.context || ""}\n\n${finalPrompt}`
                                : finalPrompt;
                              const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `${baseFileName}-onecontext-prompt.txt`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-2.5 cursor-pointer text-muted-foreground"
                          >
                            <File className="h-4 w-4" />
                            Download as .txt
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const content = userPrompt
                                ? `=== RELEVANT CONTEXT [Prompt: "${userPrompt}"] ===\n\n${contextData?.context || ""}\n\n${finalPrompt}`
                                : finalPrompt;
                              const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `${baseFileName}-onecontext-prompt.md`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-2.5 cursor-pointer text-muted-foreground"
                          >
                            <FileText className="h-4 w-4" />
                            Download as .md
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
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
