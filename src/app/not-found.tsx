import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, FileText, HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center w-full max-w-sm sm:max-w-md">
        {/* 404 Display */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-primary select-none">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mt-3 sm:mt-4">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 px-2">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-8 sm:mb-10 px-2">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/blog">
              <FileText className="h-4 w-4" />
              Read Blog
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 text-left mx-2 sm:mx-0">
          <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Popular Pages
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            <li>
              <Link
                href="/blog/bypass-chatgpt-file-upload-limit-2025"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-3 w-3 flex-shrink-0" />
                <span className="line-clamp-1">Bypass ChatGPT File Upload Limit</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blog/chatgpt-file-upload-limits-2025"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-3 w-3 flex-shrink-0" />
                <span className="line-clamp-1">ChatGPT File Upload Limits 2025</span>
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <HelpCircle className="h-3 w-3 flex-shrink-0" />
                <span>Frequently Asked Questions</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
