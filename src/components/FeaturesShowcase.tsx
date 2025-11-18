import React from "react";
import Image from "next/image";

export const FeaturesShowcase = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Section A: Many Files In → One File Out (Image RIGHT) */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text LEFT */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            File Consolidation
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Many Files In → One File Out
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Upload hundreds of files from entire codebases, document folders, or
            projects. OneFile combines them all into a single, perfectly
            formatted text file that any AI can process.
          </p>
        </div>

        {/* Image RIGHT */}
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <span className="text-muted-foreground/60 text-sm font-medium">
              Image coming soon
            </span>
          </div>
        </div>
      </section>

      {/* Section B: Upload Anything (Image LEFT) */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image LEFT (on desktop, shows first due to order-first) */}
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm lg:order-first order-last">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <Image
              src="/feature_1.png"
              alt="Upload files, folders, or import from GitHub"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text RIGHT */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            File Support
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Upload Anything
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            50+ file types supported including PDF, DOCX, XLSX, PPTX, and all
            major programming languages. Drag &amp; drop files, folders, or
            import directly from GitHub repositories.
          </p>
        </div>
      </section>

      {/* Section C: Smart Processing (Image RIGHT) */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text LEFT */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Intelligent Filtering
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Smart Processing
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Automatically filters out unnecessary files like node_modules,
            images, and build artifacts. Respects .gitignore rules and extracts
            only the text content you need.
          </p>
        </div>

        {/* Image RIGHT */}
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <Image
              src="/feature_2.png"
              alt="Upload files, folders, or import from GitHub"
              fill
              className="object-cover transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Section D: 100% Private & Secure (Image LEFT) */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image LEFT (on desktop, shows first due to order-first) */}
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm lg:order-first order-last">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
          <Image
              src="/feature_3.png"
              alt="Upload files, folders, or import from GitHub"
              fill
              className="object-cover transition-all duration-300"
            />
          </div>
        </div>

        {/* Text RIGHT */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Privacy First
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            100% Private &amp; Secure
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            All processing happens directly in your browser. Your files never
            touch our servers, never get uploaded, and never leave your
            computer. No accounts, no tracking, completely private.
          </p>
        </div>
      </section>
    </div>
  );
};
