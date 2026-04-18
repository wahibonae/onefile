import * as vscode from 'vscode'
import { promises as fs } from 'fs'
import * as path from 'path'
import { GitignoreParser } from './gitignoreParser'
import { isPathIgnored, isExtensionAllowed } from './pathFilter'
import { normalizePath } from './pathUtils'
import { DOCUMENT_EXTENSIONS } from './constants'
import { readTextFile } from './textReader'
import { extractDocument } from './documentExtractor'

export interface FileWithContent {
  path: string        // normalized relative path for display / output
  content: string
  absolutePath: string  // kept for workspaceState re-read on restore
}

/**
 * Find the common ancestor directory of a list of URIs.
 * For a single directory URI, returns that directory itself.
 * For a single file URI, returns its parent directory.
 */
function findCommonRoot(uris: vscode.Uri[]): string {
  if (uris.length === 1) {
    const fsPath = uris[0].fsPath
    // Stat synchronously is safe here since we're about to process it anyway
    try {
      const stat = require('fs').statSync(fsPath)
      return stat.isDirectory() ? fsPath : path.dirname(fsPath)
    } catch {
      return path.dirname(fsPath)
    }
  }

  const sep = path.sep
  const parts = uris[0].fsPath.split(sep)
  for (let i = parts.length; i > 0; i--) {
    const candidate = parts.slice(0, i).join(sep)
    if (uris.every(u => u.fsPath.startsWith(candidate))) {
      return candidate
    }
  }
  return path.dirname(uris[0].fsPath)
}

/**
 * Compute the relative display path from rootPath to absPath.
 * Falls back to "parentDir/filename" if the path escapes the root
 * (happens in multi-root workspaces).
 */
function getRelativePath(absPath: string, rootPath: string): string {
  const rel = normalizePath(path.relative(rootPath, absPath))
  if (rel.startsWith('..')) {
    // Multi-root workspace: fall back to last two segments
    const parts = normalizePath(absPath).split('/')
    return parts.slice(-2).join('/')
  }
  return rel
}

/**
 * Walk a directory tree, collecting FileWithContent entries.
 * Two-pass per directory: .gitignore files are parsed first, then
 * all other entries are processed.
 */
async function walkDirectory(
  dirPath: string,
  rootPath: string,
  gitignoreParsers: Map<string, GitignoreParser>,
  results: FileWithContent[]
): Promise<void> {
  const relDir = normalizePath(path.relative(rootPath, dirPath))

  // Guard: skip if this directory itself is ignored
  if (relDir && isPathIgnored(relDir, gitignoreParsers)) {
    return
  }

  let entries: import('fs').Dirent[]
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true })
  } catch {
    return // unreadable directory — skip silently
  }

  // Pass 1: load .gitignore for this directory
  for (const entry of entries) {
    if (entry.isFile() && entry.name === '.gitignore') {
      const absGitignore = path.join(dirPath, '.gitignore')
      try {
        const content = await fs.readFile(absGitignore, 'utf-8')
        const gitignoreRelDir = normalizePath(path.relative(rootPath, dirPath))
        const parser = new GitignoreParser(gitignoreRelDir)
        parser.addRules(content)
        gitignoreParsers.set(gitignoreRelDir, parser)
      } catch {
        // Unreadable .gitignore — skip
      }
    }
  }

  // Pass 2: process all other entries
  for (const entry of entries) {
    if (entry.isFile() && entry.name === '.gitignore') {
      continue // already handled above
    }

    const absPath = path.join(dirPath, entry.name)
    const relPath = getRelativePath(absPath, rootPath)

    if (isPathIgnored(relPath, gitignoreParsers)) {
      continue
    }

    if (entry.isDirectory()) {
      await walkDirectory(absPath, rootPath, gitignoreParsers, results)
    } else if (entry.isFile()) {
      if (!isExtensionAllowed(entry.name)) {
        continue
      }

      const ext = normalizePath(entry.name).split('.').pop()
        ? '.' + entry.name.split('.').pop()!.toLowerCase()
        : ''

      try {
        let content: string
        if (DOCUMENT_EXTENSIONS.has(ext)) {
          content = await extractDocument(absPath)
        } else {
          content = await readTextFile(absPath)
        }
        results.push({ path: relPath, content, absolutePath: absPath })
      } catch {
        // Skip files that can't be read (binary, empty, etc.)
      }
    }
  }
}

/**
 * Process an array of VS Code URIs (files or folders) into FileWithContent entries.
 * This is the main entry point called by the addToOneFile command.
 */
export async function processUris(uris: vscode.Uri[]): Promise<FileWithContent[]> {
  const rootPath = findCommonRoot(uris)
  const gitignoreParsers = new Map<string, GitignoreParser>()
  const results: FileWithContent[] = []

  for (const uri of uris) {
    const fsPath = uri.fsPath

    let stat: import('fs').Stats
    try {
      stat = await fs.stat(fsPath)
    } catch {
      continue // URI no longer exists
    }

    if (stat.isDirectory()) {
      await walkDirectory(fsPath, rootPath, gitignoreParsers, results)
    } else if (stat.isFile()) {
      if (!isExtensionAllowed(path.basename(fsPath))) {
        continue
      }

      const relPath = getRelativePath(fsPath, rootPath)
      const ext = '.' + path.basename(fsPath).split('.').pop()!.toLowerCase()

      try {
        let content: string
        if (DOCUMENT_EXTENSIONS.has(ext)) {
          content = await extractDocument(fsPath)
        } else {
          content = await readTextFile(fsPath)
        }
        results.push({ path: relPath, content, absolutePath: fsPath })
      } catch {
        // Skip unreadable or empty files
      }
    }
  }

  return results
}
