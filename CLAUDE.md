# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**OneFile** is a free, open-source web application that combines multiple files into a single AI-ready prompt. It solves the common frustration of file upload limits on AI platforms like ChatGPT, Claude, and Gemini by allowing users to upload entire folders, documents, and code projects, then export them as a single formatted text file.

**Architecture**: Next.js 15 standalone application with server-side document processing

## Common Commands

### Development
- `npm run dev` - Start the Next.js development server (localhost:3000)
- `npm install` - Install all dependencies

### Build & Deploy
- `npm run build` - Build the Next.js application for production
- `npm start` - Start production Next.js server
- `npm run preview` - Build and preview Cloudflare deployment
- `npm run deploy` - Build and deploy to Cloudflare Pages

### Code Quality
- `npm run lint` - Run ESLint on the codebase
- `npm run cf-typegen` - Generate TypeScript types for Cloudflare environment

## Technology Stack

### Frontend & Backend
- **Next.js 15** with App Router (Server Components by default)
- **React 19** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI component library
- **Framer Motion** for animations

### Document Processing (Server-Side)
- **pdfjs-serverless** for PDF text extraction
- **mammoth** for DOCX document processing
- **JSZip** for PPTX slide extraction
- **xlsx** for Excel spreadsheet parsing
- **csv-parse** for CSV file parsing

### Deployment
- **Cloudflare Pages** with OpenNext adapter
- **Next.js Edge Runtime** compatible

### Key Features
1. **Universal File Support**: PDFs, Word docs, PowerPoint, Excel, CSV, code files, markdown, and more
2. **Smart Filtering**: Automatically ignores binary files, dependencies (node_modules, .git), and build artifacts
3. **GitIgnore Support**: Respects .gitignore files in uploaded directories
4. **Drag & Drop**: Support for both individual files and entire folder structures
5. **Client-Side Processing**: Text file extraction happens in the browser for speed
6. **Server-Side Document Processing**: Complex formats (PDF, DOCX, PPTX, XLSX) processed via API route

## File Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with theme provider
│   ├── page.tsx               # Main application page
│   ├── about/                 # About page
│   ├── api/
│   │   └── extract-text/      # Server-side document processing API
│   │       └── route.ts       # Handles PDF, DOCX, PPTX, XLSX extraction
│   └── sitemap.ts             # SEO sitemap generation
├── components/
│   ├── FileUpload.tsx         # Drag & drop upload interface
│   ├── FileList.tsx           # Display uploaded files
│   ├── FilePreview.tsx        # Preview individual file content
│   ├── InfoDialog.tsx         # About/info modal
│   ├── theme-provider.tsx     # Dark/light theme support
│   ├── theme-toggle.tsx       # Theme switcher button
│   ├── magicui/
│   │   └── confetti.tsx       # Confetti animation component
│   ├── icons/                 # Social media icons
│   └── ui/                    # shadcn/ui components
├── lib/
│   └── utils.ts               # Utility functions (cn, etc.)
├── utils/
│   └── files.ts               # Core file processing logic
│       ├── processFile()      # Extract content from files
│       ├── processEntry()     # Process FileSystemEntry objects
│       ├── GitignoreParser    # Parse and apply .gitignore rules
│       ├── isPathIgnored()    # Check if path should be filtered
│       └── generatePromptText() # Format files into final output
├── constants/
│   └── files.ts               # File type configurations
│       ├── ALLOWED_EXTENSIONS # Supported file extensions
│       ├── ALLOWED_MIME_TYPES # Supported MIME types
│       └── IGNORED_PATHS      # Directories to skip
└── types/
    └── index.ts               # TypeScript type definitions
