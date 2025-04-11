import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
});

const title = "Code To Prompt - Turn Your Code FILES into ONE AI-Ready Prompt";
const description = "Convert multiple code files into one AI-ready prompt effortlessly. Upload entire project folders, bypass AI platform upload limits, generate once and use anywhere. Perfect for people who want to use ChatGPT, Claude, and other AI platforms.";
const url = "https://code-to-prompt.vercel.app";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "code to prompt",
    "AI prompt generator",
    "code file converter",
    "ChatGPT helper",
    "AI code assistant",
    "code documentation",
    "developer tools",
    "AI tools",
    "code analysis",
    "project documentation",
    "files to prompt",
    "upload files to AI",
    "bypass AI upload limit"
  ],
  authors: [{ name: "Mohamed Wahib ABKARI" }],
  creator: "Mohamed Wahib ABKARI",
  publisher: "Mohamed Wahib ABKARI",
  metadataBase: new URL(url),
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "Code To Prompt",
    images: [
      {
        url: "/seo-card.jpg",
        width: 1200,
        height: 627,
        alt: "Code To Prompt - Transform your code files into AI-ready prompts"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@wahibonae",
    images: ["/seo-card.jpg"]
  },
  alternates: {
    canonical: url
  },
  category: "technology",
  classification: "Developer Tools"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${spaceGrotesk.className} ${inter.className} pt-10`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
