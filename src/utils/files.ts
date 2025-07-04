import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, IGNORED_PATHS } from '@/constants/files'
import { FileWithContent } from '@/types'

// Track skipped directories and files
export const skippedStats = {
  directoryCounts: new Map<string, number>(),
  imageCount: 0,
  reset: function() {
    this.directoryCounts.clear();
    this.imageCount = 0;
  },
  incrementDirectory: function(directoryName: string) {
    const currentCount = this.directoryCounts.get(directoryName) || 0;
    this.directoryCounts.set(directoryName, currentCount + 1);
  },
  incrementImageCount: function() {
    this.imageCount += 1;
  },
  getDirectoryCounts: function() {
    return this.directoryCounts;
  },
  getImageCount: function() {
    return this.imageCount;
  }
};

export const isPathIgnored = (path: string): boolean => {
  const parts = path.split('/')
  return parts.some(part => IGNORED_PATHS.has(part))
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
  return new Promise((resolve, reject) => {
    if (!entry) {
      resolve([])
      return
    }

    // Check if the path should be ignored
    const fullPath = path ? `${path}/${entry.name}` : entry.name
    if (isPathIgnored(fullPath)) {
      // Determine which directory caused the ignore
      const parts = fullPath.split('/');
      for (const part of parts) {
        if (IGNORED_PATHS.has(part)) {
          skippedStats.incrementDirectory(part);
          break;
        }
      }
      
      console.log(`Skipping ignored path: ${fullPath}`)
      resolve([])
      return
    }

    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry
      fileEntry.file(file => {
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
            
            const files = await Promise.all(
              entries.map(entry => 
                processEntry(entry, fullPath)
              )
            )
            
            const moreFiles = await readEntries()
            resolveRead(files.flat().concat(moreFiles))
          })
        })
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