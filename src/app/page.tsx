"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
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
import { cn } from "@/lib/utils";

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
  const [stickerClicked, setStickerClicked] = useState(false);
  const [stickerHidden, setStickerHidden] = useState(false);
  const [stickerFadingOut, setStickerFadingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    // Update the final prompt whenever prompt or files change
    if (files.length > 0 || prompt.trim() !== "") {
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
        const results = await Promise.allSettled(
          newFiles.map(({ file, path }) => processFile(file, path))
        );

        const successfulFiles: FileWithContent[] = [];
        const emptyFiles: string[] = [];
        const failedFiles: string[] = [];

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            successfulFiles.push(result.value);
          } else {
            const fileName = newFiles[index].file.name;
            if (result.reason.message.includes('appears to be empty')) {
              emptyFiles.push(fileName);
            } else {
              failedFiles.push(fileName);
            }
          }
        });

        if (successfulFiles.length > 0) {
          setFiles((prev: FileWithContent[]) => [...prev, ...successfulFiles]);
        }
        
        // Wait a brief moment to ensure state updates are processed
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Dismiss loading toast before showing results
        toast.dismiss(loadingToastId);

        // Show appropriate feedback
        if (successfulFiles.length > 0) {
          toast.success(
            `Added ${successfulFiles.length} file${successfulFiles.length === 1 ? "" : "s"}`
          );
        }

        if (emptyFiles.length > 0) {
          toast.error(
            `Skipped ${emptyFiles.length} empty file${emptyFiles.length === 1 ? "" : "s"}`
          );
        }

        if (failedFiles.length > 0) {
          toast.error(
            `Failed to process ${failedFiles.length} file${failedFiles.length === 1 ? "" : "s"}`
          );
        }

      } catch (processingError) {
        toast.dismiss(loadingToastId);
        console.error("Failed during file processing:", processingError);
        toast.error("Failed to process some files");
      }

    } catch (error) {
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

  const clearAllFiles = () => {
    setFiles([]);
  };

  const handleStickerClick = () => {
    if (stickerClicked) return; // Prevent multiple clicks
    
    setStickerClicked(true);
    
    // Trigger confetti effect
    const end = Date.now() + 1 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
    
    // Start fade out after 2.5 seconds, then hide completely after fade completes
    setTimeout(() => {
      setStickerFadingOut(true);
      // Hide completely after fade transition completes (1500ms)
      setTimeout(() => {
        setStickerHidden(true);
      }, 1500);
    }, 2500);
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
    a.download = "onefile-prompt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("One File downloaded successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Legacy Notice Sticker */}
      {!stickerHidden && (
        <div 
          className={cn(
            "fixed top-9 left-6 z-50 px-3 py-2 -rotate-2 hover:rotate-0 transition-all duration-500 cursor-pointer bg-background border border-dashed border-border rounded-lg shadow-sm",
            stickerFadingOut ? 'opacity-0' : 'opacity-70'
          )}
          onClick={handleStickerClick}
        >
          <div className={cn("transition-opacity duration-500", stickerClicked ? 'opacity-0' : 'opacity-100')}>
            <div className="text-xs font-medium tracking-wide text-foreground mb-1">
              previously known as
            </div>
          
            <div className="flex items-center justify-center space-x-1.5">
              <Code2 className="h-4 w-4 text-foreground" />
              <span className="text-sm font-bold tracking-tight text-foreground">
                Code To Prompt
              </span>
            </div>
          </div>
          
          <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-500", stickerClicked ? 'opacity-100' : 'opacity-0')}>
            <div className="text-center">
              <div className="text-xs font-medium tracking-wide text-foreground mb-1">
                welcome to
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="flex items-center justify-center h-4 w-4 text-primary font-bold text-xs bg-primary/10 rounded">1</span>
                <span className="text-sm font-bold tracking-tight text-foreground">
                  OneFile
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container max-w-6xl mx-auto px-6 py-12 pt-14">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {/* <Code2 className="h-8 w-8 text-primary" /> */}
                <span className="flex items-center justify-center h-8 w-8 text-primary font-bold text-3xl">1</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-foreground">
                OneFile
              </h1>
            </div>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              Combine multiple files into one AI-ready file. <br />
              No more upload limits, file size limits, or ... // TODO: Add more info
            </p>
            <div className="absolute top-8 right-8 flex items-center gap-3">
              <InfoDialog />
              <ThemeToggle />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground">
                    Input
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Your Prompt
                    </label>
                    <Textarea
                      // placeholder="Example: Help me study for my exam using these materials, or analyze these documents for insights, or review this project for improvements..."
                      placeholder="Example: Help me study for my exam using these materials..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[70px] resize-none"
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

                  <FileList files={files} onRemoveFile={removeFile} onClearAll={clearAllFiles} />
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      <path d="M5 3v4" />
                      <path d="M19 17v4" />
                      <path d="M3 5h4" />
                      <path d="M17 19h4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground">
                    AI-ready Prompt
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <ScrollArea className="h-[400px] rounded-xl border border-border bg-muted/30 p-6">
                    <pre className="text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed">
                      {finalPrompt ||
                        "Your one file (prompt + files) will appear here..."}
                    </pre>
                  </ScrollArea>

                  {finalPrompt && (
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-background text-foreground/80 hover:bg-muted border border-border/50 shadow-sm h-11 rounded-lg font-medium"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy To Clipboard
                      </Button>
                      <Button
                        className={cn(
                          "flex-1 bg-primary text-white hover:text-white hover:bg-primary/95 shadow-sm h-11 rounded-lg font-medium"
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
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
