import { FileWithContent } from '../fileProcessor'

export function generatePromptText(files: FileWithContent[]): string {
  const parts = files.map(file => `*** ${file.path} ***\n${file.content}\n\n`)
  return '======== FILES ========\n' + parts.join('')
}

export function calculateOutputSize(files: FileWithContent[]): number {
  const HEADER_LEN = '======== FILES ========\n'.length
  let size = HEADER_LEN
  for (const file of files) {
    // *** {path} ***\n{content}\n\n
    size += 4 + file.path.length + 4 + file.content.length + 2
  }
  return size
}
