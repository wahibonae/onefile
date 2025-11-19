"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  Download,
  Shield,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import Sparkles from "@/components/icons/Sparkles";

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: "Upload Your Files",
      description:
        "Start by uploading files in three different ways. Each method is designed for convenience and flexibility.",
      methods: [
        {
          name: "Drag & Drop Files",
          detail:
            "Simply drag individual files from your computer directly onto the upload area. Supports all common file types.",
        },
        {
          name: "Drag & Drop Folders",
          detail:
            "Drop entire folders to upload all files at once. OneFile automatically traverses subdirectories.",
        },
        {
          name: "Import from GitHub",
          detail:
            "Browse and select files from any public GitHub repository. Perfect for sharing codebases with AI.",
        },
      ],
    },
    {
      number: 2,
      icon: Sparkles,
      title: "Smart Processing",
      description:
        "OneFile intelligently processes your files with advanced filtering and optimization.",
      features: [
        {
          icon: CheckCircle2,
          title: "Text Extraction",
          detail:
            "Extracts text from PDFs, DOCX, XLSX, PPTX, and 50+ file types while preserving structure.",
        },
        {
          icon: CheckCircle2,
          title: ".gitignore Support",
          detail:
            "Automatically respects .gitignore files in your folders, skipping files you don't want to include.",
        },
        {
          icon: CheckCircle2,
          title: "Automatic Filtering",
          detail:
            "Skips images, binaries, node_modules, .git folders, and other unnecessary files automatically.",
        },
        {
          icon: CheckCircle2,
          title: "Structure Preservation",
          detail:
            "Maintains file paths and directory structure so AI understands your project organization.",
        },
      ],
    },
    {
      number: 3,
      icon: Download,
      title: "Copy or Download",
      description:
        "Get your combined file and use it with any AI platform without restrictions.",
      options: [
        {
          name: "Copy to Clipboard",
          detail:
            "One-click copy for instant pasting into ChatGPT, Claude, Gemini, or any AI chat interface.",
        },
        {
          name: "Download as .txt",
          detail:
            "Download as 'onefile-prompt.txt' for later use or to share with others. Works offline.",
        },
        {
          name: "Upload to AI",
          detail:
            "Upload your single combined file to any AI platform. No more file count restrictions!",
        },
      ],
    },
  ];

  const aiPlatforms = [
    {
      name: "ChatGPT",
      limit: "3 files/day (free), 10 files/msg (Plus)",
      works: true,
    },
    { name: "Claude", limit: "5 files per conversation", works: true },
    { name: "Google Gemini", limit: "10 files max", works: true },
    { name: "Grok", limit: "Variable limits", works: true },
    { name: "Any AI Tool", limit: "Upload our one file!", works: true },
  ];

  const whyItWorks = [
    {
      icon: FileText,
      title: "Universal Text Format",
      description:
        "OneFile converts everything into plain text with clear file paths, which all AI models can understand perfectly. No special formatting or proprietary formats.",
    },
    {
      icon: FolderOpen,
      title: "Preserves Context",
      description:
        "File paths and directory structure are maintained, so AI understands how your files relate to each other. Essential for code projects and complex documents.",
    },
    {
      icon: Shield,
      title: "Open Source & Transparent",
      description:
        "Text/Code files stay in your browser. Documents are processed server-side but never stored. All code is public on GitHub, feel free to verify it yourself.",
    },
  ];

  const technicalDetails = [
    {
      category: "Client-Side Processing",
      files: [".txt", ".md", ".json", ".yaml", ".js", ".py", ".css", "etc."],
      description: "Text files are read directly in your browser instantly.",
    },
    {
      category: "Server-Side Processing",
      files: [".pdf", ".docx", ".xlsx", ".pptx"],
      description:
        "Complex documents are sent to our API for text extraction, then returned to you.",
    },
    {
      category: "Filtered Out",
      files: ["images", "binaries", "node_modules", ".git", "dist", "build"],
      description: "Automatically skipped to keep output clean and relevant.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            How It Works
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bypass AI upload limits in three simple steps. No technical
            knowledge required.
          </p>
        </div>

        {/* Main Steps */}
        <div className="space-y-16 mb-16">
          {steps.map((step, index) => (
            <section key={index}>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-primary mb-1">
                    Step {step.number}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              {step.methods && (
                <div className="grid sm:grid-cols-3 gap-4 ml-20">
                  {step.methods.map((method, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-xl p-5"
                    >
                      <h3 className="font-semibold text-foreground mb-2">
                        {method.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {method.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {step.features && (
                <div className="grid sm:grid-cols-2 gap-4 ml-20">
                  {step.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-xl p-5 flex items-start gap-3"
                    >
                      <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step.options && (
                <div className="grid sm:grid-cols-3 gap-4 ml-20">
                  {step.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-xl p-5"
                    >
                      <h3 className="font-semibold text-foreground mb-2">
                        {option.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {option.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Why It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why This Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whyItWorks.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Platform Compatibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Works With All AI Platforms
          </h2>
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="space-y-4">
              {aiPlatforms.map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {platform.limit}
                    </p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Pro Tip:</strong> After combining files with OneFile,
                upload the single .txt file to any AI platform and include your
                prompt. The AI will have full context from all your files!
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Technical Details
          </h2>
          <div className="space-y-4">
            {technicalDetails.map((detail, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-3">
                  {detail.category}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {detail.files.map((file, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-mono"
                    >
                      {file}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Your Privacy is Guaranteed
                </h2>
                <p className="text-muted-foreground mb-4">
                  OneFile is designed with privacy as a core principle.
                  Here&apos;s exactly how we protect your data:
                </p>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    Browser-Based Processing
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Text files (.js, .py, .txt, .md, etc.) are processed
                    entirely in your browser. They never leave your computer.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    Temporary Server Processing
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Complex documents (PDFs, DOCX, XLSX) are sent to our server
                    only for text extraction, then immediately deleted. No
                    storage, no logging.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    No Account Required
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We don&apos;t collect emails, names, or any personal
                    information. Use OneFile anonymously.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    Open Source
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our code is public on GitHub. You can verify exactly how we
                    handle your files, or even host your own version.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What happens if I upload a large folder?
              </h3>
              <p className="text-sm text-muted-foreground">
                OneFile processes files asynchronously, showing a loading
                indicator. Large folders may take a few seconds to process, but
                your browser can typically handle thousands of files without
                issues.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                How does the GitHub import work?
              </h3>
              <p className="text-sm text-muted-foreground">
                Sign in with GitHub, browse any public repository, select the
                files you want, and OneFile imports them directly. No need to
                clone the repo or download files manually.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Can I edit the combined output before using it?
              </h3>
              <p className="text-sm text-muted-foreground">
                The output preview is read-only, but after copying to clipboard
                or downloading, you can edit it in any text editor before
                uploading to your AI platform.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Bypass AI Upload Limits?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop dealing with file restrictions. Start combining unlimited
              files for AI in seconds.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Try OneFile Now - It&apos;s Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
