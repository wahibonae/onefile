"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Folder,
  FileCode,
  Check,
  Globe,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ALLOWED_EXTENSIONS } from "@/constants/files";
import GitHub from "./icons/Github";

type PublicImportState = "idle" | "downloading" | "processing" | "extracting";

interface PublicImportedTextFile {
  path: string;
  content: string;
}

interface PublicImportedDocFile {
  path: string;
  base64Content: string;
  needsExtraction: boolean;
}

interface PublicImportResponse {
  repository: string;
  branch: string;
  textFiles: PublicImportedTextFile[];
  documentFiles: PublicImportedDocFile[];
  totalFiles: number;
  skippedByLimit: boolean;
  error?: string;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: string;
  private: boolean;
  description: string | null;
  default_branch: string;
}

interface GitHubFile {
  path: string;
  sha: string;
  size?: number;
}

interface GitHubImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (files: Array<{ path: string; content: string }>) => void;
}

export function GitHubImportDialog({
  open,
  onClose,
  onImport,
}: GitHubImportDialogProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  // Public URL state
  const [publicUrl, setPublicUrl] = useState("");
  const [publicImportState, setPublicImportState] =
    useState<PublicImportState>("idle");
  const [publicError, setPublicError] = useState<string | null>(null);

  // Fetch repositories when dialog opens
  useEffect(() => {
    if (open && repositories.length === 0) {
      fetchRepositories();
    }
  }, [open, repositories.length]);

  const fetchRepositories = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/github/repos");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch repositories");
      }

      const data = await response.json();
      setRepositories(data.repositories);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch repositories from GitHub"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositoryTree = async (repo: Repository): Promise<void> => {
    setLoading(true);
    setSelectedRepo(repo);
    setFiles([]);
    setSelectedFiles(new Set());

    try {
      const response = await fetch(
        `/api/github/tree?repo=${encodeURIComponent(
          repo.full_name
        )}&branch=${encodeURIComponent(repo.default_branch)}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch repository files");
      }

      const data = await response.json();

      // Filter files by allowed extensions
      const allowedFiles = data.files.filter((file: GitHubFile) => {
        const extension = file.path.split(".").pop()?.toLowerCase();
        return extension && ALLOWED_EXTENSIONS.has(`.${extension}`);
      });

      setFiles(allowedFiles);

      if (allowedFiles.length === 0) {
        toast.error("No supported files found in this repository");
      }
    } catch (error) {
      console.error("Error fetching repository tree:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch repository files"
      );
      setSelectedRepo(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleFileSelection = (filePath: string): void => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(filePath)) {
      newSelection.delete(filePath);
    } else {
      newSelection.add(filePath);
    }
    setSelectedFiles(newSelection);
  };

  const selectAllFiles = (): void => {
    setSelectedFiles(new Set(files.map((f) => f.path)));
  };

  const deselectAllFiles = (): void => {
    setSelectedFiles(new Set());
  };

  const handleImport = async (): Promise<void> => {
    if (!selectedRepo || selectedFiles.size === 0) {
      toast.error("Please select files to import");
      return;
    }

    setImporting(true);

    try {
      const filesToFetch = files.filter((f) => selectedFiles.has(f.path));

      const response = await fetch("/api/github/fetch-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo: selectedRepo.full_name,
          files: filesToFetch,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch files");
      }

      const data = await response.json();

      if (data.failed_count > 0) {
        toast.error(`Failed to fetch ${data.failed_count} file(s)`);
      }

      const textFiles: Array<{ path: string; content: string }> = [];
      const documentFiles: Array<{ path: string; base64Content: string }> = [];

      for (const file of data.files) {
        if (file.needsExtraction && file.base64Content) {
          documentFiles.push({
            path: file.path,
            base64Content: file.base64Content,
          });
        } else if (file.content) {
          textFiles.push({ path: file.path, content: file.content });
        }
      }

      const extractedFiles: Array<{ path: string; content: string }> = [];

      for (const docFile of documentFiles) {
        try {
          const extractResponse = await fetch("/api/extract-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              base64Data: docFile.base64Content,
              fileName: docFile.path,
            }),
          });

          if (extractResponse.ok) {
            const { text } = await extractResponse.json();
            if (text && text.trim()) {
              extractedFiles.push({ path: docFile.path, content: text });
            }
          } else {
            console.error(`Failed to extract text from ${docFile.path}`);
          }
        } catch (err) {
          console.error(`Error extracting ${docFile.path}:`, err);
        }
      }

      const allFiles = [...textFiles, ...extractedFiles];

      if (allFiles.length > 0) {
        onImport(allFiles);
        toast.success(`Imported ${allFiles.length} file(s) from GitHub`);
        onClose();
      } else {
        toast.error("No files were successfully imported");
      }
    } catch (error) {
      console.error("Error importing files:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to import files from GitHub"
      );
    } finally {
      setImporting(false);
    }
  };

  // Validate GitHub URL format (matches github.com/owner/repo)
  const isValidGitHubUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const patterns = [
      /^https?:\/\/github\.com\/[^/]+\/[^/.\s]+/,
      /^github\.com\/[^/]+\/[^/.\s]+/,
    ];
    return patterns.some((pattern) => pattern.test(url.trim()));
  };

  const isPublicUrlValid = isValidGitHubUrl(publicUrl);

  const handlePublicImport = async (): Promise<void> => {
    if (!isPublicUrlValid) {
      setPublicError(
        "Invalid GitHub URL. Expected format: github.com/owner/repo"
      );
      return;
    }

    setPublicError(null);
    setPublicImportState("downloading");

    try {
      const response = await fetch("/api/github/import-public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: publicUrl.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to import repository");
      }

      const data: PublicImportResponse = await response.json();
      setPublicImportState("processing");

      const allFiles: Array<{ path: string; content: string }> = [];

      // Add text files directly
      for (const file of data.textFiles || []) {
        if (file.content && file.content.trim()) {
          allFiles.push({ path: file.path, content: file.content });
        }
      }

      // Process document files through extract-text API
      if (data.documentFiles && data.documentFiles.length > 0) {
        setPublicImportState("extracting");

        for (const docFile of data.documentFiles) {
          try {
            const extractResponse = await fetch("/api/extract-text", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                base64Data: docFile.base64Content,
                fileName: docFile.path,
              }),
            });

            if (extractResponse.ok) {
              const { text } = await extractResponse.json();
              if (text && text.trim()) {
                allFiles.push({ path: docFile.path, content: text });
              }
            }
          } catch (err) {
            console.error(`Failed to extract ${docFile.path}:`, err);
          }
        }
      }

      if (allFiles.length === 0) {
        throw new Error("No supported files found in repository");
      }

      onImport(allFiles);

      const message = data.skippedByLimit
        ? `Imported ${allFiles.length} files (some files skipped due to limit)`
        : `Imported ${allFiles.length} files from ${data.repository}`;
      toast.success(message);

      // Reset and close
      setPublicUrl("");
      setPublicImportState("idle");
      onClose();
    } catch (err) {
      console.error("Import error:", err);
      setPublicError(
        err instanceof Error ? err.message : "Failed to import repository"
      );
      setPublicImportState("idle");
    }
  };

  const isPublicLoading = publicImportState !== "idle";
  const isProcessing = isPublicLoading || importing;

  const handleDialogClose = (openState: boolean): void => {
    if (!openState && isProcessing) return; // Prevent closing while processing
    if (!openState) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <GitHub className="h-5 w-5" />
            Import from GitHub
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Tabs for repo selection */}
          {!selectedRepo && (
            <Tabs defaultValue="my-repos" className="w-full">
              <div className="flex w-full justify-center mb-4">
                <TabsList className="w-full grid grid-cols-2 bg-primary/5 h-11 rounded-lg p-1">
                  <TabsTrigger
                    value="my-repos"
                    className="gap-2 h-9 px-3"
                    disabled={isProcessing}
                  >
                    <Folder className="h-4 w-4" />
                    My Repositories
                  </TabsTrigger>
                  <TabsTrigger
                    value="public-url"
                    className="gap-2 h-9 px-3"
                    disabled={isProcessing}
                  >
                    <Globe className="h-4 w-4" />
                    Public Repository
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="my-repos">
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a repository to import files from
                  </p>

                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : repositories.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        No repositories found. Make sure you&apos;re signed in
                        with GitHub.
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[350px] rounded-lg border dark:border-border">
                      <div className="p-2">
                        {repositories.map((repo) => (
                          <button
                            key={repo.id}
                            onClick={() => fetchRepositoryTree(repo)}
                            className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <Folder className="h-5 w-5 text-primary mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">
                                  {repo.name}
                                </p>
                                {repo.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                    {repo.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {repo.private ? "🔒 Private" : "🌍 Public"}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {repo.owner}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="public-url">
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label htmlFor="github-url" className="text-sm font-medium">
                      Repository URL
                    </label>
                    <input
                      id="github-url"
                      type="text"
                      value={publicUrl}
                      onChange={(e) => setPublicUrl(e.target.value)}
                      placeholder="Example: https://github.com/facebook/react"
                      disabled={isPublicLoading}
                      className={cn(
                        "w-full px-3 py-2 rounded-lg border bg-background text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "placeholder:text-muted-foreground",
                        publicError ? "border-destructive" : "border-border"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isPublicLoading) {
                          handlePublicImport();
                        }
                      }}
                    />
                  </div>

                  {publicError && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{publicError}</span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      disabled={isPublicLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePublicImport}
                      disabled={isPublicLoading || !isPublicUrlValid}
                      className="flex-1"
                    >
                      {isPublicLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Importing...
                        </>
                      ) : (
                        "Import"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* File selection view (when a repo is selected from My Repositories) */}
          {selectedRepo && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <button
                    onClick={() => {
                      setSelectedRepo(null);
                      setFiles([]);
                      setSelectedFiles(new Set());
                    }}
                    className="text-sm text-primary hover:underline mb-1"
                  >
                    ← Back to repositories
                  </button>
                  <p className="font-medium">{selectedRepo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFiles.size} of {files.length} files selected
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllFiles}
                    disabled={loading}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deselectAllFiles}
                    disabled={loading}
                  >
                    Deselect All
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ScrollArea className="h-[300px] rounded-lg border">
                  <div className="p-2">
                    {files.map((file) => {
                      const isSelected = selectedFiles.has(file.path);
                      return (
                        <button
                          key={file.path}
                          onClick={() => toggleFileSelection(file.path)}
                          className={cn(
                            "w-full text-left p-2 rounded-lg transition-colors flex items-center gap-3",
                            isSelected
                              ? "bg-primary/10 hover:bg-primary/15"
                              : "hover:bg-muted"
                          )}
                        >
                          <div
                            className={cn(
                              "h-5 w-5 rounded border-2 flex items-center justify-center",
                              isSelected
                                ? "bg-primary border-primary"
                                : "border-muted-foreground/30"
                            )}
                          >
                            {isSelected && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <FileCode className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm flex-1 truncate">
                            {file.path}
                          </span>
                          {file.size && (
                            <span className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}

              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={importing}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={selectedFiles.size === 0 || importing}
                  className="flex-1"
                >
                  {importing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    `Import ${selectedFiles.size} file${
                      selectedFiles.size === 1 ? "" : "s"
                    }`
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
