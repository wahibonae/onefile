import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import {
  BookOpen,
  FileText,
  PenLine,
  ClipboardList,
  Brain,
  Sparkles,
  CheckCircle2,
  Check,
  X,
  Circle,
  Layers,
  Users,
  FileType2,
  Presentation,
  FolderOpen,
  Download,
  ArrowUp,
  AlertTriangle,
} from "lucide-react";

const BASE_URL = "https://onefileapp.com";

export const metadata: Metadata = {
  title: "Upload Notes, PDFs & Slides to ChatGPT, Free Tool for Students 2026",
  description:
    "OneFile lets students bypass ChatGPT's 3-file daily limit. Combine every lecture note, PDF, slide, and reading into one upload. Free, no account, takes a minute.",
  keywords: [
    "upload notes to chatgpt",
    "upload pdfs to chatgpt",
    "combine files for chatgpt",
    "how to upload more files to chatgpt",
    "how to upload more files to chatgpt for free",
    "how many pdfs can i upload to chatgpt",
    "chatgpt for students",
    "chatgpt for studying",
    "chatgpt for homework",
    "ai for college students",
    "free tool for students chatgpt",
    "bypass chatgpt 3 file limit",
  ],
  openGraph: {
    title:
      "Upload Notes, PDFs & Slides to ChatGPT, Free Tool for Students 2026",
    description:
      "Combine every lecture note, PDF, and slide into one ChatGPT upload. Free, no account, made for students stuck behind the 3-file limit.",
    url: `${BASE_URL}/for-students`,
    type: "website",
    siteName: "OneFile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload Notes & PDFs to ChatGPT (Free Tool for Students)",
    description:
      "Combine course materials into one ChatGPT upload. Bypass the 3-file daily limit.",
  },
  alternates: {
    canonical: `${BASE_URL}/for-students`,
  },
};

function ExamPrepIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Practice Quiz
        </span>
        <span className="text-sm font-mono px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
          7 / 10
        </span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3 bg-card rounded-md p-3 border border-border/60">
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          <div className="h-2 bg-foreground/15 rounded-full flex-1" />
        </div>
        <div className="flex items-center gap-3 bg-card rounded-md p-3 border border-border/60">
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          <div className="h-2 bg-foreground/15 rounded-full flex-1" />
        </div>
        <div className="flex items-center gap-3 bg-card rounded-md p-3 border border-border/60">
          <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0 transition-all duration-500 group-hover:text-green-500 group-hover:rotate-[360deg]" />
          <div className="h-2 bg-foreground/10 rounded-full flex-1 transition-colors duration-500 group-hover:bg-green-500/30" />
        </div>
      </div>
    </div>
  );
}

function EssayIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="bg-card rounded-md p-4 border border-border/60 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <PenLine className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Outline
          </span>
        </div>
        <div className="h-2 bg-foreground/20 rounded-full mb-2.5 w-3/4" />
        <div className="h-2 bg-foreground/10 rounded-full mb-2.5" />
        <div className="h-2 bg-foreground/10 rounded-full mb-2.5 w-5/6" />
        <div className="h-2 bg-foreground/10 rounded-full mb-3.5 w-2/3" />
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-mono transition-transform duration-300 group-hover:-translate-y-0.5">
            [1]
          </span>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-mono transition-transform duration-300 delay-75 group-hover:-translate-y-0.5">
            [2]
          </span>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-mono transition-transform duration-300 delay-150 group-hover:-translate-y-0.5">
            [3]
          </span>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-mono transition-transform duration-300 delay-200 group-hover:-translate-y-0.5">
            [4]
          </span>
        </div>
      </div>
    </div>
  );
}

function LectureIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex items-center justify-center relative overflow-hidden">
      <div className="relative w-60 h-36">
        <div className="absolute top-2.5 left-0 right-10 h-32 bg-card/70 border border-border/60 rounded-md -rotate-3 group-hover:-rotate-6 transition-transform duration-300 shadow-sm" />
        <div className="absolute top-1 left-5 right-5 h-32 bg-card/85 border border-border/60 rounded-md -rotate-1 group-hover:-rotate-3 transition-transform duration-300 shadow-sm" />
        <div className="absolute top-0 left-10 right-0 h-32 bg-card border border-border rounded-md p-3.5 group-hover:rotate-1 transition-transform duration-300 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Presentation className="h-4 w-4 text-primary" />
            <div className="h-2 bg-foreground/20 rounded-full w-16" />
          </div>
          <div className="h-2 bg-foreground/10 rounded-full mb-2 w-full" />
          <div className="h-2 bg-foreground/10 rounded-full mb-2 w-3/4" />
          <div className="h-2 bg-foreground/10 rounded-full w-1/2" />
        </div>
      </div>
    </div>
  );
}

function HomeworkIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="bg-card rounded-md p-4 border border-border/60 shadow-sm font-mono">
        <div className="text-foreground/80 mb-3 text-sm">
          Problem: <span className="text-foreground">2x + 5 = 13</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 pl-2">
            <Check className="h-4 w-4 text-green-500 shrink-0" />
            <span className="text-sm text-foreground">2x = 8</span>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <X className="h-4 w-4 text-red-500 shrink-0 transition-transform duration-300 group-hover:rotate-90" />
            <span className="text-sm text-foreground/80 line-through">
              x = 5
            </span>
            <span className="text-xs text-red-500 not-italic font-sans transition-all duration-300 group-hover:text-red-600 group-hover:translate-x-0.5">
              should be 4
            </span>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <Check className="h-4 w-4 text-green-500 shrink-0" />
            <span className="text-sm text-foreground">x = 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThesisIllustration() {
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="grid grid-cols-3 gap-2.5">
        {["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"].map((label) => (
          <div
            key={label}
            className="bg-card rounded-md p-3 border border-border/60 flex flex-col items-center justify-center shadow-sm"
          >
            <FileType2 className="h-5 w-5 text-muted-foreground mb-1.5" />
            <span className="text-xs text-muted-foreground font-medium">
              {label}
            </span>
          </div>
        ))}
        <div className="bg-primary/10 rounded-md p-3 border border-primary/30 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Layers className="h-5 w-5 text-primary mb-1.5" />
          <span className="text-xs text-primary font-semibold">All</span>
        </div>
      </div>
    </div>
  );
}

