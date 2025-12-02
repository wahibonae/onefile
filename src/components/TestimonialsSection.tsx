"use client";

import React from "react";
import {
  TestimonialsColumn,
  Testimonial,
} from "@/components/ui/testimonials-column";

const testimonials: Testimonial[] = [
  {
    text: "i've been using OneFile *religiously* in my internship to get around upload limits. thank you so much!",
    gender: "woman",
    name: "Hajar A.",
    role: "Data Analyst",
  },
  {
    text: "onefile made it easy to merge all our cybersecurity docs and quickly analyze data/chat with AI, huge time saver.",
    gender: "man",
    name: "Ali B.",
    role: "CyberSecurity Engineer",
  },
  {
    text: "OneFile genuinely improved the way I work with AI and make project backups. Simple and exactly what I needed. Thanks Wahib! <3",
    gender: "man",
    name: "Aboubakr K.",
    role: "AI Engineer",
  },
  {
    text: "i used it a ton to bypass upload limits as a free plan user on ChatGPT, definitely boosted your traffic 😂",
    gender: "woman",
    name: "Khaoula A.",
    role: "AI Engineer",
  },
  {
    text: "honestly, OneFile's been a lifesaver, i've used it for all 10 of my projects with Gemini lol",
    gender: "man",
    name: "Saad Z.",
    role: "Software Engineer",
  },
  {
    text: "One File has been a game changer for me. Whether I'm tackling a new project I know nothing about or just need to quickly get up to speed on something, it makes understanding complex stuff so much easier. Thanks Wahib, this app has genuinely made my life simpler",
    gender: "man",
    name: "Salah A.",
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
