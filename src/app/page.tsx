'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code2, Copy, FileText, Download } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

import { FileUpload } from '@/components/FileUpload'
import { FileList } from '@/components/FileList'
import { FileWithContent } from '@/types'
import { processFile, processEntry, generatePromptText, isPathIgnored, isFileAllowed } from '@/utils/files'
import { ThemeToggle } from '@/components/theme-toggle'

// Add type declaration for webkitdirectory
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [files, setFiles] = useState<FileWithContent[]>([])
  const [finalPrompt, setFinalPrompt] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  useEffect(() => {
    // Update the final prompt whenever prompt or files change
    if (files.length > 0 && prompt.trim()) {
      const result = generatePromptText(prompt, files)
      setFinalPrompt(result)
    } else {
      setFinalPrompt('')
    }
  }, [prompt, files])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return
    
    try {
      const existingPaths = new Set(files.map((f: FileWithContent) => f.path))
      const newFiles: { file: File; path: string }[] = []
      const skippedFiles: string[] = []
      const ignoredFiles: string[] = []

      // Process all files
      for (const file of Array.from(fileList)) {
        const relativePath = file.webkitRelativePath || file.name

        // Check if path should be ignored
        if (isPathIgnored(relativePath)) {
          ignoredFiles.push(relativePath)
          continue
        }

        // Check if file type is allowed
        if (!isFileAllowed(file)) {
          skippedFiles.push(file.name)
          continue
        }

        if (!existingPaths.has(relativePath)) {
          newFiles.push({ file, path: relativePath })
        }
      }

      if (ignoredFiles.length > 0) {
        toast.success(`Skipped ${ignoredFiles.length} files from ignored directories`)
      }

      if (skippedFiles.length > 0) {
        toast.error(`Skipped ${skippedFiles.length} unsupported file${skippedFiles.length === 1 ? '' : 's'}`)
      }

      if (newFiles.length === 0) {
        if (skippedFiles.length === 0 && ignoredFiles.length === 0) {
          toast.error('These files have already been added')
        }
        return
      }

      const results = await Promise.all(
        newFiles.map(({ file, path }) => processFile(file, path))
      )
      
      setFiles((prev: FileWithContent[]) => [...prev, ...results])
      toast.success(`Added ${results.length} file${results.length === 1 ? '' : 's'}`)
    } catch (error) {
      console.error('Failed to read some files:', error)
      toast.error('Failed to read some files')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const items = Array.from(e.dataTransfer.items)
    const entries = items.map(item => item.webkitGetAsEntry()).filter((entry): entry is FileSystemEntry => entry !== null)
    
    try {
      const files = await Promise.all(entries.map(entry => processEntry(entry)))
      const flattenedFiles = files.flat()
      
      if (flattenedFiles.length > 0) {
        handleFiles(flattenedFiles as unknown as FileList)
      }
    } catch (error) {
      console.error('Failed to process some dropped items:', error)
      toast.error('Failed to process some dropped items')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_: FileWithContent, i: number) => i !== index))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalPrompt)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy to clipboard'))
  }

  const downloadPrompt = () => {
    const blob = new Blob([finalPrompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'code-to-prompt.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Prompt downloaded successfully')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Code2 className="h-12 w-12 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold tracking-tight">Code To Prompt</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your code files into AI-ready prompts effortlessly. Perfect for seamless interactions with AI assistants and LLMs.
            </p>
            <div className="absolute top-4 right-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="p-6 transition-all hover:shadow-lg">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold">
                    <div className="flex items-center gap-2">
                      <FileText className="h-6 w-6" />
                      Input
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Prompt</label>
                    <Textarea
                      placeholder="Example: Analyze this code and suggest improvements for performance and readability..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px] resize-none text-base leading-relaxed"
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

                  <FileList
                    files={files}
                    onRemoveFile={removeFile}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <Card className="p-6 transition-all hover:shadow-lg">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-7 w-7" strokeWidth={2} />
                      AI-ready Prompt
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <ScrollArea className="h-[500px] rounded-md border p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {finalPrompt || "Your AI-ready prompt will appear here..."}
                    </pre>
                  </ScrollArea>

                  {finalPrompt && (
                    <div className="flex gap-2">
                      <Button
                        className="w-full gap-2"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                        Copy to Clipboard
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
          duration: 2000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
          },
        }}
      />
    </div>
  )
}