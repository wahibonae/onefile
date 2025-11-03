"use client";

import Image from "next/image";

export function LogoCloud() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-9 sm:space-y-11">
          {/* Text Label */}
          <p className="text-2xl sm:text-3xl text-center font-semibold text-foreground">
            Works with Your Favorite AI Platforms
          </p>

          {/* Logo Grid - 2 per row on mobile, 3 per row on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl">
            {/* Claude */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/claude.svg"
                alt="Claude"
                width={100}
                height={24}
                className="h-7 w-auto opacity-70 brightness-0 dark:invert hover:opacity-100 transition-all duration-200"
              />
            </div>

            {/* ChatGPT */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/openai.svg"
                alt="ChatGPT"
                width={100}
                height={24}
                className="h-8 w-auto opacity-70 brightness-0 dark:invert hover:opacity-100 transition-all duration-200"
              />
            </div>

            {/* Gemini */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/google-gemini.svg"
                alt="Gemini"
                width={100}
                height={24}
                className="h-9 w-auto opacity-70 brightness-0 dark:invert hover:opacity-100 transition-all duration-200"
              />
            </div>

            {/* DeepSeek */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/deepseek.svg"
                alt="DeepSeek"
                width={100}
                height={24}
                className="h-8 w-auto opacity-70 brightness-0 dark:invert hover:opacity-100 transition-all duration-200"
              />
            </div>

            {/* Grok */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/Grok_Full_Logomark_Dark.svg"
                alt="Grok"
                width={100}
                height={24}
                className="h-11 w-auto opacity-70 brightness-0 dark:invert hover:opacity-100 transition-all duration-200"
              />
            </div>

            {/* Perplexity */}
            <div className="flex items-center justify-center">
              <Image
                src="/icons/perplexity.svg"
                alt="Perplexity"
                width={100}
                height={24}
                className="h-8 w-auto opacity-70 brightness-0 dark:invert hover:opacity-100 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
