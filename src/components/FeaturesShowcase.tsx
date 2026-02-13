"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export const FeaturesShowcase = (): React.JSX.Element => {
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    // Problem shows for 3.5s, solution shows for 4.5s (slightly longer)
    const duration = showSolution ? 4500 : 3500;
    const timer = setTimeout(() => {
      setShowSolution((prev) => !prev);
    }, duration);

    return () => clearTimeout(timer);
  }, [showSolution]);

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-2 sm:space-y-4">
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

        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <Image
              src="/feature_0.webp"
              alt="Automatically filters out unnecessary files like node_modules, images, and build artifacts."
              fill
              className="object-cover dark:brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm lg:order-first order-last">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <Image
              src="/feature_1.webp"
              alt="Upload files, folders, or import from GitHub"
              fill
              className="object-cover dark:brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-2 sm:space-y-4">
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

      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-2 sm:space-y-4">
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

        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <Image
              src="/feature_2.webp"
              alt="Automatically filters out unnecessary files like node_modules, images, and build artifacts."
              fill
              className="object-cover dark:brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm lg:order-first order-last">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-muted/30">
            <Image
              src="/feature_3.webp"
              alt="Open source code on GitHub - verify how your files are handled."
              fill
              className="object-cover dark:brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-2 sm:space-y-4">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Privacy First
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Open Source &amp; Transparent
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Everything is processed entirely in your browser. Documents like
            PDFs and Word files are processed on our server but never stored.
            All code is open-source on GitHub, verify it yourself!
          </p>
        </div>
      </section>
    </div>
  );
};
