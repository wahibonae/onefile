import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import {
  BookOpen,
  FlaskConical,
  FileText,
  Microscope,
  Library,
  Sigma,
  Sparkles,
  CheckCircle2,
  Check,
  X,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  Quote,
  Filter,
  FileType2,
  Code2,
  FolderOpen,
} from "lucide-react";

const BASE_URL = "https://onefileapp.com";

export const metadata: Metadata = {
  title: "Upload 100+ Research Papers to ChatGPT or Claude (Free Tool, 2026)",
  description:
    "OneFile merges your entire PDF library into a single upload. Send literature reviews, thesis chapters, and replication code to ChatGPT or Claude in one prompt. Free, open source.",
  keywords: [
    "upload research papers to chatgpt",
    "upload pdfs to claude",
    "combine pdfs for chatgpt",
    "how many pdfs can i upload to chatgpt",
    "how many documents can you upload to claude",
    "claude file upload limit",
    "summarize multiple pdfs",
    "chatgpt for literature review",
    "claude for research papers",
    "chatgpt for thesis",
    "ai for phd students",
    "ai for systematic review",
  ],
  openGraph: {
    title:
      "Upload 100+ Research Papers to ChatGPT or Claude (Free Tool, 2026)",
    description:
      "OneFile merges your literature, thesis chapters, and replication code into a single upload to send to any AI. Free, open source.",
    url: `${BASE_URL}/for-researchers`,
    type: "website",
    siteName: "OneFile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload 100+ Papers to ChatGPT or Claude (Free Tool)",
    description:
      "OneFile is a free file combiner for researchers. Bypass per-prompt upload caps on every AI.",
  },
  alternates: {
    canonical: `${BASE_URL}/for-researchers`,
  },
};

function LiteratureReviewIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center overflow-hidden">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Library
        </span>
        <span className="text-sm font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
          87 papers
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1.5 transition-transform duration-500 group-hover:scale-105">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-card border border-border/60 rounded-sm flex items-center justify-center shadow-sm transition-colors duration-300 group-hover:border-primary/40"
          >
            <FileType2 className="h-3.5 w-3.5 text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ThesisReviewIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between gap-2.5 mb-4">
        <div className="flex-1 bg-card rounded-md p-3 border border-border/60 shadow-sm">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Ch 2
          </div>
          <div className="h-1.5 bg-foreground/15 rounded-full mb-1.5" />
          <div className="h-1.5 bg-foreground/10 rounded-full w-3/4" />
        </div>
        <ArrowRight className="h-5 w-5 text-amber-500 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        <div className="flex-1 bg-card rounded-md p-3 border border-border/60 shadow-sm">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Ch 6
          </div>
          <div className="h-1.5 bg-foreground/15 rounded-full mb-1.5" />
          <div className="h-1.5 bg-foreground/10 rounded-full w-2/3" />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">
          Framing conflicts with conclusion
        </span>
      </div>
    </div>
  );
}

function ReplicationIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-md p-3 border border-border/60 shadow-sm transition-transform duration-300 group-hover:rotate-1">
          <div className="flex items-center gap-2 mb-2.5">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground">
              Paper
            </span>
          </div>
          <div className="h-1.5 bg-foreground/15 rounded-full mb-1.5" />
          <div className="h-1.5 bg-foreground/10 rounded-full mb-1.5 w-5/6" />
          <div className="h-1.5 bg-foreground/10 rounded-full w-2/3" />
        </div>
        <div className="bg-card rounded-md p-3 border border-border/60 shadow-sm font-mono transition-transform duration-300 group-hover:-rotate-1">
          <div className="flex items-center gap-2 mb-2.5">
            <Code2 className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-semibold text-muted-foreground">
              Code
            </span>
          </div>
          <div className="text-xs text-foreground/70 leading-snug space-y-0.5">
            <div>lm(y ~ x)</div>
            <div>data = df</div>
            <div className="text-emerald-600 dark:text-emerald-400">
              ✓ matches
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        <span className="text-sm text-muted-foreground">
          Methods align with code
        </span>
      </div>
    </div>
  );
}

function SystematicReviewIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">
          Abstracts screened
        </span>
        <span className="text-sm font-mono text-foreground">200</span>
      </div>
      <div className="flex items-center justify-center my-2">
        <div className="flex items-center gap-2 bg-card border border-border/60 rounded-md px-3 py-1.5 shadow-sm">
          <Filter className="h-4 w-4 text-primary transition-transform duration-700 group-hover:rotate-180" />
          <span className="text-xs text-muted-foreground">PICO filter</span>
        </div>
      </div>
      <div className="space-y-2 mt-1">
        <div className="flex items-center gap-2.5 bg-card rounded-md p-3 border border-border/60 shadow-sm">
          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
          <span className="text-sm text-foreground/80 flex-1">Included</span>
          <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
            47
          </span>
        </div>
        <div className="flex items-center gap-2.5 bg-card rounded-md p-3 border border-border/60 shadow-sm">
          <X className="h-4 w-4 text-red-500 shrink-0" />
          <span className="text-sm text-foreground/80 flex-1">Excluded</span>
          <span className="text-sm font-mono text-red-500">153</span>
        </div>
      </div>
    </div>
  );
}

function GrantWritingIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5">
        Prior funded
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {["R01", "R21", "K99"].map((label) => (
          <div
            key={label}
            className="bg-card rounded-md p-2.5 border border-border/60 flex flex-col items-center shadow-sm"
          >
            <FileText className="h-4 w-4 text-emerald-500 mb-1" />
            <span className="text-xs text-muted-foreground font-mono">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-1.5">
        <ArrowDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-y-1" />
      </div>
      <div className="bg-card rounded-md p-3 border-2 border-primary/40 shadow-sm transition-shadow duration-300 group-hover:shadow-md group-hover:border-primary/60">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-semibold text-primary">
            New draft
          </span>
        </div>
        <div className="h-1.5 bg-foreground/15 rounded-full mb-1.5" />
        <div className="h-1.5 bg-foreground/10 rounded-full w-3/4" />
      </div>
    </div>
  );
}

function PeerReviewIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="bg-card rounded-md p-4 border border-border/60 shadow-sm">
        <div className="flex items-center gap-2 mb-3.5">
          <Quote className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Manuscript claims
          </span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <div className="h-2 bg-foreground/10 rounded-full flex-1" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              cited
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <div className="h-2 bg-foreground/10 rounded-full flex-1" />
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              cited
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
            <div className="h-2 bg-amber-500/30 rounded-full flex-1 transition-colors duration-300 group-hover:bg-amber-500/50" />
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              unsupported
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="group flex flex-col">
      <div className="bg-secondary/30 border border-border/60 rounded-lg p-4 h-36 flex items-center justify-center mb-4 overflow-hidden transition-colors hover:border-primary/40">
        {children}
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">
          {number}. {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function ZoteroExportVisual() {
  return (
    <div className="w-full font-mono">
      <div className="text-xs text-foreground/80 flex items-center gap-1.5 mb-1.5 transition-transform duration-300 group-hover:translate-x-0.5">
        <FolderOpen className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:scale-110" />
        <span>zotero/</span>
      </div>
      <div className="space-y-0.5 ml-4">
        <div className="flex items-center gap-1.5 text-[11px] text-foreground/70">
          <FileText className="h-2.5 w-2.5" />
          <span className="truncate">paper-001.pdf</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-foreground/70">
          <FileText className="h-2.5 w-2.5" />
          <span className="truncate">paper-002.pdf</span>
        </div>
        <div className="text-[11px] text-muted-foreground/60 italic ml-4">
          + 62 more
        </div>
      </div>
    </div>
  );
}

function OneFileDropVisual() {
  return (
    <div className="w-full border-2 border-dashed border-primary/40 rounded-lg p-3 bg-primary/5 text-center transition-colors duration-300 group-hover:border-primary/70 group-hover:bg-primary/10">
      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1.5 transition-transform duration-300 group-hover:translate-y-1">
        <ArrowDown className="h-5 w-5 text-primary" strokeWidth={2.5} />
      </div>
      <div className="text-xs font-medium text-foreground">Drop PDFs here</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">
        Text extracted, filenames kept
      </div>
    </div>
  );
}

function ClaudeUploadVisual() {
  return (
    <div className="w-full">
      <div className="text-[10px] text-muted-foreground/70 mb-1.5 font-medium">
        Claude
      </div>
      <div className="text-xs text-foreground/80 leading-snug mb-2 line-clamp-2">
        Identify themes across these 64 papers...
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-mono inline-flex items-center gap-1">
          <FileText className="h-2.5 w-2.5" />
          corpus.txt
        </span>
        <div className="bg-primary text-background rounded-full h-6 w-6 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5">
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

function VerifyVisual() {
  return (
    <div className="w-full space-y-2">
      <div>
        <p className="text-[11px] text-foreground/80 leading-snug mb-1 line-clamp-1">
          Smith (2023) reports X...
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded font-medium transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-105">
          <Check className="h-2.5 w-2.5" />
          verified
        </span>
      </div>
      <div>
        <p className="text-[11px] text-foreground/80 leading-snug mb-1 line-clamp-1">
          Jones (2024) finds Y...
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded font-medium transition-all duration-300 delay-100 group-hover:bg-amber-500/20 group-hover:scale-105">
          <AlertTriangle className="h-2.5 w-2.5 transition-transform duration-300 group-hover:rotate-12" />
          check source
        </span>
      </div>
    </div>
  );
}

const useCases = [
  {
    icon: Library,
    illustration: LiteratureReviewIllustration,
    title: "Literature Review",
    description:
      "Combine 50, 100, or 200+ PDFs into one upload. Ask Claude or ChatGPT to identify common themes, contradictions, methodological gaps, and underexplored questions across the entire corpus, not just the abstracts.",
    sampleQuery:
      '"Across these 60 papers, what are the dominant methods and where do authors disagree on findings?"',
  },
  {
    icon: BookOpen,
    illustration: ThesisReviewIllustration,
    title: "Thesis & Dissertation Review",
    description:
      "Upload every chapter at once instead of pasting them one by one. AI can check argument continuity, flag contradictions between chapter 2 and chapter 6, and catch references you defined in one chapter but used differently in another.",
    sampleQuery:
      '"Read all 7 chapters of my dissertation. Where do my framing and conclusion contradict each other?"',
  },
  {
    icon: FlaskConical,
    illustration: ReplicationIllustration,
    title: "Replication Studies",
    description:
      "Pull the original paper, its data appendix, and the entire replication codebase into a single prompt. AI can compare what the paper claims to do versus what the code actually does, surfacing methodology drift.",
    sampleQuery:
      '"Compare the methods section of this paper to the actual R scripts. Are there any deviations?"',
  },
  {
    icon: Microscope,
    illustration: SystematicReviewIllustration,
    title: "Systematic Reviews",
    description:
      "Combine your inclusion criteria, methodology document, and all candidate papers in one go. AI can pre-screen for relevance, extract structured data, and flag papers that don't actually meet your criteria.",
    sampleQuery:
      `"Using my PICO criteria, screen these 120 abstracts and tag each as include, exclude, or uncertain."`,
  },
  {
    icon: FileText,
    illustration: GrantWritingIllustration,
    title: "Grant Writing",
    description:
      "Upload your last three funded proposals, the call for the new grant, and your draft together. AI can identify what worked in your prior wins, where the new draft deviates, and what reviewers tend to flag.",
    sampleQuery:
      '"Using my prior funded R01s, where does this draft fall short of the typical NIH reviewer expectations?"',
  },
  {
    icon: Sigma,
    illustration: PeerReviewIllustration,
    title: "Peer Review Prep",
    description:
      "Combine the manuscript you're reviewing with its referenced papers and your journal's review guidelines. AI can pre-check whether claims are supported, references are accurate, and the methods are sound.",
    sampleQuery:
      `"Read this manuscript, the journal's review template, and the 12 papers it cites. Flag any claim that the cited paper doesn't actually support."`,
  },
];

const faqs = [
  {
    question: "Can AI actually do a real literature review?",
    answer:
      "Not without your judgment. AI excels at first-pass synthesis: spotting themes, surfacing contradictions, extracting structured data. It still misses domain-specific nuance and hallucinates citations. Use it to accelerate the mechanical 80%, then bring your expertise to the rest.",
  },
  {
    question:
      "What's the practical limit on how many papers I can combine?",
    answer:
      "OneFile has no file count limit. The real ceiling is the AI's context window. Claude Sonnet 4 handles roughly 200K tokens (~150K words), enough for 50 to 100 papers depending on length. Claude Opus and ChatGPT Pro handle more. For larger corpora, split by sub-topic and review in batches.",
  },
  {
    question:
      "Is uploading research papers to AI ethical / against publisher rules?",
    answer:
      "For your own analysis, yes, fair use generally covers AI-assisted reading of papers you legally access. Don't share the combined file publicly, and don't publish AI-generated summaries verbatim. Check your institution's AI policy and the publisher's terms before any redistribution.",
  },
  {
    question: "Does this work with Claude, not just ChatGPT?",
    answer:
      "Yes. OneFile produces a plain text file that works in any AI: Claude, ChatGPT, Gemini, Grok, Perplexity, or local LLMs. For literature reviews specifically, Claude's larger context window is usually a better fit than ChatGPT.",
  },
  {
    question: "How is OneFile different from NotebookLM or Elicit?",
    answer:
      "NotebookLM and Elicit are research-specific platforms with their own models and limits. OneFile is a single-purpose tool: it combines your files into one upload, then you use whichever AI you prefer. It's free, no account, and you keep full control over which model handles your data.",
  },
  {
    question: "Is my data confidential?",
    answer:
      "Text files are processed in your browser and never reach our servers. PDFs and DOCX files are sent to our API for text extraction, then discarded immediately. Nothing is stored, nothing is logged. The code is open source if you want to verify.",
  },
];

export default function ForResearchersPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-6 py-6 sm:py-8 lg:py-12">
        {/* Hero */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Free tool for researchers and PhDs
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5">
            Upload 100+ Research Papers to ChatGPT or Claude in One Prompt
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            OneFile is a free file combiner, not an AI. It merges your PDFs
            into one file. You send that file to Claude, ChatGPT, or Gemini,
            and ask cross-corpus questions across 50 to 300 papers, not the
            10-to-20-per-prompt cap every AI imposes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/">
              <Button size="lg" className="px-8">
                Combine My Papers (Free)
              </Button>
            </Link>
            <Link href="/blog/ai-file-upload-limits-compared">
              <Button size="lg" variant="outline" className="px-8">
                Compare AI Upload Limits
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Open source, MIT licensed. Output works with Claude, ChatGPT,
            Gemini, Grok, and any LLM.
          </p>
        </header>

        {/* Problem vs Solution */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Problem Card */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 sm:p-7 space-y-2">
              <div className="flex items-center gap-3 pb-4">
                <div className="bg-red-500/10 rounded-lg p-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Why Research Workflows Break on AI
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Claude: 20 files per message, no folder upload",
                  "ChatGPT Plus: 10 files per message, ~80 per 3 hours",
                  "Gemini Free: 10 files per prompt, restricted formats",
                  "Literature reviews typically involve 50 to 300 papers, not 10",
                  "Thesis review needs cross-chapter context AI can't hold across separate uploads",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <div className="bg-red-500/10 rounded-full p-1 mt-0.5 shrink-0">
                      <X
                        className="h-3 w-3 text-red-500"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-7 space-y-2">
              <div className="flex items-center gap-3 pb-4">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  What OneFile Is (and Isn&apos;t)
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "A file combiner that lives between your PDF library and Claude, ChatGPT, or Gemini",
                  "Merges unlimited PDFs into one upload, no file count cap",
                  "Handles PDF, DOCX, PPTX, XLSX, BibTeX, and code files",
                  "Drop a Zotero export folder, OneFile reads it all",
                  "Output is plain text, paste into Claude (200K context) or any AI",
                  "Open source, MIT. Text files never leave your browser",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5 shrink-0">
                      <Check
                        className="h-3 w-3 text-primary"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Six Workflows Where AI Actually Helps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Concrete uses, with a sample prompt for each. None of these
              replace your judgment, they replace the mechanical first pass.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors flex flex-col"
              >
                <div className="p-5 pb-0 h-[280px]">
                  <useCase.illustration />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <useCase.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {useCase.description}
                  </p>
                  <div className="bg-secondary/30 border border-border rounded-lg p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-semibold">
                      Sample prompt
                    </p>
                    <p className="text-sm text-foreground italic">
                      {useCase.sampleQuery}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mb-20">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                From Reference Library to AI Prompt in Under 2 Minutes
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Four steps from your Zotero folder to a verified synthesis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <WorkflowStep
                number={1}
                title="Export from Zotero"
                description="Any folder of PDFs works. BibTeX optional for citation metadata."
              >
                <ZoteroExportVisual />
              </WorkflowStep>
              <WorkflowStep
                number={2}
                title="Drag into OneFile"
                description="OneFile extracts text and preserves filenames so AI can cite back."
              >
                <OneFileDropVisual />
              </WorkflowStep>
              <WorkflowStep
                number={3}
                title="Upload to Claude"
                description="Claude's 200K context handles 50 to 100 papers per conversation."
              >
                <ClaudeUploadVisual />
              </WorkflowStep>
              <WorkflowStep
                number={4}
                title="Ask, then verify"
                description="AI is fast at first-pass synthesis. Always spot-check citations."
              >
                <VerifyVisual />
              </WorkflowStep>
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="mb-20">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center bg-card border border-border rounded-xl p-6">
              <CheckCircle2 className="h-7 w-7 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">
                Unlimited papers
              </p>
              <p className="text-sm text-muted-foreground">
                Combine 50, 100, 300+ PDFs at once
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6">
              <CheckCircle2 className="h-7 w-7 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">Open source</p>
              <p className="text-sm text-muted-foreground">
                MIT licensed, self-host if you prefer
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6">
              <CheckCircle2 className="h-7 w-7 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">
                Nothing stored
              </p>
              <p className="text-sm text-muted-foreground">
                Text processed in-browser, PDFs discarded after extraction
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Researcher FAQ
            </h2>
            <p className="text-muted-foreground">
              For ChatGPT-specific upload questions, see our{" "}
              <Link href="/faq" className="text-primary hover:underline">
                full FAQ
              </Link>
              .
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* Related Reading */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Related Reading
          </h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "chatgpt-literature-review-2026",
              "ai-file-upload-limits-compared",
              "bypass-chatgpt-file-upload-limit-2025",
            ].map((slug) => {
              const post = blogPosts.find((p) => p.slug === slug);
              if (!post) return null;
              return <BlogCard key={slug} post={post} />;
            })}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Built for the way researchers actually work
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Merge your literature, your draft, and your data into a single
              file, then send it to whatever AI you already use. Free, open
              source, no signup.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Combine My Papers, Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
