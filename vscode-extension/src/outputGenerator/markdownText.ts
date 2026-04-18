import { FileWithContent } from '../fileProcessor'

const EXTENSION_TO_LANG: Record<string, string> = {
  '.js': 'javascript', '.jsx': 'jsx', '.ts': 'typescript', '.tsx': 'tsx',
  '.py': 'python', '.java': 'java', '.rb': 'ruby', '.php': 'php',
  '.go': 'go', '.rs': 'rust', '.c': 'c', '.cpp': 'cpp', '.h': 'c',
  '.cs': 'csharp', '.swift': 'swift', '.kt': 'kotlin', '.kts': 'kotlin',
  '.scala': 'scala', '.groovy': 'groovy', '.dart': 'dart', '.lua': 'lua',
  '.ex': 'elixir', '.exs': 'elixir', '.r': 'r', '.pl': 'perl',
  '.sh': 'bash', '.bash': 'bash', '.zsh': 'zsh', '.fish': 'fish',
  '.html': 'html', '.htm': 'html', '.css': 'css', '.scss': 'scss',
  '.sass': 'sass', '.less': 'less', '.json': 'json', '.xml': 'xml',
  '.yaml': 'yaml', '.yml': 'yaml', '.graphql': 'graphql', '.gql': 'graphql',
  '.sql': 'sql', '.md': 'markdown', '.markdown': 'markdown',
  '.tex': 'latex', '.bib': 'bibtex', '.bibtex': 'bibtex',
  '.toml': 'toml', '.ini': 'ini', '.tf': 'hcl', '.tfvars': 'hcl',
  '.hcl': 'hcl', '.proto': 'protobuf', '.prisma': 'prisma',
  '.vue': 'vue', '.svelte': 'svelte', '.astro': 'astro',
  '.dockerfile': 'dockerfile', '.ps1': 'powershell', '.psm1': 'powershell',
  '.bat': 'batch', '.cmd': 'batch', '.csv': 'csv', '.tsv': 'tsv',
  '.env': 'dotenv', '.gitignore': 'gitignore', '.dockerignore': 'dockerignore',
}

function getLang(filePath: string): string {
  const ext = '.' + filePath.split('.').pop()?.toLowerCase()
  return EXTENSION_TO_LANG[ext] || ''
}

export function generateMarkdownText(files: FileWithContent[]): string {
  const parts = files.map(file => {
    const lang = getLang(file.path)
    return `## ${file.path}\n\n\`\`\`${lang}\n${file.content}\n\`\`\`\n`
  })
  return '# Files\n\n' + parts.join('\n')
}
