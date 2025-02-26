export const ALLOWED_EXTENSIONS = new Set([
  // Programming languages
  '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.rb', '.php', '.go', '.rs', '.c', '.cpp', '.h', '.cs', 
  '.swift', '.kt', '.scala', '.m', '.mm', '.r', '.pl', '.sh', '.bash', '.zsh', '.fish',
  // Web technologies
  '.html', '.htm', '.css', '.scss', '.sass', '.less', '.json', '.xml', '.yaml', '.yml', '.graphql', '.gql',
  // Configuration files
  '.env', '.ini', '.conf', '.config', '.toml', '.properties',
  // Documentation and text files
  '.md', '.markdown', '.txt', '.rtf', '.tex',
  // Other text-based files
  '.sql', '.prisma', '.csv', '.tsv', '.log',
  // Additional development files
  '.vue', '.svelte', '.astro', '.razor', '.jsp', '.asp', '.aspx',
  '.pug', '.jade', '.haml', '.ejs', '.hbs', '.mustache',
  '.gradle', '.maven', '.pom', '.sbt', '.rake',
  '.gitignore', '.dockerignore', '.editorconfig',
  // Shell and script files
  '.ps1', '.psm1', '.bat', '.cmd', '.vbs', '.awk', '.sed',
  // Document formats
  '.pdf', '.docx', '.doc', '.pptx', '.txt', '.rtf',
])

export const ALLOWED_MIME_TYPES = new Set([
  // Basic text types
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'text/markdown',
  'text/x-markdown',
  // Programming languages
  'text/x-python',
  'text/x-python-script',
  'application/x-python',
  'application/x-python-code',
  'application/python',
  'application/x-python-script',
  'application/octet-stream',
  'text/x-java',
  'text/x-ruby',
  'text/x-php',
  'text/x-go',
  'text/x-rust',
  'text/x-c',
  'text/x-c++',
  'text/x-swift',
  'text/x-kotlin',
  'text/x-scala',
  'text/x-r',
  'text/x-perl',
  'text/x-sh',
  // Data formats
  'text/csv',
  'text/tab-separated-values',
  // Application types
  'application/json',
  'application/javascript',
  'application/x-javascript',
  'application/ecmascript',
  'application/x-httpd-php',
  'application/x-yaml',
  'application/xml',
  'application/graphql',
  'application/x-sh',
  'application/x-shellscript',
  // Additional types
  'application/x-tex',
  'application/x-latex',
  'text/x-vue',
  'text/x-typescript',
  'text/x-handlebars-template',
  'text/x-jsp',
  'text/x-asp',
  'text/x-script.python',
  'text/x-script.ruby',
  'text/x-script.perl',
  // Document formats
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/rtf',
  'application/rtf'
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