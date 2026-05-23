import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Navbar } from "@/components/Navbar";
import { ToolSection } from "@/components/ToolSection";
import { LogoCloud } from "@/components/LogoCloud";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://onefileapp.com/#faq",
  name: "OneFile FAQ: Upload Unlimited Files to AI Platforms like ChatGPT",
  url: "https://onefileapp.com/",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://onefileapp.com/",
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "How many files can I combine with OneFile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no limit! Combine 10, 100, or even 1,000+ files into one. The only constraint is your browser's memory, which can typically handle thousands of files without issues.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work with ChatGPT's free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! ChatGPT free users are limited to uploading 3 files per day. With OneFile, you can merge unlimited files into one text file and upload that single file to ChatGPT, bypassing the 3-file restriction entirely. Even Plus users benefit by avoiding the frustration of uploading files in batches of 10 for large projects.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private and secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Text and code files are processed entirely in your browser, they never leave your computer. Documents like PDFs and Word files are temporarily processed on our server for text extraction but are never stored. Our entire codebase is open-source on GitHub, so you can verify exactly how your files are handled.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upload an entire GitHub repository?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Use our GitHub import feature to browse and select files from any public repository. You can also download a repo as a ZIP, extract it, and upload the entire folder. OneFile automatically respects .gitignore files and skips node_modules, .git, and other unnecessary directories.",
      },
    },
    {
      "@type": "Question",
      name: "What file types are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OneFile supports 50+ file types including PDFs (.pdf), Microsoft Office files (.docx, .xlsx, .pptx), code files (.js, .py, .java, .cpp, .tsx, etc.), text files (.txt, .md, .csv), configuration files (.json, .yaml, .env), and many more. Images and binary files are automatically filtered out.",
      },
    },
    {
      "@type": "Question",
      name: "How does OneFile handle large files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Complex document formats like PDFs, DOCX, and XLSX are processed on our server to extract text content, while simple text files are processed instantly in your browser. The combined output is optimized for AI context windows, typically staying under 1-2MB for easy uploading.",
      },
    },
    {
      "@type": "Question",
      name: "Does OneFile work on mobile devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! OneFile is fully responsive and works on smartphones and tablets. However, for the best experience with large folder uploads, we recommend using a desktop or laptop browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is OneFile really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free with no hidden costs, no account required, and no usage limits. OneFile is open-source software released under the MIT license. You can even host your own version if you want!",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageFaqSchema),
        }}
      />
      <ScrollProgress />
      <div className="min-h-screen bg-background flex flex-col space-y-6">
        <div className="relative pb-8 sm:pb-12 md:pb-20">
          <div className="absolute bottom-14 inset-0 saturate-130">
            <Image
              src="/hero-bg.webp"
              alt=""
              fill
              className="object-cover dark:hidden"
              sizes="100vw"
              priority
            />
            <Image
              src="/hero-bg-dark.webp"
              alt=""
              fill
              className="object-cover hidden dark:block"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-[20%] dark:h-[35%] bg-gradient-to-b from-transparent to-background"></div>
          </div>

          <div className="relative z-10">
            <Navbar />

            <div className="flex-grow container max-w-6xl mx-auto px-6 pb-8 sm:pb-12">
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8 md:py-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                    Upload Unlimited Files to AI
                  </h1>
                  <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
                    Bypass ChatGPT&apos;s 3-file limit. Combine unlimited files into
                    one AI-ready file.
                    <br className="hidden sm:block" />
                    <span className="sm:inline"> </span>Free tool for ChatGPT,
                    Claude, Gemini, and all AI platforms.
                  </p>
                </div>

                <ToolSection />
              </div>

              <a
                href="#content"
                className="hidden md:flex flex-col items-center mx-auto mt-8 animate-pulse text-muted-foreground hover:text-primary transition-all"
              >
                <span className="text-sm mb-1">Learn More</span>
                <ChevronDown className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div id="content" className="container max-w-6xl mx-auto px-6 py-12 space-y-32">
          <LogoCloud />

          <ComparisonSection />

          <section className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              How It Works
            </h2>
            <FeaturesShowcase />
          </section>

          <TestimonialsSection />

          <FAQSection />
        </div>
      </div>
    </>
  );
}
