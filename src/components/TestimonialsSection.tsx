"use client";

import React from "react";
import {
  TestimonialsColumn,
  Testimonial,
} from "@/components/ui/testimonials-column";

// const testimonials: Testimonial[] = [
//   {
//     text: "Finally bypassed ChatGPT's 3-file limit! I uploaded my entire React project and got debugging help in seconds. This tool is a game-changer for developers.",
//     gender: "man",
//     name: "Marcus Chen",
//     role: "Full Stack Developer",
//   },
//   {
//     text: "I use this daily to share codebases with Claude. No more splitting files manually or losing context. The .gitignore support is brilliant.",
//     gender: "woman",
//     name: "Sarah Mitchell",
//     role: "Software Engineer",
//   },
//   {
//     text: "As a student, I upload all my research PDFs and notes at once. Gemini can now help me analyze everything together. Saved hours of work!",
//     gender: "woman",
//     name: "Emma Rodriguez",
//     role: "Graduate Researcher",
//   },
//   {
//     text: "The privacy aspect sold me. Everything stays in my browser - no uploads to unknown servers. Perfect for working with sensitive client code.",
//     gender: "man",
//     name: "David Park",
//     role: "Security Consultant",
//   },
//   {
//     text: "I combine all my blog drafts and let AI help with editing. What used to take multiple sessions now takes one. Incredibly efficient.",
//     gender: "woman",
//     name: "Lisa Thompson",
//     role: "Content Creator",
//   },
//   {
//     text: "Our team uses this to share entire project folders with AI assistants. The smart filtering removes all the junk automatically.",
//     gender: "man",
//     name: "James Wilson",
//     role: "Tech Lead",
//   },
//   {
//     text: "Uploaded 200+ files from a legacy codebase. Got refactoring suggestions in minutes. This tool understands what developers actually need.",
//     gender: "woman",
//     name: "Nina Patel",
//     role: "Backend Developer",
//   },
//   {
//     text: "The GitHub import feature is incredible. Clone, filter, and export to AI in seconds. No more manual copy-paste marathons.",
//     gender: "man",
//     name: "Alex Kim",
//     role: "DevOps Engineer",
//   },
//   {
//     text: "I teach coding bootcamps and use this to let students share their projects with AI tutors. Simple, fast, and completely free.",
//     gender: "woman",
//     name: "Rachel Foster",
//     role: "Coding Instructor",
//   },
// ];

const testimonials: Testimonial[] = [
  {
    text: "i've been using OneFile *religiously* in my internship to get around upload limits. thank you so much!",
    gender: "woman",
    name: "Hajar",
    role: "Data Analyst",
  },
  {
    text: "there isn't a week that goes by where i don't use OneFile for my coding projects, it's *THE* go-to for bypassing upload limits",
    gender: "man",
    name: "Wahib",
    role: "Creator of OneFile",
  },
  {
    text: "onefile made it easy to merge all our cybersecurity docs and quickly analyze data/chat with AI, huge time saver.",
    gender: "man",
    name: "Ali",
    role: "CyberSecurity Engineer",
  },
  {
    text: "OneFile genuinely improved the way I work with AI and make project backups. Simple and exactly what I needed. Thanks Wahib! <3",
    gender: "man",
    name: "Aboubakr",
    role: "AI Engineer",
  },
  {
    text: "i used it a ton to bypass upload limits as a free plan user on ChatGPT, definitely boosted your traffic 😂",
    gender: "woman",
    name: "Kh.",
    role: "AI Engineer",
  },
  {
    text: "honestly, OneFile's been a lifesaver, i've used it for all 10 of my projects with Gemini lol",
    gender: "man",
    name: "Saad",
    role: "Software Engineer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsSection = () => {
  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
        What Our Users Say
      </h2>

      <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[580px] overflow-hidden group">
        <TestimonialsColumn testimonials={firstColumn} duration={25} />
        <TestimonialsColumn
          testimonials={secondColumn}
          className="hidden md:block"
          duration={30}
        />
        <TestimonialsColumn
          testimonials={thirdColumn}
          className="hidden lg:block"
          duration={28}
        />
      </div>
    </section>
  );
};
