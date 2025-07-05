import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, IGNORED_PATHS } from '@/constants/files'
import { FileWithContent } from '@/types'

// GitIgnore pattern matching class
class GitignoreParser {
  private patterns: Array<{ pattern: string; isNegation: boolean; isDirectory: boolean }> = []
  private basePath: string

  constructor(basePath: string) {
    this.basePath = basePath
  }

  addRules(gitignoreContent: string) {
    const lines = gitignoreContent.split('\n')
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        continue
      }

      let pattern = trimmed
      let isNegation = false
      let isDirectory = false

      // Handle negation patterns (starting with !)
      if (pattern.startsWith('!')) {
        isNegation = true
        pattern = pattern.substring(1)
      }

      // Handle directory patterns (ending with /)
      if (pattern.endsWith('/')) {
        isDirectory = true
        pattern = pattern.slice(0, -1)
      }

      // Escape special regex characters except for gitignore wildcards
      pattern = pattern
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')

      this.patterns.push({ pattern, isNegation, isDirectory })
    }
  }

  shouldIgnore(relativePath: string): boolean {
    // Remove the base path from the relative path to get the path relative to the gitignore
    const pathFromGitignore = relativePath.startsWith(this.basePath + '/') 
      ? relativePath.substring(this.basePath.length + 1)
      : relativePath.startsWith(this.basePath) && this.basePath !== ''
      ? relativePath.substring(this.basePath.length).replace(/^\//, '')
      : relativePath

    if (!pathFromGitignore || pathFromGitignore === relativePath) {
      return false
    }

    let shouldIgnore = false
    
    for (const { pattern, isNegation, isDirectory } of this.patterns) {
      let matches = false
      
      try {
        const regex = new RegExp(`^${pattern}$`)
        const pathParts = pathFromGitignore.split('/')
        
        if (isDirectory) {
          // For directory patterns, check if any directory in the path matches
          matches = pathParts.some(part => regex.test(part)) ||
                   regex.test(pathFromGitignore)
        } else {
          // For file patterns, check multiple scenarios
          matches = regex.test(pathFromGitignore) || // full path
                   regex.test(pathParts[pathParts.length - 1]) || // filename only
                   pathParts.some((part, index) => {
                     // Check if pattern matches from any directory level
                     const subPath = pathParts.slice(index).join('/')
                     return regex.test(subPath)
                   })
        }
        
        if (matches) {
          shouldIgnore = !isNegation
        }
      } catch (error) {
        console.warn(`Invalid gitignore pattern: ${pattern}`, error)
      }
    }
    
    return shouldIgnore
  }
}

// Global store for gitignore parsers
const gitignoreParsers = new Map<string, GitignoreParser>()

// Function to detect and parse gitignore files
export const processGitignoreFile = (file: File, relativePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (file.name !== '.gitignore') {
      resolve()
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        // Get the directory path of the gitignore file
        const gitignoreDir = relativePath.includes('/') 
          ? relativePath.substring(0, relativePath.lastIndexOf('/'))
          : ''
        const parser = new GitignoreParser(gitignoreDir)
        parser.addRules(content)
        gitignoreParsers.set(gitignoreDir, parser)
        console.log(`Loaded .gitignore rules for directory: ${gitignoreDir || 'root'}`)
      }
      resolve()
    }
    reader.onerror = () => reject(new Error(`Failed to read .gitignore file: ${file.name}`))
    reader.readAsText(file)
  })
}

// Function to check if a path should be ignored by any applicable gitignore
export const isPathIgnoredByGitignore = (path: string): boolean => {
  // Check all gitignore parsers to see if any apply to this path
  for (const gitignoreDir of Array.from(gitignoreParsers.keys())) {
    const parser = gitignoreParsers.get(gitignoreDir)
    if (!parser) continue
    
    // Check if this path is within the scope of this gitignore
    const isInScope = gitignoreDir === '' || // root gitignore applies to all
                     gitignoreDir === '.' || // current directory
                     path.startsWith(gitignoreDir + '/') || // subdirectory
                     path === gitignoreDir // exact match
    
    if (isInScope && parser.shouldIgnore(path)) {
      console.log(`Path ${path} ignored by .gitignore in ${gitignoreDir || 'root'}`)
      return true
    }
  }
  return false
}

