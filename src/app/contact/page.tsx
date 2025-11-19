"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Code,
  HelpCircle,
  Bug,
} from "lucide-react";

import GitHub from "@/components/icons/Github";
import XformerlyTwitter from "@/components/icons/X";
import LinkedIn from "@/components/icons/Linkedin";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or want to contribute? We&apos;d love to
            hear from you.
          </p>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://github.com/wahibonae/onefile/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Bug className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-foreground">Report a Bug</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Found an issue? Open a GitHub issue to help us improve OneFile.
              </p>
            </a>

            <Link
              href="/faq"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Check the FAQ</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Quick answers to common questions about OneFile and AI upload
                limits.
              </p>
            </Link>

            <a
              href="https://github.com/wahibonae/onefile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  Contribute Code
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                OneFile is open source. Submit a PR to add features or fix bugs.
              </p>
            </a>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Contact Methods
          </h2>
          <div className="space-y-4">
            {/* GitHub */}
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <GitHub className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  GitHub Issues (Recommended)
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The best way to report bugs, request features, or ask
                  technical questions. Public discussion helps the community.
                </p>
                <a
                  href="https://github.com/wahibonae/onefile/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium text-sm"
                >
                  Open a GitHub Issue →
                </a>
              </div>
            </div>

            {/* Twitter */}
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <XformerlyTwitter className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  Twitter/X
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Follow for updates and tips about OneFile. Feel free to share
                  your feedback or tag me in posts.
                </p>
                <a
                  href="https://twitter.com/wahibonae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium text-sm"
                >
                  @wahibonae →
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <LinkedIn className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">LinkedIn</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect to follow my work, discuss tech, or explore potential
                  collaborations.
                </p>
                <a
                  href="https://www.linkedin.com/in/abkarimohamedwahib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium text-sm"
                >
                  Mohamed Wahib ABKARI →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contributing Section */}
        <section className="mb-12">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground m-0">
                Contribute to OneFile
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              OneFile is open source and welcomes contributions from developers
              of all skill levels. Here&apos;s how you can help:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Code Contributions
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Fix bugs or add new features</li>
                  <li>• Improve documentation</li>
                  <li>• Add support for more file types</li>
                  <li>• Optimize performance</li>
                </ul>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Non-Code Contributions
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Report bugs and issues</li>
                  <li>• Suggest new features</li>
                  <li>• Share OneFile with others</li>
                  <li>• Write tutorials or guides</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://github.com/wahibonae/onefile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <GitHub className="h-4 w-4" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">
              Haven&apos;t Tried OneFile Yet?
            </h2>
            <p className="text-muted-foreground mb-6">
              Bypass AI upload limits in seconds. Combine unlimited files for
              ChatGPT, Claude, and Gemini.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button size="lg" className="px-8">
                  Try OneFile Now - Free
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="px-8">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
