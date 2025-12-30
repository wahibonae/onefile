"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Code,
  Briefcase,
  Users,
  FileText,
  GitBranch,
  Lightbulb,
  BookOpen,
  PresentationIcon,
  FlaskConical,
  MessageSquare,
} from "lucide-react";

export default function UseCasesPage() {
  const useCases = [
    {
      icon: GraduationCap,
      persona: "Students",
      tagline: "Ace your studies with AI-powered research",
      problem:
        "Students struggle with ChatGPT's 3-file limit when analyzing multiple research papers, lecture notes, or study materials. Even ChatGPT Plus users face frustration uploading files in batches of 10. Re-uploading files for each new question wastes time and breaks focus.",
      solution:
        "OneFile lets students combine all research papers, PDFs, lecture slides, and notes into one file. Upload once to ChatGPT and ask unlimited questions about any part of your materials.",
      examples: [
        {
          icon: BookOpen,
          title: "Thesis Research",
          description:
            "Upload 20+ academic papers, extract key arguments, identify research gaps, and generate citations with AI assistance.",
        },
        {
          icon: FileText,
          title: "Essay Writing",
          description:
            "Combine source materials, class notes, and assignment requirements. Ask AI to help structure arguments and cite sources.",
        },
        {
          icon: FlaskConical,
          title: "Exam Preparation",
          description:
            "Merge textbook chapters, lecture PDFs, and study guides. Create practice questions and get explanations.",
        },
      ],
      workflow: [
        "Download all research PDFs, lecture slides, and notes to one folder",
        "Upload the entire folder to OneFile",
        "Copy the combined output",
        "Paste into ChatGPT with your research question",
        "Ask follow-up questions without re-uploading",
      ],
      testimonial:
        "I uploaded my entire semester's worth of biology notes and textbook chapters. ChatGPT helped me ace my finals by explaining concepts I was struggling with.",
    },
    {
      icon: Code,
      persona: "Developers",
      tagline: "Share entire codebases with AI for better assistance",
      problem:
        "Developers need to show AI their entire codebase for context, but copying and pasting files one by one is tedious. AI can't understand code structure without seeing how files relate.",
      solution:
        "OneFile imports directly from GitHub or uploads entire project folders, respecting .gitignore. AI gets full codebase context including file structure, making debugging and code review much more effective.",
      examples: [
        {
          icon: GitBranch,
          title: "Code Review",
          description:
            "Upload your pull request changes with related files. Ask AI to review for bugs, security issues, and best practices.",
        },
        {
          icon: Code,
          title: "Debugging Help",
          description:
            "Share your entire project when stuck on a bug. AI can trace through files and suggest fixes with full context.",
        },
        {
          icon: FileText,
          title: "Documentation Generation",
          description:
            "Upload codebase and let AI generate README files, API docs, or inline comments explaining complex logic.",
        },
      ],
      workflow: [
        "Sign in with GitHub and import your repository",
        "Or download your project and upload the folder",
        "OneFile automatically skips node_modules and .git",
        "Upload combined file to Claude or ChatGPT",
        "Ask for code review, debugging help, or documentation",
      ],
      testimonial:
        "Instead of explaining my entire React app structure, I just upload the whole project with OneFile. ChatGPT understands the context instantly.",
    },
    {
      icon: Briefcase,
      persona: "Professionals",
      tagline: "Streamline work with AI-powered document analysis",
      problem:
        "Business professionals juggle multiple documents - meeting notes, reports, spreadsheets, presentations. Preparing materials for AI analysis is time-consuming when limited to 5-10 files.",
      solution:
        "OneFile merges all business documents, from Word files to Excel sheets to PowerPoint decks, into one AI-ready format. Perfect for board meeting prep, quarterly reviews, or project planning.",
      examples: [
        {
          icon: PresentationIcon,
          title: "Meeting Preparation",
          description:
            "Combine meeting notes, reports, and data sheets. Ask AI to generate presentation outlines or identify key discussion points.",
        },
        {
          icon: Briefcase,
          title: "Quarterly Reviews",
          description:
            "Upload all Q1-Q4 reports and financial data. Get AI analysis of trends, insights, and recommendations.",
        },
        {
          icon: Lightbulb,
          title: "Project Planning",
          description:
            "Merge project requirements, timelines, budgets, and stakeholder docs. Ask AI to identify risks and suggest solutions.",
        },
      ],
      workflow: [
        "Gather all relevant docs (DOCX, XLSX, PPTX, PDFs)",
        "Upload to OneFile - supports all Office formats",
        "Get one formatted text file with all information",
        "Upload to Gemini or ChatGPT Plus",
        "Ask for summaries, analysis, or action items",
      ],
      testimonial:
        "I prep for board meetings by uploading 15+ documents at once. AI helps me spot trends and prepare talking points in minutes.",
    },
    {
      icon: Users,
      persona: "Researchers",
      tagline: "Analyze datasets and papers without file limits",
      problem:
        "Academic researchers analyze dozens of papers, datasets, and literature reviews. AI upload limits force them to cherry-pick which files to include, missing important context.",
      solution:
        "OneFile handles massive literature reviews by combining unlimited PDFs, CSV data files, and research notes. Researchers get comprehensive AI analysis across their entire corpus.",
      examples: [
        {
          icon: BookOpen,
          title: "Literature Review",
          description:
            "Upload 50+ academic papers. Ask AI to identify common themes, contradictions, and research gaps.",
        },
        {
          icon: FlaskConical,
          title: "Data Analysis",
          description:
            "Combine CSV datasets and methodology docs. Get AI help interpreting results and suggesting statistical tests.",
        },
        {
          icon: FileText,
          title: "Grant Writing",
          description:
            "Upload previous successful proposals and research summaries. Ask AI to help structure your grant application.",
        },
      ],
      workflow: [
        "Export papers from reference manager as PDFs",
        "Include datasets (CSV), protocols, and notes",
        "Upload everything to OneFile",
        "Share with Claude Opus for deep analysis",
        "Get comprehensive literature synthesis",
      ],
      testimonial:
        "My systematic review included 73 papers. OneFile let me upload all of them at once, and Claude helped me identify patterns across the entire corpus.",
    },
  ];

  const additionalUseCases = [
    {
      icon: MessageSquare,
      title: "Content Creators",
      description:
        "Combine video scripts, blog drafts, and social media posts. Ask AI to ensure consistent brand voice across all content.",
    },
    {
      icon: BookOpen,
      title: "Authors & Writers",
      description:
        "Upload all your book chapters, research notes, and character descriptions. Get AI feedback on plot consistency and pacing.",
    },
    {
      icon: Lightbulb,
      title: "Consultants",
      description:
        "Merge client documents, industry reports, and analysis templates. Generate insights and recommendations efficiently.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Use Cases
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how students, developers, professionals, and researchers
            use OneFile to bypass AI upload limits and work smarter.
          </p>
        </div>

        {/* Main Use Cases */}
        <div className="space-y-24">
          {useCases.map((useCase, index) => (
            <section key={index}>
              {/* Persona Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {useCase.persona}
                  </h2>
                  <p className="text-lg text-primary font-medium">
                    {useCase.tagline}
                  </p>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-500/5 border border-red-500/20 dark:border-red-500/50 text-red-500 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    ❌ The Problem
                  </h3>
                  <p>{useCase.problem}</p>
                </div>
                <div className="bg-green-500/5 border border-green-500/30 text-green-500 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    ✓ The Solution
                  </h3>
                  <p>{useCase.solution}</p>
                </div>
              </div>

              {/* Examples */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Real Examples
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {useCase.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border rounded-xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <example.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {example.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow */}
              <div className="bg-secondary/30 border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Step-by-Step Workflow
                </h3>
                <ol className="space-y-3">
                  {useCase.workflow.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </span>
                      <span className="text-muted-foreground pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Testimonial */}
              <div className="mt-6 bg-card border-l-4 border-l-primary p-6 rounded-r-xl">
                <p className="text-muted-foreground italic">
                  &quot;{useCase.testimonial}&quot;
                </p>
                <p className="text-sm text-primary font-medium mt-2">
                  - OneFile&apos;s ideal {useCase.persona.toLowerCase().slice(0, -1)} user
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Additional Use Cases */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">
            More Ways to Use OneFile
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalUseCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <useCase.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Thread */}
        <section className="mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              What They All Have in Common
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-6">
              Whether you&apos;re a student, developer, professional, or
              researcher, OneFile solves the same core problem:{" "}
              <strong>
                AI platform upload limits prevent you from sharing necessary
                context
              </strong>
              . By combining unlimited files into one, you work without
              restrictions.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  Unlimited
                </div>
                <div className="text-sm text-muted-foreground">
                  Files Combined
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">
                  Free Forever
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  Private
                </div>
                <div className="text-sm text-muted-foreground">& Secure</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Use OneFile for Your Work?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of users who have eliminated AI upload
              frustrations. Start combining files in seconds.
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
