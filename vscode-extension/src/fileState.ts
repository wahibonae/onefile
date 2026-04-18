import { FileWithContent } from './fileProcessor'

/**
 * Module-level in-memory store for the live file list.
 *
 * workspaceState persists only { path, absolutePath } for cross-restart recovery.
 * Full file content lives here for the duration of the VS Code session.
 */
let _files: FileWithContent[] = []

export function getFiles(): FileWithContent[] {
  return _files
}

export function setFiles(files: FileWithContent[]): void {
  _files = files
}
