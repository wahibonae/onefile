'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2, Folder, FileCode, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { ALLOWED_EXTENSIONS } from '@/constants/files'

interface Repository {
  id: number
  name: string
  full_name: string
  owner: string
  private: boolean
  description: string | null
  default_branch: string
}

interface GitHubFile {
  path: string
  sha: string
  size?: number
}

interface GitHubRepositoryBrowserProps {
  open: boolean
  onClose: () => void
  onImport: (files: Array<{ path: string; content: string }>) => void
}

export function GitHubRepositoryBrowser({
  open,
  onClose,
  onImport,
}: GitHubRepositoryBrowserProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)

  // Fetch repositories when dialog opens
  useEffect(() => {
    if (open && repositories.length === 0) {
      fetchRepositories()
    }
  }, [open, repositories.length])

  const fetchRepositories = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await fetch('/api/github/repos')

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch repositories')
      }

      const data = await response.json()
      setRepositories(data.repositories)
    } catch (error) {
      console.error('Error fetching repositories:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to fetch repositories from GitHub'
      )
    } finally {
      setLoading(false)
    }
  }

  const fetchRepositoryTree = async (repo: Repository): Promise<void> => {
    setLoading(true)
    setSelectedRepo(repo)
    setFiles([])
    setSelectedFiles(new Set())

    try {
      const response = await fetch(
        `/api/github/tree?repo=${encodeURIComponent(repo.full_name)}&branch=${encodeURIComponent(repo.default_branch)}`
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch repository files')
      }

      const data = await response.json()

      // Filter files by allowed extensions
      const allowedFiles = data.files.filter((file: GitHubFile) => {
        const extension = file.path.split('.').pop()?.toLowerCase()
        return extension && ALLOWED_EXTENSIONS.has(`.${extension}`)
      })

      setFiles(allowedFiles)

      if (allowedFiles.length === 0) {
        toast.error('No supported files found in this repository')
      }
    } catch (error) {
      console.error('Error fetching repository tree:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to fetch repository files'
      )
      setSelectedRepo(null)
    } finally {
      setLoading(false)
    }
  }

  const toggleFileSelection = (filePath: string): void => {
    const newSelection = new Set(selectedFiles)
    if (newSelection.has(filePath)) {
      newSelection.delete(filePath)
    } else {
      newSelection.add(filePath)
    }
    setSelectedFiles(newSelection)
  }

  const selectAllFiles = (): void => {
    setSelectedFiles(new Set(files.map((f) => f.path)))
  }

  const deselectAllFiles = (): void => {
    setSelectedFiles(new Set())
  }

  const handleImport = async (): Promise<void> => {
    if (!selectedRepo || selectedFiles.size === 0) {
      toast.error('Please select files to import')
      return
    }

    setImporting(true)

    try {
      const filesToFetch = files.filter((f) => selectedFiles.has(f.path))

      const response = await fetch('/api/github/fetch-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repo: selectedRepo.full_name,
          files: filesToFetch,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch files')
      }

      const data = await response.json()

      if (data.failed_count > 0) {
        toast.error(`Failed to fetch ${data.failed_count} file(s)`)
      }

      const textFiles: Array<{ path: string; content: string }> = []
      const documentFiles: Array<{ path: string; base64Content: string }> = []

      for (const file of data.files) {
        if (file.needsExtraction && file.base64Content) {
          documentFiles.push({ path: file.path, base64Content: file.base64Content })
        } else if (file.content) {
          textFiles.push({ path: file.path, content: file.content })
        }
      }

      const extractedFiles: Array<{ path: string; content: string }> = []

      for (const docFile of documentFiles) {
        try {
          const extractResponse = await fetch('/api/extract-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Data: docFile.base64Content,
              fileName: docFile.path,
            }),
          })

          if (extractResponse.ok) {
            const { text } = await extractResponse.json()
            if (text && text.trim()) {
              extractedFiles.push({ path: docFile.path, content: text })
            }
          } else {
            console.error(`Failed to extract text from ${docFile.path}`)
          }
        } catch (err) {
          console.error(`Error extracting ${docFile.path}:`, err)
        }
      }

      const allFiles = [...textFiles, ...extractedFiles]

      if (allFiles.length > 0) {
        onImport(allFiles)
        toast.success(`Imported ${allFiles.length} file(s) from GitHub`)
        onClose()
      } else {
        toast.error('No files were successfully imported')
      }
    } catch (error) {
      console.error('Error importing files:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to import files from GitHub'
      )
    } finally {
      setImporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Import from GitHub</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          {!selectedRepo ? (
            // Repository selection view
            <div>
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
                    No repositories found. Make sure you&apos;re signed in with GitHub.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] rounded-lg border">
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
                                {repo.private ? '🔒 Private' : '🌍 Public'}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
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
          ) : (
            // File selection view
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <button
                    onClick={() => {
                      setSelectedRepo(null)
                      setFiles([])
                      setSelectedFiles(new Set())
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
                      const isSelected = selectedFiles.has(file.path)
                      return (
                        <button
                          key={file.path}
                          onClick={() => toggleFileSelection(file.path)}
                          className={cn(
                            'w-full text-left p-2 rounded-lg transition-colors flex items-center gap-3',
                            isSelected
                              ? 'bg-primary/10 hover:bg-primary/15'
                              : 'hover:bg-muted'
                          )}
                        >
                          <div
                            className={cn(
                              'h-5 w-5 rounded border-2 flex items-center justify-center',
                              isSelected
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground/30'
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
                      )
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
                    `Import ${selectedFiles.size} file${selectedFiles.size === 1 ? '' : 's'}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
