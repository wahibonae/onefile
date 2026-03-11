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

export default function Home() {
  return (
    <>
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
