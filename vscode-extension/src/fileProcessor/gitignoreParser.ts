export class GitignoreParser {
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
