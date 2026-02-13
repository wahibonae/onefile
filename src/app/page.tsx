"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, FileText, Download, X, Check, ChevronDown } from "lucide-react";
import Sparkles from "@/components/icons/Sparkles";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";
import { cn } from "@/lib/utils";
import { GitHubImportDialog } from "@/components/GitHubImportDialog";
import { TextContentDialog } from "@/components/TextContentDialog";
import { FAQSection } from "@/components/FAQSection";
import { LogoCloud } from "@/components/LogoCloud";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { useFileManager } from "@/hooks/useFileManager";
import { usePromptOutput } from "@/hooks/usePromptOutput";
import { useGitHubBrowser } from "@/hooks/useGitHubBrowser";
import { useTextContentDialog } from "@/hooks/useTextContentDialog";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

const IMPORT_SOURCES = ["text content", "public GitHub repos"];

export default function Home() {
  const { files, handleFiles, removeFile, clearAllFiles, handleGitHubImport } =
    useFileManager();
  const { finalPrompt, copyToClipboard, downloadPrompt } =
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
      <ScrollProgress />
      <div className="min-h-screen bg-background flex flex-col space-y-6">
        <div className="relative pb-8 sm:pb-12 md:pb-20">
        <div className="absolute bottom-14 inset-0 saturate-130">
          <Image
            src="/hero-bg.webp"
            alt=""
            fill
            className="object-cover dark:hidden"
            sizes="100vw"
            priority
          />
          <Image
            src="/hero-bg-dark.webp"
            alt=""
            fill
            className="object-cover hidden dark:block"
            sizes="100vw"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-[20%] dark:h-[35%] bg-gradient-to-b from-transparent to-background"></div>
        </div>

        <div className="relative z-10">
          <Navbar />

          <div className="flex-grow container max-w-6xl mx-auto px-6 pb-8 sm:pb-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8 md:py-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Upload Unlimited Files to AI
                </h1>
                <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
                  Bypass ChatGPT&apos;s 3-file limit. Combine unlimited files into
                  one AI-ready file.
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> </span>Free tool for ChatGPT,
                  Claude, Gemini, and all AI platforms.
                </p>
              </div>

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
                            onClick={downloadPrompt}
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
            </div>

            <button
              onClick={() => document.getElementById("content")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden md:flex flex-col items-center mx-auto mt-8 animate-pulse cursor-pointer text-muted-foreground hover:text-primary transition-all"
            >
              <span className="text-sm mb-1">Learn More</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div id="content" className="container max-w-6xl mx-auto px-6 py-12 space-y-32">
        <LogoCloud />

        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Why OneFile Solves AI Upload Limits
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/before.webp"
                    alt="ChatGPT file upload limit error - You've reached your file upload limit, Upgrade to Plus"
                    fill
                    className="object-cover dark:brightness-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>

                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                    <X className="h-4 w-4" />
                    Without OneFile
                  </div>
                </div>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                Frustrated by file upload limits on AI platforms
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/after.webp"
                    alt="OneFile success - your-onefile.txt ready to upload with unlimited files combined"
                    fill
                    className="object-cover dark:brightness-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>

                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                    <Check className="h-4 w-4" />
                    With OneFile
                  </div>
                </div>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                Upload unlimited files in one go - no restrictions
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            How It Works
          </h2>
          <FeaturesShowcase />
        </section>

        <TestimonialsSection />

        <FAQSection />
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
      </div>
    </>
  );
}
