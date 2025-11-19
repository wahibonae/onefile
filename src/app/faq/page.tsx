"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs: FAQItem[] = [
    // Getting Started
    {
      category: "Getting Started",
      question: "What is OneFile?",
      answer:
        "OneFile is a free, open-source web application that combines multiple files into a single AI-ready text file. It solves the problem of file upload limits on AI platforms like ChatGPT, Claude, and Gemini by merging unlimited files into one.",
    },
    {
      category: "Getting Started",
      question: "How many files can I combine with OneFile?",
      answer:
        "There's no limit! You can combine 10, 100, or even 1,000+ files into one. The only constraint is your browser's memory, which can typically handle thousands of files without issues. We've tested with projects containing over 500 files successfully.",
    },
    {
      category: "Getting Started",
      question: "Do I need to create an account to use OneFile?",
      answer:
        "No account required! OneFile works completely anonymously. You only need to sign in with GitHub if you want to use the GitHub repository import feature. All other features work without any sign-up.",
    },
    {
      category: "Getting Started",
      question: "Is OneFile really free?",
      answer:
        "Yes, completely free with no hidden costs, no usage limits, and no premium tiers. OneFile is open-source software released under the MIT license. You can use it as much as you want, and even host your own version if desired.",
    },

    // AI Platforms
    {
      category: "AI Platforms",
      question: "Does this work with ChatGPT's free plan?",
      answer:
        "Yes! ChatGPT free users are limited to uploading 3 files per day. With OneFile, you can merge unlimited files into one text file and upload that single file to ChatGPT, completely bypassing the 3-file restriction. Even ChatGPT Plus users benefit by avoiding the frustration of uploading files in batches of 10 for large projects.",
    },
    {
      category: "AI Platforms",
      question: "Which AI platforms does OneFile work with?",
      answer:
        "OneFile works with all AI platforms that accept text file uploads, including ChatGPT (free and Plus), Claude (Sonnet and Opus), Google Gemini, Grok, Perplexity, and any other AI assistant. Since it outputs plain text, it's universally compatible.",
    },
    {
      category: "AI Platforms",
      question:
        "What's the difference between uploading to ChatGPT vs Claude?",
      answer:
        "Both platforms work identically with OneFile's output. ChatGPT free limits you to 3 files per day, ChatGPT Plus to 10 files per message. Claude limits vary by plan. With OneFile, you bypass all these restrictions by uploading one combined file to either platform.",
    },
    {
      category: "AI Platforms",
      question: "Can I use the output with GPT-4 or Claude Opus?",
      answer:
        "Absolutely! The combined text file works with all AI model versions - GPT-3.5, GPT-4, GPT-4 Turbo, Claude Sonnet, Claude Opus, Gemini Pro, and any other LLM. The format is universal plain text.",
    },

    // File Types & Uploads
    {
      category: "File Types & Uploads",
      question: "What file types are supported?",
      answer:
        "OneFile supports 50+ file types including: PDFs (.pdf), Microsoft Office files (.docx, .xlsx, .pptx, .doc, .xls, .ppt), code files (.js, .py, .java, .cpp, .tsx, .jsx, .go, .rs, .rb, etc.), text files (.txt, .md, .csv, .tsv), configuration files (.json, .yaml, .yml, .xml, .toml, .ini, .env), web files (.html, .css, .scss), and many more. Images and binary files are automatically filtered out.",
    },
    {
      category: "File Types & Uploads",
      question: "Can I upload an entire GitHub repository?",
      answer:
        "Yes! Use our GitHub import feature to browse and select files from any public repository. You can also download a repo as a ZIP file, extract it locally, and upload the entire folder by dragging it into OneFile. We automatically respect .gitignore files and skip node_modules, .git, and other unnecessary directories.",
    },
    {
      category: "File Types & Uploads",
      question: "What happens to image files?",
      answer:
        "Image files (.jpg, .png, .gif, .svg, etc.) are automatically skipped and not included in the output. This is intentional - AI text models can't process images through text uploads, and including them would just add unnecessary content. You'll see a notification showing how many images were skipped.",
    },
    {
      category: "File Types & Uploads",
      question: "How does OneFile handle large files?",
      answer:
        "Simple text files are processed instantly in your browser. Complex documents like PDFs, DOCX, and XLSX are processed server-side via an API route. Files are handled in-memory during the request and never persisted, which takes a few seconds. The combined output is optimized for AI context windows, typically staying under 1-2MB for easy uploading.",
    },
    {
      category: "File Types & Uploads",
      question: "Can I upload files from Dropbox or Google Drive?",
      answer:
        "Not directly, but you can download files from Dropbox or Google Drive to your computer first, then upload them to OneFile. We may add direct cloud storage integration in the future based on user demand.",
    },

    // Privacy & Security
    {
      category: "Privacy & Security",
      question: "Is my data private and secure?",
      answer:
        "Absolutely. All text file processing happens locally in your web browser using JavaScript. Your files never touch our servers or get uploaded to the internet for these file types. Complex documents (PDFs, DOCX, XLSX, PPTX) are processed server-side for text extraction. They're handled in-memory during the request and never stored or persisted. We don't log, store, or analyze your files.",
    },
    {
      category: "Privacy & Security",
      question: "Can you see my files?",
      answer:
        "No. For text files, processing is 100% browser-based - we literally cannot see them because they never reach our servers. For PDFs and Office documents, they're processed via our server-side API for text extraction. They're handled in-memory and never stored. We don't log file names, contents, or any metadata.",
    },
    {
      category: "Privacy & Security",
      question: "Is the code open source?",
      answer:
        "Yes! OneFile is fully open source under the MIT license. You can view all the code on GitHub (github.com/wahibonae/onefile), verify exactly how we handle files, report bugs, contribute improvements, or even host your own private version.",
    },
    {
      category: "Privacy & Security",
      question: "Do you store uploaded files?",
      answer:
        "No, never. Text files are processed entirely in your browser and never sent to us. Documents sent for text extraction are processed in-memory during the API request and automatically discarded when processing completes - they're never written to disk or stored in any database.",
    },

    // Technical Questions
    {
      category: "Technical Questions",
      question: "What is .gitignore support?",
      answer:
        "If your uploaded folder contains a .gitignore file, OneFile automatically reads it and excludes any files matching those patterns. This is incredibly useful for developers - when you upload a code project, we'll automatically skip node_modules, .env files, build artifacts, and anything else in your .gitignore.",
    },
    {
      category: "Technical Questions",
      question: "Does OneFile work on mobile devices?",
      answer:
        "Yes! OneFile is fully responsive and works on smartphones and tablets (iOS and Android). However, for the best experience with large folder uploads (especially drag-and-drop), we recommend using a desktop or laptop browser. Mobile file selection may be limited by your device's operating system.",
    },
    {
      category: "Technical Questions",
      question: "What browsers are supported?",
      answer:
        "OneFile works on all modern browsers including Chrome, Firefox, Safari, Edge, and Brave. We recommend using the latest version of any major browser for the best experience. Internet Explorer is not supported.",
    },
    {
      category: "Technical Questions",
      question: "Can I edit the combined output before downloading?",
      answer:
        "The preview area is read-only to ensure accuracy, but after copying to clipboard or downloading the file, you can edit it in any text editor (Notepad, VS Code, etc.) before uploading to your AI platform.",
    },

    // Troubleshooting
    {
      category: "Troubleshooting",
      question: "Why are some of my files being skipped?",
      answer:
        "Files are skipped for several reasons: 1) They're in your .gitignore file, 2) They're in ignored directories (node_modules, .git, dist, build, etc.), 3) They're unsupported file types (images, videos, binaries), 4) They're empty, or 5) They failed to process. Check the toast notifications for details on what was skipped and why.",
    },
    {
      category: "Troubleshooting",
      question: "The upload is taking a long time. Is something wrong?",
      answer:
        "Large folders with thousands of files or large PDFs can take 10-30 seconds to process. You'll see a loading indicator while processing. If it's stuck for more than a minute, try refreshing and uploading fewer files at once. Complex documents (PDFs, XLSX) take longer because they require server-side processing.",
    },
    {
      category: "Troubleshooting",
      question: "I got an error while uploading. What should I do?",
      answer:
        "Common solutions: 1) Check your internet connection (needed for PDF/DOCX processing), 2) Try uploading fewer files at once, 3) Remove any corrupted files, 4) Refresh the page and try again, 5) Check if specific file types are causing issues. If problems persist, please open an issue on our GitHub repository with details.",
    },
    {
      category: "Troubleshooting",
      question: "Can I combine files that are already combined?",
      answer:
        "Yes, but it's not recommended. You can upload a previously generated OneFile output and combine it with new files, but you'll end up with duplicate file path markers. It's better to re-upload all original files together for a clean output.",
    },

    // Use Cases
    {
      category: "Use Cases",
      question: "How do students use OneFile?",
      answer:
        "Students use OneFile to combine research papers, course materials, lecture notes, and assignments into one file for analysis by AI. This is especially helpful for thesis research, essay writing with multiple sources, or studying with AI tutors. Upload all your materials once and ask questions about any part of them.",
    },
    {
      category: "Use Cases",
      question: "How do developers use OneFile?",
      answer:
        "Developers use OneFile to share entire codebases with AI for code review, debugging help, or documentation generation. Instead of copying and pasting individual files, upload your whole project folder (respecting .gitignore) and get AI assistance on the full codebase context.",
    },
    {
      category: "Use Cases",
      question: "Can I use this for professional/business documents?",
      answer:
        "Yes! Professionals use OneFile to combine meeting notes, reports, spreadsheets, presentations, and documentation for AI analysis. Perfect for preparing board meeting materials, quarterly reports, or project documentation. Remember that your data stays private.",
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to know about OneFile and bypassing AI upload
            limits.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        {categories.map((category) => {
          const categoryFAQs = filteredFAQs.filter(
            (faq) => faq.category === category
          );

          if (categoryFAQs.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                {category}
              </h2>
              <div className="space-y-4">
                {categoryFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* No Results */}
        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No FAQs found matching &quot;{searchQuery}&quot;
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Have Questions */}
        <section className="mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Check out our other
              resources or reach out to the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/how-it-works">
                <Button variant="outline">How It Works</Button>
              </Link>
              <a
                href="https://github.com/wahibonae/onefile/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">GitHub Issues</Button>
              </a>
              <Link href="/about">
                <Button variant="outline">About OneFile</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Try OneFile?</h2>
            <p className="text-muted-foreground mb-6">
              Combine unlimited files and bypass AI upload limits in seconds.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Start Combining Files - Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
