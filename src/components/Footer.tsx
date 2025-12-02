import Link from "next/link";
import { Mail } from "lucide-react";
import GitHub from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import X from "@/components/icons/X";

export function Footer() {
  return (
    <footer className="bg-background mt-12">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Product */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-foreground mb-3">Product</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/supported-files"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Supported Files
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/wahibonae/onefile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-foreground mb-3">OneFile</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-foreground mb-3">
              wahib&apos;s socials
            </h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li>
                <a
                  href="https://github.com/wahibonae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <GitHub className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/abkarimohamedwahib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/wahibonae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@wahibabkari.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="p-1 rounded-sm bg-primary/10">
              <span className="flex items-center justify-center h-5 w-5 text-primary font-bold text-lg">
                1
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              OneFile
            </span>
          </Link>

          <div className="text-sm text-muted-foreground text-center md:text-left">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/abkarimohamedwahib/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              Mohamed Wahib ABKARI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