// Function to reset gitignore parsers (useful when starting a new upload)
export const resetGitignoreParsers = () => {
  gitignoreParsers.clear()
}

// Track skipped directories and files
export const skippedStats = {
  directoryCounts: new Map<string, number>(),
  imageCount: 0,
  gitignoreCount: 0,
  reset: function() {
    this.directoryCounts.clear();
    this.imageCount = 0;
    this.gitignoreCount = 0;
    resetGitignoreParsers(); // Reset gitignore parsers when resetting stats
  },
  incrementDirectory: function(directoryName: string) {
    const currentCount = this.directoryCounts.get(directoryName) || 0;
    this.directoryCounts.set(directoryName, currentCount + 1);
  },
  incrementImageCount: function() {
    this.imageCount += 1;
  },
  incrementGitignoreCount: function() {
    this.gitignoreCount += 1;
  },
  getDirectoryCounts: function() {
    return this.directoryCounts;
  },
  getImageCount: function() {
    return this.imageCount;
  },
  getGitignoreCount: function() {
    return this.gitignoreCount;
  }
};

export const isPathIgnored = (path: string): boolean => {
  const parts = path.split('/')
  // First check the built-in ignored paths
  const isBuiltInIgnored = parts.some(part => IGNORED_PATHS.has(part))
  
  // Then check gitignore rules
  const isGitignoreIgnored = isPathIgnoredByGitignore(path)
  
  return isBuiltInIgnored || isGitignoreIgnored
}

export const isFileAllowed = (file: File): boolean => {
  // Check file extension
  const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    console.log(`Extension not allowed: ${extension}`)
    return false
  }

  // Check MIME type
  const mimeType = file.type.toLowerCase()
  
  // For Python files, be more lenient with MIME type checks
  if (extension === '.py') {
    // Python files are often detected as text/plain or application/octet-stream
    // or might have specific Python MIME types
    return true
  }
  
  // For XML files, be more lenient with MIME type checks
  if (extension === '.xml') {
    // XML files can have various MIME types depending on the browser
    return true
  }
  
  if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
    // Some text files might have empty MIME type, so we only check if it's present
    if (mimeType !== '') {
      console.log(`MIME type not allowed: ${mimeType} for file ${file.name}`)
      return false
    }
  }

  return true
}

