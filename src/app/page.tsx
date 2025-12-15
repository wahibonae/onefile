"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, FileText, Download, X, Check } from "lucide-react";
import Sparkles from "@/components/icons/Sparkles";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";
import { cn } from "@/lib/utils";
import { GitHubRepositoryBrowser } from "@/components/GitHubRepositoryBrowser";
import { FAQSection } from "@/components/FAQSection";
import { LogoCloud } from "@/components/LogoCloud";
import { Navbar } from "@/components/Navbar";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { useFileManager } from "@/hooks/useFileManager";
import { usePromptOutput } from "@/hooks/usePromptOutput";
import { useGitHubBrowser } from "@/hooks/useGitHubBrowser";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

export default function Home() {
  const { files, handleFiles, removeFile, clearAllFiles, handleGitHubImport } =
    useFileManager();
  const { finalPrompt, copyToClipboard, downloadPrompt } =
    usePromptOutput(files);
  const {
    isGitHubBrowserOpen,
    setIsGitHubBrowserOpen,
    handleGitHubImportClick,
  } = useGitHubBrowser(files);
  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDragAndDrop(handleFiles);

  return (
    <div className="min-h-screen bg-background flex flex-col space-y-6">
      <div className="relative pb-8 sm:pb-12 md:pb-20">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] dark:bg-[url('/hero-bg-dark.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute bottom-0 left-0 right-0 h-[20%] dark:h-[35%] bg-gradient-to-b from-transparent to-background"></div>
        </div>

        <div className="relative z-10">
          <Navbar />

          <div className="flex-grow container max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8 md:py-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Bypass AI Upload Limits
                </h1>
                <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
                  Break through ChatGPT&apos;s 3-file limit. Combine unlimited
                  files into one AI-ready file.
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> </span>Works with Claude, Gemini,
                  Grok, and all AI platforms.
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
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium">
                        NEW: Import public repos instantly
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
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-32">
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
                    src="/before.jpg"
                    alt="ChatGPT file upload limit error - You've reached your file upload limit, Upgrade to Plus"
                    fill
                    className="object-cover dark:brightness-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
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
                    src="/after.jpg"
                    alt="OneFile success - your-onefile.txt ready to upload with unlimited files combined"
                    fill
                    className="object-cover dark:brightness-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
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

      <GitHubRepositoryBrowser
        open={isGitHubBrowserOpen}
        onClose={() => setIsGitHubBrowserOpen(false)}
        onImport={handleGitHubImport}
      />
    </div>
  );
}
