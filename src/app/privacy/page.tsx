"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Server, Lock } from "lucide-react";

import GitHub from "@/components/icons/Github";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: October 23, 2025
          </p>
        </div>

        {/* TL;DR */}
        <div
          className="mb-12 bg-primary/5 border border-primary/20 rounded-xl p-6"
         
        >
          <h2 className="text-xl font-bold text-foreground mb-4">TL;DR</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                Text files are processed 100% in your browser - we never see
                them
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                PDFs/Office docs are sent to our server only for text
                extraction, then immediately deleted
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>We don&apos;t store, log, or analyze your files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>No account required, no tracking, no analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Open-source code - you can verify everything</span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                What Data We Collect
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>Personal Information:</strong> We do not collect any
                personal information such as names, email addresses, or phone
                numbers unless you explicitly provide them (e.g., when signing
                in with GitHub for repository import).
              </p>
              <p>
                <strong>File Content:</strong> For text-based files
                (JavaScript, Python, Markdown, etc.), all processing happens
                locally in your web browser. We never receive, store, or have
                access to these files.
              </p>
              <p>
                <strong>Document Files:</strong> For complex documents (PDFs,
                DOCX, XLSX, PPTX), files are temporarily sent to our server
                only for text extraction. These files are:
              </p>
              <ul className="list-disc pl-6">
                <li>Processed in memory (never written to disk)</li>
                <li>Immediately deleted after text extraction</li>
                <li>Not logged, stored, or analyzed in any way</li>
                <li>Not shared with any third parties</li>
              </ul>
              <p>
                <strong>Usage Data:</strong> We collect minimal, anonymized
                usage statistics via Vercel Analytics (if deployed there):
              </p>
              <ul className="list-disc pl-6">
                <li>Page views (no personal identifiers)</li>
                <li>Geographic region (country-level only)</li>
                <li>Referring website (where you came from)</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                How We Process Your Files
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Client-Side Processing (Browser)
                </h3>
                <p className="text-sm mb-2">
                  <strong>File Types:</strong> .txt, .md, .js, .py, .json,
                  .yaml, .html, .css, and most code files
                </p>
                <p className="text-sm">
                  <strong>How it works:</strong> Your browser reads the files
                  directly using the File API. The content never leaves your
                  computer. We literally cannot see these files because
                  they&apos;re never sent to our servers.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Server-Side Processing (API)
                </h3>
                <p className="text-sm mb-2">
                  <strong>File Types:</strong> .pdf, .docx, .xlsx, .pptx
                </p>
                <p className="text-sm">
                  <strong>How it works:</strong> These complex formats require
                  specialized libraries for text extraction. Files are sent to
                  our API endpoint, processed in memory using libraries like
                  pdfjs-serverless and mammoth, and the extracted text is
                  returned to your browser. The original file is immediately
                  deleted from memory.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                Data Security
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>HTTPS Encryption:</strong> All communication between
                your browser and our servers is encrypted using TLS/SSL.
              </p>
              <p>
                <strong>No Storage:</strong> We do not use databases to store
                file content. Files processed server-side are never written to
                disk or persistent storage.
              </p>
              <p>
                <strong>No Logging:</strong> We do not log file names, file
                contents, or any metadata about your uploads.
              </p>
              <p>
                <strong>Session Storage:</strong> Your uploaded files are
                temporarily stored in your browser&apos;s sessionStorage to
                preserve them during GitHub OAuth redirects. This data stays in
                your browser and is automatically cleared when you close the
                tab.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GitHub className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                Third-Party Services
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>Clerk (Authentication):</strong> If you choose to sign
                in with GitHub to use the repository import feature, we use
                Clerk for authentication. Clerk handles the OAuth flow and
                stores your GitHub access token securely. We only receive your
                GitHub username and access token (with read-only permissions).
                See Clerk&apos;s Privacy Policy at clerk.com/legal/privacy
              </p>
              <p>
                <strong>Vercel Analytics:</strong> If the application is
                deployed on Vercel, we may use Vercel Analytics for anonymized
                traffic statistics. No personally identifiable information is
                collected.
              </p>
              <p>
                <strong>Cloudflare Pages:</strong> The application may be
                hosted on Cloudflare Pages, which provides DDoS protection and
                content delivery. Cloudflare may temporarily log IP addresses
                for security purposes. See Cloudflare&apos;s Privacy Policy at
                cloudflare.com/privacypolicy
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Your Rights
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Since we don&apos;t collect or store personal data, there&apos;s
                no data to access, correct, or delete. You have complete
                control over your files:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Files never leave your browser for most file types</li>
                <li>
                  Files sent to our server are immediately deleted after
                  processing
                </li>
                <li>No account creation means no data tied to your identity</li>
                <li>You can inspect our open-source code to verify our claims</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Open Source Transparency
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                OneFile is fully open source under the MIT license. You can
                review our entire codebase, including file processing logic, at:
              </p>
              <div className="bg-card border border-border rounded-lg p-4">
                <a
                  href="https://github.com/wahibonae/onefile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-mono text-sm"
                >
                  github.com/wahibonae/onefile
                </a>
              </div>
              <p>
                This transparency allows security researchers and users to
                verify that we handle files exactly as described in this
                policy.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Changes to This Policy
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated &quot;Last
                updated&quot; date. Significant changes will be announced via:
              </p>
              <ul className="list-disc pl-6">
                <li>A notice on our homepage</li>
                <li>A message in our GitHub repository</li>
                <li>A post on our social media accounts</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Contact Us
            </h2>
            <div className="text-muted-foreground">
              <p className="mb-4">
                If you have questions about this Privacy Policy or how we
                handle your data, please:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Open an issue on GitHub:{" "}
                  <a
                    href="https://github.com/wahibonae/onefile/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/wahibonae/onefile/issues
                  </a>
                </li>
                <li>
                  Reach out on Twitter:{" "}
                  <a
                    href="https://twitter.com/wahibonae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @wahibonae
                  </a>
                </li>
                <li>
                  Connect on LinkedIn:{" "}
                  <a
                    href="https://www.linkedin.com/in/abkarimohamedwahib/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mohamed Wahib ABKARI
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className="mt-12">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Trust & Transparency</h2>
            <p className="text-muted-foreground mb-6">
              Your privacy is our priority. All code is open source and
              verifiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button>Try OneFile Now</Button>
              </Link>
              <a
                href="https://github.com/wahibonae/onefile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">View Source Code</Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
