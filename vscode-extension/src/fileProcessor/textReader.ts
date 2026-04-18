import { promises as fs } from 'fs'

/**
 * Read a text file from disk and return its contents as a string.
 * Throws if the file is empty or unreadable.
 */
export async function readTextFile(absolutePath: string): Promise<string> {
  const content = await fs.readFile(absolutePath, 'utf-8')
  if (!content || content.trim().length === 0) {
    throw new Error(`File appears to be empty: ${absolutePath}`)
  }
  return content
}
