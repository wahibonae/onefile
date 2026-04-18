export const ALLOWED_EXTENSIONS = new Set([
  // Programming languages
  '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.rb', '.php', '.go', '.rs', '.c', '.cpp', '.h', '.cs',
  '.swift', '.kt', '.kts', '.scala', '.groovy', '.dart', '.lua', '.ex', '.exs', '.m', '.mm', '.r', '.pl', '.sh', '.bash', '.zsh', '.fish',
  // Web technologies
  '.html', '.htm', '.css', '.scss', '.sass', '.less', '.json', '.xml', '.yaml', '.yml', '.graphql', '.gql',
  // Configuration files
  '.env', '.ini', '.conf', '.config', '.toml', '.properties', '.tf', '.tfvars', '.hcl', '.proto',
  // Documentation and text files
  '.md', '.markdown', '.mdc', '.txt', '.rtf', '.tex',
  // Data files
  '.sql', '.prisma', '.csv', '.tsv', '.log', '.xlsx', '.xls',
  // Additional development files
  '.vue', '.svelte', '.astro', '.razor', '.jsp', '.asp', '.aspx',
  '.pug', '.jade', '.haml', '.ejs', '.hbs', '.mustache',
  '.gradle', '.maven', '.pom', '.sbt', '.rake',
  '.gitignore', '.dockerignore', '.editorconfig',
  // Shell and script files
  '.ps1', '.psm1', '.bat', '.cmd', '.vbs', '.awk', '.sed',
  // Document formats
  '.pdf', '.docx', '.pptx', '.txt', '.rtf',
  // Academic and research files
  '.bib', '.bibtex', '.cls', '.sty', '.aux', '.bbl', '.blg',
  // Data and configuration
  '.dat', '.data', '.cfg', '.conf', '.settings', '.prefs',
  // Email formats
  '.eml', '.msg', '.mbox'
])

export const IGNORED_PATHS = new Set([
  // Dependencies
  'node_modules',
  'venv',
  '.venv',
  'env',
  '.env',
  'vendor',
  'bower_components',
  // Build directories
  'dist',
  'build',
  '.next',
  'out',
  // Cache directories
  '.cache',
  '__pycache__',
  '.pytest_cache',
  '.eslintcache',
  // Version control
  '.git',
  '.svn',
  '.hg',
  // IDE and editor files
  '.idea',
  '.vscode',
  '.vs'
])

export const DOCUMENT_EXTENSIONS = new Set([
  '.pdf', '.docx', '.pptx', '.xlsx', '.xls'
])