export const processFile = async (file: File, relativePath: string): Promise<FileWithContent> => {
  return new Promise(async (resolve, reject) => {
    if (!isFileAllowed(file)) {
      reject(new Error(`File type not supported: ${file.name}`))
      return
    }

    try {
      const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
      
      // Handle document formats through the API
      if (['.pdf', '.docx', '.pptx'].includes(extension)) {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/extract-text', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error(`Failed to process ${extension} file`)
        }
        
        const data = await response.json()
        
        // Check if content is empty or only whitespace
        if (!data.text || data.text.trim().length === 0) {
          reject(new Error(`File appears to be empty: ${file.name}`))
          return
        }
        
        // Trim whitespace from beginning and end
        const trimmedContent = data.text.trim()
        
        resolve({ path: relativePath, content: trimmedContent })
        return
      }

      // Handle text files as before
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        
        // Check if content is empty or only whitespace
        if (!content || content.trim().length === 0) {
          reject(new Error(`File appears to be empty: ${file.name}`))
          return
        }
        
        // Trim whitespace from beginning and end
        const trimmedContent = content.trim()
        
        resolve({ path: relativePath, content: trimmedContent })
      }
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`))
      reader.readAsText(file)
    } catch (error) {
      reject(error)
    }
  })
}

export const processEntry = async (entry: FileSystemEntry, path: string = ''): Promise<File[]> => {
  return new Promise(async (resolve, reject) => {
    if (!entry) {
      resolve([])
      return
    }

    const fullPath = path ? `${path}/${entry.name}` : entry.name

    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry
      fileEntry.file(async (file) => {
        // First, check if this is a .gitignore file and process it
        if (file.name === '.gitignore') {
          try {
            await processGitignoreFile(file, fullPath)
            console.log(`Processed .gitignore file: ${fullPath}`)
          } catch (error) {
            console.error(`Failed to process .gitignore file: ${fullPath}`, error)
          }
        }

        // Check if the path should be ignored (after processing any .gitignore files)
        if (isPathIgnored(fullPath)) {
          // Determine which directory caused the ignore
          const parts = fullPath.split('/');
          for (const part of parts) {
            if (IGNORED_PATHS.has(part)) {
              skippedStats.incrementDirectory(part);
              break;
            }
          }
          
          // If ignored by gitignore, increment gitignore count
          if (isPathIgnoredByGitignore(fullPath)) {
            skippedStats.incrementGitignoreCount();
          }
          
          console.log(`Skipping ignored path: ${fullPath}`)
          resolve([])
          return
        }

        // Check if it's an allowed file
        if (!isFileAllowed(file)) {
          // Check if it's an image file
          if (file.type.startsWith('image/')) {
            skippedStats.incrementImageCount();
            console.log(`Skipping image file: ${file.name}`);
          }
          resolve([]);
          return;
        }
        
        // Add the path information to the file object
        Object.defineProperty(file, 'webkitRelativePath', {
          value: fullPath
        })
        resolve([file])
      }, reject)
    } else if (entry.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry
      const dirReader = dirEntry.createReader()
      
      const readEntries = (): Promise<File[]> => {
        return new Promise((resolveRead) => {
          dirReader.readEntries(async (entries) => {
            if (entries.length === 0) {
              resolveRead([])
              return
            }
            
            // First pass: process all .gitignore files
            const gitignoreEntries = entries.filter(entry => 
              entry.isFile && entry.name === '.gitignore'
            )
            
            for (const gitignoreEntry of gitignoreEntries) {
              try {
                await processEntry(gitignoreEntry, fullPath)
              } catch (error) {
                console.error(`Failed to process .gitignore entry: ${gitignoreEntry.name}`, error)
              }
            }
            
            // Second pass: process all other files and directories
            const otherEntries = entries.filter(entry => 
              !(entry.isFile && entry.name === '.gitignore')
            )
            
            const files = await Promise.all(
              otherEntries.map(entry => 
                processEntry(entry, fullPath)
              )
            )
            
            const moreFiles = await readEntries()
            resolveRead(files.flat().concat(moreFiles))
          })
        })
      }
      
      // Check if the directory should be ignored
      if (isPathIgnored(fullPath)) {
        // Determine which directory caused the ignore
        const parts = fullPath.split('/');
        for (const part of parts) {
          if (IGNORED_PATHS.has(part)) {
            skippedStats.incrementDirectory(part);
            break;
          }
        }
        
        // If ignored by gitignore, increment gitignore count
        if (isPathIgnoredByGitignore(fullPath)) {
          skippedStats.incrementGitignoreCount();
        }
        
        console.log(`Skipping ignored directory: ${fullPath}`)
        resolve([])
        return
      }
      
      resolve(readEntries())
    }
  })
}

export const generatePromptText = (prompt: string, files: FileWithContent[]): string => {
  let result = '=== USER PROMPT ===\n'
  result += prompt + '\n\n'
  result += '=== FILES ===\n'
  files.forEach(file => {
    result += `*** ${file.path} ***\n${file.content}\n\n`
  })
  return result
} 