import { ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES, IGNORED_PATHS } from '@/constants/files'
import { FileWithContent } from '@/types'
import toast from 'react-hot-toast'

export const isPathIgnored = (path: string): boolean => {
  const parts = path.split('/')
  return parts.some(part => IGNORED_PATHS.has(part))
}

export const isFileAllowed = (file: File): boolean => {
  // Check file extension
  const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return false
  }

  // Check MIME type
  const mimeType = file.type.toLowerCase()
  if (mimeType && !ALLOWED_MIME_TYPES.has(mimeType)) {
    // Some text files might have empty MIME type, so we only check if it's present
    if (mimeType !== '') {
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
        resolve({ path: relativePath, content: data.text })
        return
      }

      // Handle text files as before
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        resolve({ path: relativePath, content })
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
      resolve([])
      return
    }

    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry
      fileEntry.file(file => {
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