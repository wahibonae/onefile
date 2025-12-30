"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Shield,
  Code,
  AlertTriangle,
} from "lucide-react";


export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: November 19, 2025
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
                Free to use, no account required for basic features
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                You own your files - we claim no rights to your content
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                Service provided &quot;as is&quot; - no guarantees or warranties
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>
                Don&apos;t upload illegal content or use for harmful purposes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>
                We&apos;re not liable for any damages from using OneFile
              </span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                Acceptance of Terms
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                By accessing and using OneFile (&quot;the Service&quot;), you
                accept and agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you do not agree to these Terms, please
                do not use the Service.
              </p>
              <p>
                OneFile is a free, open-source web application that combines
                multiple files into a single text file optimized for AI
                platforms. The Service is provided by Mohamed Wahib ABKARI
                (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p>
                We reserve the right to modify these Terms at any time. Changes
                will be posted on this page with an updated &quot;Last
                updated&quot; date. Your continued use of the Service after
                changes constitutes acceptance of the modified Terms.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                Service Description
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>What OneFile Does:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Combines multiple files (code, documents, PDFs, Office files)
                  into a single text file
                </li>
                <li>
                  Processes text files locally in your browser (client-side)
                </li>
                <li>
                  Extracts text from complex documents (PDFs, DOCX, XLSX, PPTX)
                  using server-side APIs
                </li>
                <li>
                  Respects .gitignore files and filters out unnecessary
                  directories
                </li>
                <li>
                  Provides output optimized for AI platforms like ChatGPT,
                  Claude, and Gemini
                </li>
                <li>
                  Allows GitHub repository import (requires sign-in)
                </li>
                <li>
                  Allows YouTube transcript and text content import
                </li>
              </ul>
              <p>
                <strong>What OneFile Does NOT Do:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Store your files on our servers (except during temporary text extraction)</li>
                <li>Analyze or train AI models on your content</li>
                <li>Share your data with third parties (except authentication providers)</li>
                <li>Guarantee any specific results or compatibility with AI platforms</li>
                <li>Provide file storage or backup services</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                User Obligations
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>Acceptable Use:</strong> You agree to use OneFile only
                for lawful purposes and in compliance with these Terms. You are
                solely responsible for the content of files you upload.
              </p>
              <p>
                <strong>Prohibited Uses:</strong> You may NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Upload files containing illegal content (child exploitation
                  material, terrorism, illegal drugs, etc.)
                </li>
                <li>
                  Upload files you don&apos;t have the right to process
                  (copyrighted material without permission)
                </li>
                <li>
                  Use the Service to harass, abuse, or harm others
                </li>
                <li>
                  Attempt to reverse engineer, decompile, or hack the Service
                </li>
                <li>
                  Use the Service for automated scraping or excessive API
                  requests
                </li>
                <li>
                  Upload malware, viruses, or malicious code
                </li>
                <li>
                  Violate any applicable laws or regulations
                </li>
              </ul>
              <p>
                <strong>Account Security:</strong> If you sign in with GitHub
                to use repository import features, you are responsible for
                maintaining the security of your account credentials.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                Intellectual Property
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>Your Content:</strong> You retain all ownership rights
                to files you upload to OneFile. We claim no intellectual
                property rights over your content. By uploading files, you
                grant us a temporary, non-exclusive license to process them
                solely for providing the Service (text extraction).
              </p>
              <p>
                <strong>Our Code:</strong> OneFile&apos;s source code is
                released under the MIT License and is available on GitHub
                (github.com/wahibonae/onefile). You are free to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the code for any purpose (commercial or personal)</li>
                <li>Modify and distribute the code</li>
                <li>Host your own instance of OneFile</li>
              </ul>
              <p className="text-sm">
                The MIT License requires that you include the original copyright
                notice and license text in any copies or substantial portions of
                the software.
              </p>
              <p>
                <strong>Trademarks:</strong> &quot;OneFile&quot; and associated
                logos are trademarks of Mohamed Wahib ABKARI. You may not use
                our trademarks without prior written permission, except as
                allowed by the MIT License for attribution purposes.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground m-0">
                Disclaimers and Limitations of Liability
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                  IMPORTANT LEGAL NOTICE
                </p>
                <p className="text-sm">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES
                  OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
              </div>
              <p>
                <strong>No Guarantees:</strong> We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The Service will be available 24/7 without interruptions
                </li>
                <li>
                  Text extraction will be 100% accurate for all document types
                </li>
                <li>
                  Combined files will work perfectly with every AI platform
                </li>
                <li>
                  Your files will be processed without errors or data loss
                </li>
                <li>
                  The Service will meet your specific requirements
                </li>
              </ul>
              <p>
                <strong>Limitation of Liability:</strong> To the maximum extent
                permitted by law, we shall not be liable for any:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Indirect, incidental, special, or consequential damages
                </li>
                <li>
                  Loss of profits, data, or business opportunities
                </li>
                <li>
                  Damages resulting from your use or inability to use the
                  Service
                </li>
                <li>
                  Damages caused by errors, bugs, or security vulnerabilities
                </li>
                <li>
                  Damages from third-party services (Clerk, Cloudflare, Vercel)
                </li>
              </ul>
              <p>
                In jurisdictions that do not allow the exclusion of certain
                warranties or limitation of liability, our liability shall be
                limited to the maximum extent permitted by law.
              </p>
              <p className="font-semibold">
                Because OneFile is a free service, our maximum liability to you
                for any damages is $0 USD.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Third-Party Services
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                OneFile integrates with the following third-party services:
              </p>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Clerk (Authentication)
                  </h3>
                  <p className="text-sm mb-2">
                    Used for GitHub OAuth sign-in for repository import feature.
                  </p>
                  <p className="text-sm">
                    Terms:{" "}
                    <a
                      href="https://clerk.com/legal/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      clerk.com/legal/terms
                    </a>
                  </p>
                </div>
              </div>
              <p>
                We are not responsible for the practices, terms, or policies of
                these third-party services. Your use of these services is
                subject to their respective terms and privacy policies.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Indemnification
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                You agree to indemnify, defend, and hold harmless OneFile,
                Mohamed Wahib ABKARI, and our contributors from any claims,
                damages, losses, liabilities, and expenses (including legal
                fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or misuse of the Service</li>
                <li>
                  Your violation of these Terms or any applicable laws
                </li>
                <li>
                  Your violation of any third-party rights (including
                  intellectual property)
                </li>
                <li>Content you upload or process through OneFile</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Termination
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                <strong>Your Rights:</strong> You may stop using OneFile at any
                time. No account deletion is necessary for basic features since
                no account is required. If you signed in with GitHub, you can
                revoke access through your GitHub settings.
              </p>
              <p>
                <strong>Our Rights:</strong> We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Suspend or terminate your access to the Service at any time
                  for any reason
                </li>
                <li>
                  Discontinue the Service entirely with or without notice
                </li>
                <li>
                  Remove or refuse to process any content that violates these
                  Terms
                </li>
              </ul>
              <p>
                Upon termination, you must stop using the Service. Sections of
                these Terms that should survive termination (disclaimers,
                limitations of liability, indemnification) will remain in
                effect.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Governing Law and Disputes
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of France, without regard to conflict of law
                principles.
              </p>
              <p>
                Any disputes arising from these Terms or your use of OneFile
                shall be resolved through good faith negotiation first. If
                negotiation fails, disputes shall be subject to the exclusive
                jurisdiction of the courts of France.
              </p>
              <p>
                <strong>EU Users:</strong> If you are a consumer in the European
                Union, you may also have the right to bring proceedings in the
                courts of your country of residence.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Severability
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                If any provision of these Terms is found to be unenforceable or
                invalid by a court of law, that provision shall be modified to
                the minimum extent necessary to make it enforceable, or if that
                is not possible, it shall be severed from these Terms. The
                remaining provisions shall continue in full force and effect.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Entire Agreement
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                These Terms, together with our Privacy Policy, constitute the
                entire agreement between you and OneFile regarding the use of
                the Service and supersede any prior agreements.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Contact Us
            </h2>
            <div className="text-muted-foreground">
              <p className="mb-4">
                If you have questions about these Terms of Service, please
                contact us:
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
            <h2 className="text-2xl font-bold mb-3">
              Ready to Bypass AI Upload Limits?
            </h2>
            <p className="text-muted-foreground mb-6">
              By using OneFile, you agree to these Terms of Service and our
              Privacy Policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button>Start Using OneFile</Button>
              </Link>
              <Link href="/privacy">
                <Button variant="outline">View Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