```

## Core Functionality

### File Processing Flow

1. **Upload**: User drags/drops files or folders, or uses file/folder picker
2. **Filtering**:
   - Check against `IGNORED_PATHS` (node_modules, .git, dist, etc.)
   - Parse and apply .gitignore rules if present
   - Validate file extensions and MIME types
   - Skip images and binary files
3. **Processing**:
   - **Text files**: Read directly in browser using FileReader
   - **Documents** (PDF/DOCX/PPTX/XLSX): Send to `/api/extract-text` for server-side processing
4. **Output**: Combine all file contents into single formatted text with file paths
5. **Export**: Copy to clipboard or download as `onefile-prompt.txt`

### GitIgnore Support

The application includes a custom `GitignoreParser` class that:
- Automatically detects and parses .gitignore files in uploaded directories
- Applies gitignore patterns with proper wildcard support
- Handles negation patterns (!)
- Tracks skipped files and provides user feedback

### Document Processing API

**Endpoint**: `POST /api/extract-text`

Processes complex document formats server-side:
- **PDF**: Uses pdfjs-serverless to extract text from all pages
- **DOCX**: Uses mammoth to extract raw text
- **PPTX**: Uses JSZip to parse slides and extract text from XML
- **XLSX/XLS**: Uses xlsx library to convert sheets to text with tab-separated values

## Supported File Types

### Code & Web
- JavaScript/TypeScript (.js, .jsx, .ts, .tsx)
- Python (.py), Java (.java), Ruby (.rb), PHP (.php)
- Go (.go), Rust (.rs), C/C++ (.c, .cpp, .h), C# (.cs)
- HTML, CSS, SCSS, JSON, XML, YAML, GraphQL
- Vue, Svelte, Astro, and other frameworks

### Documents
- PDF (.pdf)
- Microsoft Office (.docx, .pptx, .xlsx, .doc, .ppt, .xls)
- OpenDocument (.odt, .odp, .ods)
- Plain text, Markdown (.md), RTF

### Data & Configuration
- CSV, TSV, SQL
- .env, .ini, .conf, .toml
- .gitignore, .dockerignore, .editorconfig

### Academic
- LaTeX (.tex, .bib)
- Bibliography files (.bib, .bibtex)

## Code Standards

### TypeScript & React
- **Server Components by default** - only add `"use client"` when necessary
- **Explicit return types** on all functions (except React component JSX)
- **Never use `any`** - use proper types, `unknown`, or generics
- **Never use `@ts-expect-error`** - fix type issues properly
- Use Next.js `Image` component instead of `<img>` tags
- Escape special characters in JSX using HTML entities (&apos;, &quot;)

### Next.js 15 Specific
- **`params` and `searchParams` are Promises** in Server Components - must await them
- Use React's `use()` hook for Client Components accessing async params
- Wrap `useSearchParams()` in `<Suspense>` boundary

### Styling
- **Never use inline styles** - use Tailwind classes with `cn()` utility
- Use shadcn/ui components: `npx shadcn@latest add <component>`
- Style at source with CVA variants, not at call-site

### Error Handling
- Return structured responses from server actions (never use toast in server code)
- Always provide user feedback for file processing errors
- Log errors to console with context

### Modern Patterns
- Use `navigator.clipboard.writeText()` for clipboard operations
- Use `URL.createObjectURL()` for downloads
- Use `FormData` for file uploads to API routes
- Use `Promise.allSettled()` for batch file processing

## File Upload Edge Cases

### Handled Scenarios
1. **Duplicate files**: Skipped automatically with path comparison
2. **Empty files**: Rejected with user notification
3. **Unsupported formats**: Filtered out with helpful error message
4. **Large folders**: Loading toast shown during processing
5. **Mixed content**: Images and binaries skipped, text files processed
6. **GitIgnore rules**: Applied correctly with directory scoping

### User Feedback
- Success: "Added X file(s)"
- Skip: "Skipped X unsupported file(s), Y images + [directories]"
- Error: "Failed to process X file(s)"
- Empty: "File appears to be empty"
- GitIgnore: Shows count of files skipped by .gitignore rules

## Environment Setup

### Required
- Node.js 18+
- npm or yarn

### Optional (for deployment)
- Cloudflare account for Pages deployment
- Wrangler CLI: `npm install -g wrangler`

## Deployment

### Cloudflare Pages
- Uses `@opennextjs/cloudflare` for Next.js compatibility
- Build command: `npm run deploy`
- Preview: `npm run preview`
- Environment types: `npm run cf-typegen`

### Vercel (Alternative)
Standard Next.js deployment - works out of the box

## Key Principles

1. **Privacy First**: All processing happens client-side or server-side without data persistence
2. **Performance**: Lazy loading, parallel processing, efficient memory usage
3. **User Experience**: Clear feedback, graceful error handling, responsive design
4. **Type Safety**: Strict TypeScript, explicit types, no any
5. **Modern Standards**: Latest React/Next.js patterns, Server Components
6. **Accessibility**: Proper semantic HTML, keyboard navigation, screen reader support

## Special Notes

### Legacy Naming
Previously called "Code To Prompt" - there's a hidden Easter egg sticker in the UI (desktop only) that reveals this history when clicked with confetti animation.

### Cursor Rules Support
The project supports .mdc files (Cursor markdown) as part of the allowed file types, useful for AI coding assistants.

### Version History
- v1.1: Current version with Excel support and .gitignore parsing
- v1.0: Initial release (Code To Prompt)

## Future Roadmap

- [ ] Custom ignore patterns
- [ ] Prompt templates for different use cases
- [ ] Multiple output formats for different AI models
- [ ] API endpoint for programmatic access
- [ ] Batch processing for large file sets
- [ ] Integration with cloud storage services

## Author

**Mohamed Wahib ABKARI**
- GitHub: [@wahibonae](https://github.com/wahibonae)
- Twitter: [@wahibonae](https://twitter.com/wahibonae)
- LinkedIn: [Mohamed Wahib ABKARI](https://www.linkedin.com/in/abkarimohamedwahib/)

## License

MIT License - Free and open source
