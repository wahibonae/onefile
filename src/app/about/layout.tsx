import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OneFile - Free tool to upload many files to AI",
  description: "Learn about OneFile, the free open-source tool that lets you break upload limits on ChatGPT, Grok, Gemini, etc.",
  keywords: [
    "about onefile",
    "file merger creator",
    "AI file tool developer",
    "Mohamed Wahib ABKARI",
    "open source file combiner",
    "free file merger tool"
  ],
  openGraph: {
    title: "About OneFile - Free tool to upload many files to AI",
    description: "Learn about OneFile, the free open-source tool that lets you break upload limits on ChatGPT, Grok, Gemini, etc.",
    url: "https://www.onefileapp.com/about",
  },
  alternates: {
    canonical: "https://www.onefileapp.com/about"
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 