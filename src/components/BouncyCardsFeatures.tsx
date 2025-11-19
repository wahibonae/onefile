"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const BouncyCardsFeatures = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Upload Anything¹</CardTitle>
          <CardDescription>
            Upload files, folders, or import from GitHub (50+ file types)
          </CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-primary/5 border border-border/50 transition-transform duration-[250ms] group-hover:translate-y-5 group-hover:rotate-[2deg] overflow-hidden">
            <Image
              src="/feature_1.jpg"
              alt="Upload files, folders, or import from GitHub"
              fill
              className="object-cover"
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Smart Processing</CardTitle>
          <CardDescription>
            Automatically filters unnecessary files, respects .gitignore, and
            extracts text while preserving structure and context.
          </CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-primary/5 border border-border/50 p-4 transition-transform duration-[250ms] group-hover:translate-y-5 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-muted-foreground">
              VISUAL COMING SOON
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Copy &amp; Upload</CardTitle>
          <CardDescription className="hidden sm:block">
            Get one formatted text file with all your content. Copy or download
            it, then upload to any ChatGPT, Claude, Gemini, or any AI platform -
            no more file limits!
          </CardDescription>
          <CardDescription className="block sm:hidden">
            Get one formatted file. Copy or download it, then upload to ChatGPT or any AI with no limits!
          </CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-primary/5 border border-border/50 transition-transform duration-[250ms] group-hover:translate-y-5 group-hover:rotate-[2deg] overflow-hidden">
            <Image
              src="/feature_2.jpg"
              alt="Get one formatted file. Copy or download it, then upload to ChatGPT or any AI with no limits!"
              fill
              className="object-cover"
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>100% Private &amp; Secure</CardTitle>
          <CardDescription>
            All processing happens in your browser. Your files never leave your
            computer.
          </CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-primary/5 border border-border/50 p-4 transition-transform duration-[250ms] group-hover:translate-y-5 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-muted-foreground">
              VISUAL COMING SOON
            </span>
          </div>
        </BounceCard>
      </div>
    </div>
  );
};

interface BounceCardProps {
  className?: string;
  children: React.ReactNode;
}

const BounceCard = ({ className, children }: BounceCardProps) => {
  return (
    <motion.div
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-card border border-border shadow-sm p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
}

const CardTitle = ({ children }: CardTitleProps) => {
  return (
    <h3 className="mx-auto text-center text-2xl font-semibold text-foreground">
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <p
      className={`text-center text-sm text-muted-foreground mt-3 mb-4 ${className}`}
    >
      {children}
    </p>
  );
};
