import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import GitHub from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import X from "@/components/icons/X";

export function Footer() {
  return (
    <footer className="bg-background mt-12">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
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
          {/* More from wahib */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col items-center lg:items-start">
            <h3 className="font-semibold text-foreground mb-3">
              More from wahib
            </h3>
            <ul className="flex flex-col items-center lg:items-start space-y-3">
              <li>
                <a
                  href="https://getskipit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-[#FE6F4F] hover:brightness-110 font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <Image
                    src="https://icons.duckduckgo.com/ip3/getskipit.com.ico"
                    alt=""
                    width={14}
                    height={14}
                    unoptimized
                  />
                  Skipit
                </a>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Skip unwanted scenes on Netflix
                </p>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/Hide%20Deepseek%20Thoughts/emhghfdejlhbbnfmcgjkcedmlajcghpp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <Image
                    src="https://icons.duckduckgo.com/ip3/chromewebstore.google.com.ico"
                    alt=""
                    width={14}
                    height={14}
                    unoptimized
                  />
                  Hide Deepseek Thoughts
                </a>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Clean up Deepseek&apos;s thinking process
                </p>
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