function GroupProjectsIllustration() {
  const teammates = [
    { letter: "A", bg: "bg-blue-500" },
    { letter: "M", bg: "bg-emerald-500" },
    { letter: "J", bg: "bg-amber-500" },
    { letter: "S", bg: "bg-purple-500" },
  ];
  return (
    <div className="bg-secondary/30 border border-border/60 rounded-lg p-5 h-full flex flex-col justify-center">
      <div className="flex -space-x-2 group-hover:-space-x-0.5 mb-4 transition-all duration-300">
        {teammates.map((t) => (
          <div
            key={t.letter}
            className={`h-11 w-11 rounded-full border-2 border-background flex items-center justify-center text-sm font-semibold text-white shadow-sm ${t.bg}`}
          >
            {t.letter}
          </div>
        ))}
        <div className="h-11 w-11 rounded-full border-2 border-background bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground shadow-sm">
          +1
        </div>
      </div>
      <div className="bg-card rounded-md p-4 border border-border/60 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Merged Report
          </span>
        </div>
        <div className="h-2 bg-foreground/15 rounded-full mb-2" />
        <div className="h-2 bg-foreground/10 rounded-full mb-2 w-3/4" />
        <div className="h-2 bg-foreground/10 rounded-full w-1/2" />
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

function FolderDropVisual() {
  return (
    <div className="w-full border-2 border-dashed border-primary/40 rounded-lg p-3 bg-primary/5 text-center transition-colors duration-300 group-hover:border-primary/70 group-hover:bg-primary/10">
      <FolderOpen className="h-8 w-8 text-primary mx-auto mb-1.5 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.75} />
      <div className="text-xs font-mono text-foreground mb-1.5">notes/</div>
      <div className="flex justify-center gap-1 flex-wrap">
        <span className="text-[10px] px-1.5 py-0.5 bg-card border border-border rounded font-mono text-muted-foreground">
          PDF
        </span>
        <span className="text-[10px] px-1.5 py-0.5 bg-card border border-border rounded font-mono text-muted-foreground">
          DOCX
        </span>
        <span className="text-[10px] px-1.5 py-0.5 bg-card border border-border rounded font-mono text-muted-foreground">
          +12
        </span>
      </div>
    </div>
  );
}

function CopyVisual() {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary shrink-0" />
        <span className="text-xs font-mono text-foreground/80 truncate">
          onefile-prompt.txt
        </span>
      </div>
      <div className="flex gap-1.5">
        <div className="flex-1 bg-primary text-primary-foreground rounded-md py-2 px-2 text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
          <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          Download
        </div>
      </div>
    </div>
  );
}

function ChatGPTPasteVisual() {
  return (
    <div className="w-full">
      <div className="text-[10px] text-muted-foreground/70 mb-1.5 font-medium">
        ChatGPT
      </div>
      <div className="text-xs text-foreground/80 leading-snug mb-2 line-clamp-2">
        Help me study chapter 3 using these...
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-mono inline-flex items-center gap-1">
          <FileText className="h-2.5 w-2.5" />
          onefile.txt
        </span>
        <div className="bg-primary text-background rounded-full h-6 w-6 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5">
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

function AnswerVisual() {
  return (
    <div className="w-full space-y-2">
      <div className="ml-auto bg-primary/10 border border-primary/20 rounded-lg rounded-br-sm p-2 max-w-[85%]">
        <p className="text-[11px] text-foreground leading-snug">
          Quiz me on chapter 3
        </p>
      </div>
      <div className="bg-card border border-border/60 rounded-lg rounded-bl-sm p-2 max-w-[90%] transition-all duration-300 group-hover:translate-x-1 group-hover:border-primary/30">
        <p className="text-[11px] text-foreground leading-snug">
          Sure! Here are 5 questions covering the key concepts...
        </p>
      </div>
    </div>
  );
}

const useCases = [
  {
    icon: ClipboardList,
    illustration: ExamPrepIllustration,
    title: "Exam Prep",
    description:
      "Combine every textbook chapter, lecture slide, and study guide into one upload. Ask ChatGPT to generate practice questions, explain weak spots, or build a study plan that covers everything you actually need to know.",
    sampleQuery:
      '"Quiz me on chapters 3 to 7 of my textbook and flag every topic I get wrong."',
  },
  {
    icon: PenLine,
    illustration: EssayIllustration,
    title: "Essay & Research Papers",
    description:
      "Upload your assignment brief, rubric, all source materials, and class notes together. ChatGPT can outline, cite, and structure your arguments while staying anchored to the exact sources your professor expects.",
    sampleQuery:
      '"Outline a 2000-word essay using the rubric and these 8 sources. Match the citation style in my class handout."',
  },
  {
    icon: Brain,
    illustration: LectureIllustration,
    title: "Lecture Review",
    description:
      "Drop in all lecture slides plus your handwritten notes and readings for the week. Ask ChatGPT to fill gaps, explain confusing concepts, or summarize across the whole week instead of one lecture at a time.",
    sampleQuery:
      '"I missed Tuesday\'s lecture. Using these slides and last week\'s notes, explain what I need to know for the midterm."',
  },
  {
    icon: FileText,
    illustration: HomeworkIllustration,
    title: "Homework & Problem Sets",
    description:
      "Combine the textbook chapter, the problem set, and your worked solutions so far. ChatGPT can check your work, explain mistakes, and walk through methods, not just give you the answer.",
    sampleQuery:
      '"Here\'s the chapter, the problem set, and my attempt at #4. Where did I go wrong, and how do I fix the approach?"',
  },
  {
    icon: BookOpen,
    illustration: ThesisIllustration,
    title: "Thesis & Capstone",
    description:
      "Upload every chapter of your thesis at once instead of pasting them one at a time. ChatGPT can check argument flow across chapters, find contradictions, and suggest revisions with the full document in context.",
    sampleQuery:
      '"Read all 5 chapters of my thesis. Where do my arguments contradict each other? What\'s missing from chapter 3?"',
  },
  {
    icon: Users,
    illustration: GroupProjectsIllustration,
    title: "Group Projects",
    description:
      "Pull every teammate's draft, every meeting note, and the project brief into one prompt. ChatGPT can flag inconsistencies, merge sections, and write the final summary without you copy-pasting for an hour.",
    sampleQuery:
      '"Merge these 4 teammates\' sections into one cohesive report. Flag where we contradict each other."',
  },
];

const faqs = [
  {
    question: "Is OneFile free for students?",
    answer:
      "Yes, completely free. No account, no trial, no usage limits. It's open source under the MIT license. If you want to inspect the code or self-host it, you can.",
  },
  {
    question: "Will my professor know I used ChatGPT?",
    answer:
      "OneFile doesn't change how ChatGPT works, it just lets you upload more context. Whether you can use AI assistance is up to your institution's policy. Use AI for understanding, drafting, and reviewing, not for submitting work that isn't yours.",
  },
  {
    question: "Does this work on ChatGPT Free?",
    answer:
      "Yes. The point of OneFile is that you only count as a single upload, no matter how many files you combined. So Free users (3 uploads/day) and Go users get the same effective benefit as Plus users.",
  },
  {
    question: "Can I upload my entire textbook?",
    answer:
      "If it's a PDF or DOCX, yes. There's no file count limit in OneFile. The only practical ceiling is ChatGPT's context window (~128K tokens for Plus). A full textbook can exceed that, in which case combine the relevant chapters instead.",
  },
  {
    question: "Is my data private?",
    answer:
      "Text files are processed entirely in your browser, they never reach our servers. PDFs and DOCX files go through our API for text extraction, then they're immediately discarded, nothing is stored.",
  },
  {
    question: "Does it work with Claude or Gemini?",
    answer:
      "Yes. The combined output is a plain text file that works in any AI that accepts file uploads or pasted text, including Claude, Gemini, Grok, Perplexity, and any local LLM.",
  },
];

export default function ForStudentsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-6 py-6 sm:py-8 lg:py-12">
        {/* Hero */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Free tool for students
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5">
            Combine Every Note, PDF, and Slide Into One ChatGPT Upload
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            OneFile is a free tool that merges your course materials into a
            single file. Upload that one file to ChatGPT, Claude, or any AI,
            and you skip the 3-file daily cap on ChatGPT Free and the
            10-files-per-message cap on Plus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/">
              <Button size="lg" className="px-8">
                Combine My Files (Free)
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="px-8">
                How OneFile Works
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            OneFile is the tool. ChatGPT, Claude, and Gemini are where you send
            the combined file. No account. No trial.
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
                  The Student Problem
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "ChatGPT Free: only 3 files per day, resets in 24 hours",
                  "ChatGPT Plus: 10 files per message, 80 per 3 hours",
                  "You can't upload a whole week of lectures, let alone a semester",
                  "Re-uploading the same files every chat wastes your daily quota",
                  "PDFs, slides, and notes span formats ChatGPT handles inconsistently",
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
                  What OneFile Does (and Doesn&apos;t)
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "A file combiner that lives between your files and ChatGPT, Claude, or Gemini",
                  "Merges unlimited PDFs, slides, notes, and docs into a single file",
                  "You use 1 ChatGPT upload slot instead of 50",
                  "Drag-and-drop a folder, no manual selection",
                  "Supports 50+ formats: PDF, DOCX, PPTX, XLSX, code, markdown",
                  "Free forever, open source, no account",
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
              How Students Actually Use It
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six concrete workflows. Pick the one that matches what you&apos;re
              stuck on this week.
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
                      Try this prompt
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
                The 60-Second Workflow
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Four steps. One minute. Free.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <WorkflowStep
                number={1}
                title="Drop your folder"
                description="Lectures, readings, notes, slides. OneFile skips images and binary junk."
              >
                <FolderDropVisual />
              </WorkflowStep>
              <WorkflowStep
                number={2}
                title="Click Download"
                description="One combined file, formatted and ready for AI."
              >
                <CopyVisual />
              </WorkflowStep>
              <WorkflowStep
                number={3}
                title="Paste into ChatGPT"
                description="Pasting text bypasses the upload limit entirely."
              >
                <ChatGPTPasteVisual />
              </WorkflowStep>
              <WorkflowStep
                number={4}
                title="Ask anything"
                description="Follow up without re-uploading. Full context kept."
              >
                <AnswerVisual />
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
                No upload caps
              </p>
              <p className="text-sm text-muted-foreground">
                Combine 10, 100, or 1000+ files into one
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6">
              <CheckCircle2 className="h-7 w-7 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">No account</p>
              <p className="text-sm text-muted-foreground">
                Drag, drop, copy. No signup wall.
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6">
              <CheckCircle2 className="h-7 w-7 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">Private</p>
              <p className="text-sm text-muted-foreground">
                Text files never leave your browser
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Student FAQ
            </h2>
            <p className="text-muted-foreground">
              Quick answers. For everything else, see our{" "}
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
              "bypass-chatgpt-file-upload-limit-2025",
              "how-many-files-upload-chatgpt",
              "chatgpt-file-upload-limit-error",
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
              Stop fighting ChatGPT&apos;s 3-file limit
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Combine an entire semester of notes, slides, and readings into a
              single file, then upload that to ChatGPT. Free, no account, takes
              under a minute.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Combine My Files, Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
