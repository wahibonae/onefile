"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Code,
  Table,
  FileCode,
  Settings,
  CheckCircle2,
  X,
} from "lucide-react";

interface FileType {
  extensions: string[];
  processing: "Browser" | "Server" | "Mixed";
  chatgpt: boolean;
  claude: boolean;
  gemini: boolean;
  notes?: string;
}

export default function SupportedFilesPage() {
  const fileCategories: {
    [key: string]: {
      icon: React.ElementType;
      types: { [key: string]: FileType };
    };
  } = {
    Documents: {
      icon: FileText,
      types: {
        PDF: {
          extensions: [".pdf"],
          processing: "Server",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "Processed server-side for text extraction",
        },
        "Microsoft Word": {
          extensions: [".docx", ".doc"],
          processing: "Server",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        "Microsoft Excel": {
          extensions: [".xlsx", ".xls", ".csv"],
          processing: "Mixed",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "CSV processed in browser, Excel on server",
        },
        "Microsoft PowerPoint": {
          extensions: [".pptx", ".ppt"],
          processing: "Server",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        OpenDocument: {
          extensions: [".odt", ".ods", ".odp"],
          processing: "Server",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        "Plain Text": {
          extensions: [".txt"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "Fastest processing",
        },
        Markdown: {
          extensions: [".md", ".markdown", ".mdc"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "Perfect for documentation",
        },
        "Rich Text": {
          extensions: [".rtf"],
          processing: "Server",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
      },
    },
    "Code Files": {
      icon: Code,
      types: {
        JavaScript: {
          extensions: [".js", ".jsx", ".mjs", ".cjs"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        TypeScript: {
          extensions: [".ts", ".tsx"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Python: {
          extensions: [".py", ".pyw", ".pyx"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Java: {
          extensions: [".java", ".class", ".jar"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: ".jar files are skipped (binary)",
        },
        "C/C++": {
          extensions: [".c", ".cpp", ".cc", ".h", ".hpp"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        "C#": {
          extensions: [".cs", ".csx"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Go: {
          extensions: [".go"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Rust: {
          extensions: [".rs"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Ruby: {
          extensions: [".rb", ".rake"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        PHP: {
          extensions: [".php", ".phtml"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Swift: {
          extensions: [".swift"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Kotlin: {
          extensions: [".kt", ".kts"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
      },
    },
    "Web Development": {
      icon: FileCode,
      types: {
        HTML: {
          extensions: [".html", ".htm"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        CSS: {
          extensions: [".css", ".scss", ".sass", ".less"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Vue: {
          extensions: [".vue"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Svelte: {
          extensions: [".svelte"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Astro: {
          extensions: [".astro"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        "JSX/TSX": {
          extensions: [".jsx", ".tsx"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "React components",
        },
      },
    },
    "Data & Config": {
      icon: Settings,
      types: {
        JSON: {
          extensions: [".json", ".jsonc"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        YAML: {
          extensions: [".yaml", ".yml"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        XML: {
          extensions: [".xml"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        TOML: {
          extensions: [".toml"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        INI: {
          extensions: [".ini", ".cfg", ".conf"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        ENV: {
          extensions: [".env", ".env.example", ".env.local"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "Be careful with secrets!",
        },
        "CSV/TSV": {
          extensions: [".csv", ".tsv"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        SQL: {
          extensions: [".sql"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
      },
    },
    Other: {
      icon: Table,
      types: {
        "Shell Scripts": {
          extensions: [".sh", ".bash", ".zsh", ".fish"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Docker: {
          extensions: ["Dockerfile", ".dockerignore"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        Git: {
          extensions: [".gitignore", ".gitattributes"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: ".gitignore rules are applied",
        },
        GraphQL: {
          extensions: [".graphql", ".gql"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        LaTeX: {
          extensions: [".tex", ".bib", ".bibtex"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
        "Jupyter Notebooks": {
          extensions: [".ipynb"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
          notes: "JSON-based, works great",
        },
        "Protocol Buffers": {
          extensions: [".proto"],
          processing: "Browser",
          chatgpt: true,
          claude: true,
          gemini: true,
        },
      },
    },
  };

  const excludedFiles = [
    "Images (.jpg, .png, .gif, .svg, .webp, etc.)",
    "Videos (.mp4, .mov, .avi, etc.)",
    "Audio (.mp3, .wav, .ogg, etc.)",
    "Compressed (.zip, .rar, .tar, .gz)",
    "Binaries (.exe, .dll, .so, .dylib)",
    "Databases (.db, .sqlite)",
    "node_modules/ directory",
    ".git/ directory",
    "dist/, build/, out/ directories",
    ".DS_Store, Thumbs.db (system files)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Supported File Types
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            OneFile supports 50+ file types across documents, code, data, and
            configuration files. All compatible with ChatGPT, Claude, Gemini,
            and other AI platforms.
          </p>
        </div>

        {/* Legend */}
        <div className="mb-12 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Processing Methods
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Browser
              </div>
              <span className="text-sm text-muted-foreground">
                Instant, client-side
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Server
              </div>
              <span className="text-sm text-muted-foreground">
                Text extraction
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Mixed
              </div>
              <span className="text-sm text-muted-foreground">
                Depends on file
              </span>
            </div>
          </div>
        </div>

        {/* File Categories */}
        <div className="space-y-12 mb-16">
          {Object.entries(fileCategories).map(([categoryName, category]) => (
            <section key={categoryName}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {categoryName}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(category.types).map(([typeName, type]) => (
                  <div
                    key={typeName}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-semibold text-foreground">
                        {typeName}
                      </h3>
                      <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium whitespace-nowrap">
                        {type.processing}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {type.extensions.map((ext, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-mono"
                        >
                          {ext}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span title="ChatGPT">
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              type.chatgpt ? "text-primary" : "text-gray-400"
                            }`}
                          />
                        </span>
                        <span title="Claude">
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              type.claude ? "text-primary" : "text-gray-400"
                            }`}
                          />
                        </span>
                        <span title="Gemini">
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              type.gemini ? "text-primary" : "text-gray-400"
                            }`}
                          />
                        </span>
                      </div>
                      {type.notes && (
                        <p className="text-xs text-muted-foreground italic">
                          {type.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Excluded Files */}
        <section className="mb-16">
          <div className="mb-6 space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Automatically Excluded
            </h2>
            <p className="text-muted-foreground">
              These file types and directories are automatically skipped to keep
              your output clean and relevant:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {excludedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3"
              >
                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-500">{file}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AI Platform Compatibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">
            AI Platform Compatibility
          </h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
                <p className="text-muted-foreground">Compatible with ChatGPT</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
                <p className="text-muted-foreground">Compatible with Claude</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
                <p className="text-muted-foreground">Compatible with Gemini</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              All supported file types work with every AI platform that accepts
              text file uploads.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            File Type Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Can you add support for [file type]?
              </h3>
              <p className="text-sm text-muted-foreground">
                We&apos;re constantly adding support for new file types. If your
                format isn&apos;t listed, please open an issue on our GitHub
                repository with details about the file type and your use case.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Why are PDFs processed on the server?
              </h3>
              <p className="text-sm text-muted-foreground">
                PDF text extraction requires specialized libraries that are too
                large to run in browsers efficiently. We use server-side
                processing for PDFs, DOCX, XLSX, and PPTX to maintain fast
                performance while ensuring accurate text extraction.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What if my file type isn&apos;t supported?
              </h3>
              <p className="text-sm text-muted-foreground">
                If it&apos;s a text-based file (can be opened in a text editor),
                you can rename it to .txt and upload it. For binary formats not
                yet supported, please request support on GitHub or use a
                conversion tool first.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Combine Your Files?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              With support for 50+ file types, OneFile handles everything you
              need to work with AI.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Start Combining Files Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
