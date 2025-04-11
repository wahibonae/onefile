"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, Copy, FileText, Download } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";
import { FileWithContent } from "@/types";
import {
  processFile,
  processEntry,
  generatePromptText,
  isPathIgnored,
  isFileAllowed,
  skippedStats
} from "@/utils/files";
import { ThemeToggle } from "@/components/theme-toggle";
import { InfoDialog } from "@/components/InfoDialog";
import { IGNORED_PATHS } from "@/constants/files";
import OpenAI from "@/components/openai";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<FileWithContent[]>([]);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    // Update the final prompt whenever prompt or files change
    if (files.length > 0 && prompt.trim()) {
      const result = generatePromptText(prompt, files);
      setFinalPrompt(result);
    } else {
      setFinalPrompt("");
    }
  }, [prompt, files]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;

    try {
      const existingPaths = new Set(files.map((f: FileWithContent) => f.path));
      const newFiles: { file: File; path: string }[] = [];
      const skippedFiles: string[] = [];
      const skippedImageFiles: string[] = [];
      const ignoredFiles: string[] = [];
      const ignoredDirectories = new Map<string, number>();

      // Process all files
      for (const file of Array.from(fileList)) {
        const relativePath = file.webkitRelativePath || file.name;

        // Check if path should be ignored
        if (isPathIgnored(relativePath)) {
          ignoredFiles.push(relativePath);
          
          // Track which directories are being skipped
          const pathParts = relativePath.split('/');
          for (const part of pathParts) {
            if (part && IGNORED_PATHS.has(part)) {
              const count = ignoredDirectories.get(part) || 0;
              ignoredDirectories.set(part, count + 1);
              break; // Only count the first ignored directory in the path
            }
          }
          
          continue;
        }

        // Check if file type is allowed
        if (!isFileAllowed(file)) {
          // Check if it's an image file
          const isImage = file.type.startsWith('image/');
          if (isImage) {
            skippedImageFiles.push(file.name);
          } else {
            skippedFiles.push(file.name);
          }
          continue;
        }

        if (!existingPaths.has(relativePath)) {
          newFiles.push({ file, path: relativePath });
        }
      }

      // Get additional skipped directories from the directory traversal process
      const skippedDirsFromTraversal = skippedStats.getDirectoryCounts();
      skippedDirsFromTraversal.forEach((count, dir) => {
        ignoredDirectories.set(dir, (ignoredDirectories.get(dir) || 0) + count);
      });
      
      // Get any additional skipped images from the directory traversal
      const additionalSkippedImages = skippedStats.getImageCount();
      const totalSkippedImages = skippedImageFiles.length + additionalSkippedImages;

      // Handle both unsupported files, images, and ignored directories in one message
      if (skippedFiles.length > 0 || totalSkippedImages > 0 || ignoredDirectories.size > 0) {
        let message = '';
        
        const hasUnsupportedFiles = skippedFiles.length > 0;
        const hasSkippedImages = totalSkippedImages > 0;
        
        if (hasUnsupportedFiles || hasSkippedImages) {
          // Build message for skipped files
          if (hasUnsupportedFiles) {
            message = `Skipped ${skippedFiles.length} unsupported file${
              skippedFiles.length === 1 ? "" : "s"
            }`;
          }
          
          // Add skipped images info if any
          if (hasSkippedImages) {
            if (message) {
              message += `, ${totalSkippedImages} image${
                totalSkippedImages === 1 ? "" : "s"
              }`;
            } else {
              message = `Skipped ${totalSkippedImages} image${
                totalSkippedImages === 1 ? "" : "s"
              }`;
            }
          }
          
          // Add ignored directories info if any
          if (ignoredDirectories.size > 0) {
            const dirNames = Array.from(ignoredDirectories.keys()).join(', ');
            message += ` + ${dirNames}`;
          }
        } else if (ignoredDirectories.size > 0) {
          const dirNames = Array.from(ignoredDirectories.keys()).join(', ');
          message = `Skipped files from: ${dirNames}`;
        }
        
        toast.error(message);
      }

      if (newFiles.length === 0) {
        if (skippedFiles.length === 0 && skippedImageFiles.length === 0 && ignoredFiles.length === 0) {
          toast.error("These files have already been added");
        }
        return;
      }

      // Show loading toast only if there are files to process
      const loadingToastId = toast.loading("Processing files...");

      try {
        const results = await Promise.all(
          newFiles.map(({ file, path }) => processFile(file, path))
        );

        setFiles((prev: FileWithContent[]) => [...prev, ...results]);
        
        // Dismiss loading toast before showing success
        toast.dismiss(loadingToastId);
        toast.success(
          `Added ${results.length} file${results.length === 1 ? "" : "s"}`
        );
      } catch (processingError) {
        // Dismiss loading toast before showing processing error
        toast.dismiss(loadingToastId);
        console.error("Failed during file processing:", processingError);
        toast.error("Failed to process some files");
      }

    } catch (error) {
      // General error handling (might need to dismiss if loading started but failed before inner try)
      // Note: The current structure might dismiss twice if error is in the inner try-catch,
      // but toast.dismiss is idempotent (safe to call on non-existent ID).
      // Consider if a loadingToastId variable needs broader scope if errors can happen *before* the inner try.
      // For now, assume errors before inner try are less likely or don't warrant the loading toast.
      console.error("Failed to read some files:", error);
      toast.error("Failed to read some files");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const items = Array.from(e.dataTransfer.items);
    const entries = items
      .map((item) => item.webkitGetAsEntry())
      .filter((entry): entry is FileSystemEntry => entry !== null);

    try {
      // Reset stats before processing
      skippedStats.reset();
      
      // Process files without showing immediate feedback
      const files = await Promise.all(
        entries.map((entry) => processEntry(entry))
      );
      const flattenedFiles = files.flat();

      // Collect information about skipped items
      const skippedImages = skippedStats.getImageCount();
      const ignoredDirs = skippedStats.getDirectoryCounts();
      
      // If we have no valid files but we skipped some content, show a message
      if (flattenedFiles.length === 0 && (skippedImages > 0 || ignoredDirs.size > 0)) {
        let message = '';
        
        if (skippedImages > 0) {
          message = `Skipped ${skippedImages} image${skippedImages === 1 ? '' : 's'}`;
          
          if (ignoredDirs.size > 0) {
            const dirNames = Array.from(ignoredDirs.keys()).join(', ');
            message += ` + ${dirNames}`;
          }
        } else if (ignoredDirs.size > 0) {
          const dirNames = Array.from(ignoredDirs.keys()).join(', ');
          message = `Skipped files from: ${dirNames}`;
        }
        
        toast.error(message);
        return;
      }
      
      if (flattenedFiles.length > 0) {
        handleFiles(flattenedFiles as unknown as FileList);
      }
    } catch (error) {
      console.error("Failed to process some dropped items:", error);
      toast.error("Failed to process some dropped items");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_: FileWithContent, i: number) => i !== index));
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(finalPrompt)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  const downloadPrompt = () => {
    const blob = new Blob([finalPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code-to-prompt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Prompt downloaded successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary dark:from-zinc-950 dark:to-zinc-900">
      <div className="container lg:max-w-[1280px] mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Code2 className="h-10 w-10 text-black animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Code To Prompt
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Transform your code files into AI-ready prompts effortlessly.
              Perfect for seamless interactions with AI assistants and LLMs.
            </p>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <InfoDialog />
              <ThemeToggle />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <Card className="p-4 md:p-6 transition-all hover:shadow-lg">
                <CardHeader className="px-0 pt-0 pb-3">
                  <CardTitle className="text-xl md:text-2xl font-semibold">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 md:h-6 md:w-6" />
                      Input
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Prompt
                    </label>
                    <Textarea
                      placeholder="Example: Analyze this code and suggest improvements for performance and readability..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[80px] resize-none text-base leading-relaxed"
                    />
                  </div>

                  <FileUpload
                    isDragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onFileChange={handleFileChange}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    dropdownRef={dropdownRef}
                  />

                  <FileList files={files} onRemoveFile={removeFile} />
                </CardContent>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <Card className="p-4 md:p-6 transition-all hover:shadow-lg">
                <CardHeader className="px-0 pt-0 pb-3">
                  <CardTitle className="text-xl md:text-2xl font-semibold">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
                      AI-ready Prompt
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <ScrollArea className="h-[300px] md:h-[400px] rounded-md border p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {finalPrompt ||
                        "Your AI-ready prompt will appear here..."}
                    </pre>
                  </ScrollArea>

                  {finalPrompt && (
                    <div className="flex gap-2">
                      {/*<Button
                        className="w-full gap-2 bg-gradient-to-t from-gray-800 to-gray-600 text-white hover:opacity-90 transition-all duration-300"
                        onClick={() => {
                          const encodedPrompt = encodeURIComponent(finalPrompt);
                          window.open(`https://chatgpt.com/?q=${encodedPrompt}`, "_blank");
                        }}
                      >
                        <OpenAI className="h-4 w-4" />
                        Ask ChatGPT
                      </Button>*/}
                      <Button
                        className="w-full gap-2"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                        Copy To Clipboard
                      </Button>
                      <Button
                        className="w-full gap-2"
                        onClick={downloadPrompt}
                        variant="outline"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
          success: {
            iconTheme: {
              primary: "hsl(var(--primary))",
              secondary: "hsl(var(--primary-foreground))",
            },
          },
        }}
      />
    </div>
  );
}
