"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Download,
  Check,
  Code,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import Github from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import X from "@/components/icons/X";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// Animation variants for consistent motion
const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.7 },
  viewport: { once: true, margin: "-50px" },
};

export default function AboutPage() {
  const problems = [
    "Limited number of files per conversation",
    "File size restrictions preventing better context",
    "Waiting for hours just to upload a few files again (free plan lol)",
    "Inability to upload entire project folders",
  ];

  const features = [
    {
      icon: Upload,
      title: "No More Upload Limits",
      description:
        "ChatGPT limits you to 5 files? We merge all of them into one file that you can upload.",
    },
    {
      icon: Download,
      title: "Any File Type",
      description:
        "Unlike PDF-only tools, OneFile handles Word docs, Excel sheets, PowerPoint files, PDFs, code, text files, and more - all formatted perfectly for AI.",
    },
    {
      icon: Check,
      title: "Instant Filtering",
      description:
        "Automatically skips .gitignore files and junk files. Preserves structure and formats everything for AI usage.",
    },
  ];

  const targetAudience = [
    {
      icon: Code,
      title: "Developers",
      description: "Share entire codebases with AI",
    },
    {
      icon: GraduationCap,
      title: "Students",
      description: "Combine study materials and assignments",
    },
    {
      icon: Briefcase,
      title: "Professionals",
      description: "Merge meeting notes & documents",
    },
    {
      icon: Users,
      title: "Anyone",
      description: "Multiple files → One prompt",
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/wahibonae",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/abkarimohamedwahib/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://twitter.com/wahibonae",
      icon: X,
      label: "X",
    },
  ];

  const openSourceBenefits = [
    "Source code is public on github",
    "Fully local and private",
    "Feel free to contribute and make it better",
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div className="text-center mb-8 sm:mb-12" {...fadeIn}>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <span className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 text-primary font-bold text-2xl sm:text-3xl">
                1
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              About OneFile
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Break through AI platform upload limits. Combine unlimited files
            into one single file.
          </p>
        </motion.div>

        {/* The Problem We Solved - Move this first to establish the need */}
        <motion.section className="mb-12 sm:mb-16" {...fadeIn}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            The Problem We Solved
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
              As AI tools like ChatGPT, Grok, and Gemini became essential for
              developers, students, and professionals, a common frustration
              emerged: <strong>file upload limitations</strong>. Users were
              constantly hitting barriers:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
              {problems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-base sm:text-lg leading-relaxed">
              OneFile was created to eliminate these barriers by intelligently
              combining any file type - not just PDFs - into a single, AI-ready
              format that works universally across all platforms.
            </p>
          </div>
        </motion.section>

        {/* How OneFile Works - Show the solution */}
        <motion.section className="mb-12 sm:mb-16" {...fadeIn}>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
            How OneFile Works
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-secondary/50 border dark:border-border"
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-0.5 sm:mt-1 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Who It's For - Show target audience */}
        <motion.section className="mb-12 sm:mb-16" {...fadeIn}>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
            OneFile is made for:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {targetAudience.map((user, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-start gap-3 px-6 py-4 sm:px-6 sm:py-4 rounded-2xl bg-muted border border-border"
                )}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              >
                <user.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-base font-semibold text-foreground mb-1">
                    {user.title}
                  </h3>
                  <p className="text-sm sm:text-sm text-muted-foreground">
                    {user.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About the Creator - Build credibility */}
        <motion.section className="mb-12 sm:mb-16" {...fadeIn}>
          <div className="bg-card rounded-2xl border dark:border-border p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  message from the creator:
                </h3>
                <div className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 space-y-2">
                  <div>hi everyone, my name is mohamed wahib, AI engineer.</div>
                  <div>
                    always building apps and tools for fun or *professional*
                    use.
                  </div>
                  <div>
                    i was just like you, copying and pasting the same files to
                    ChatGPT
                  </div>
                  <div>making one long ahh prompt to get help from AI.</div>
                  <div>
                    so I decided to build a tool that would help me and others.
                  </div>
                  <div>
                    please let me know what you think, and feel free to hit me up on socials.
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-muted-foreground">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      {...fadeIn}
                      transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                    >
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <social.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {social.label}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Open Source - Build trust */}
        <motion.section className="mb-12 sm:mb-16" {...fadeIn}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Open Source & Free Forever
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
              OneFile is <strong>completely free</strong> and{" "}
              <strong>open source</strong> under the MIT license. This means:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
              {openSourceBenefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* CTA - Final call to action */}
        <motion.section className="text-center" {...fadeIn}>
          <div className="bg-primary/5 rounded-xl border dark:border-border p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Join thousands of users who have eliminated file upload
              frustrations
            </p>
            <Link href="/">
              <Button className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">
                Try OneFile Now
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
