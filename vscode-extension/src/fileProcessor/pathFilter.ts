import { ALLOWED_EXTENSIONS, IGNORED_PATHS } from './constants'
import { GitignoreParser } from './gitignoreParser'
import { normalizePath } from './pathUtils'

/**
 * Returns true if the given normalized path should be skipped based on
 * built-in ignored directories or active gitignore parsers.
 */
export function isPathIgnored(
  normalizedPath: string,
  gitignoreParsers: Map<string, GitignoreParser>
): boolean {
  const parts = normalizedPath.split('/')

  // Check built-in ignored paths (node_modules, .git, dist, etc.)
  if (parts.some(part => IGNORED_PATHS.has(part))) {
    return true
  }

  // Check all loaded gitignore parsers
  for (const [gitignoreDir, parser] of gitignoreParsers) {
    const isInScope =
      gitignoreDir === '' ||
      gitignoreDir === '.' ||
      normalizedPath.startsWith(gitignoreDir + '/') ||
      normalizedPath === gitignoreDir

    if (isInScope && parser.shouldIgnore(normalizedPath)) {
      return true
    }
  }

  return false
}

/**
 * Returns true if the file extension is in the allowed extensions set.
 * MIME type checks are intentionally omitted — extension-based filtering
 * is sufficient in Node.js.
 */
export function isExtensionAllowed(filePath: string): boolean {
  const normalized = normalizePath(filePath)
  const lastDot = normalized.lastIndexOf('.')
  if (lastDot === -1) {
    return false
  }
  const ext = normalized.substring(lastDot).toLowerCase()
  return ALLOWED_EXTENSIONS.has(ext)
}
