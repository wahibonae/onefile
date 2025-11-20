import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import { Footer } from "@/components/Footer";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const title =
  "OneFile - Bypass ChatGPT Upload Limits | Combine Multiple Files for AI";
const description =
  "Break through ChatGPT's 3-file limit. Combine unlimited files (PDFs, code, docs, Excel) into one AI-ready file. Free tool for Claude, Gemini, Grok, and all AI platforms. No account required.";
const url = "https://www.onefileapp.com";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "OneFile",
  keywords: [
    "bypass chatgpt upload limits",
    "chatgpt file limit",
    "chatgpt file limit bypass",
    "upload multiple files to chatgpt",
    "claude file upload",
    "gemini file merger",
    "combine files for AI",
    "AI upload limits",
    "chatgpt free file limit",
    "upload folder to chatgpt",
    "github to chatgpt",
    "merge files for AI",
    "AI file combiner",
    "onefile",
    "file merger for AI",
    "multiple files one prompt",
    "chatgpt file restrictions",
    "bypass ai upload limits",
    "student AI tools",
    "developer AI tools",
    "code to AI",
    "PDF to AI",
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
    siteName: "OneFile",
    images: [
      {
        url: "/seo-card.jpg",
        width: 1200,
        height: 627,
        alt: "OneFile - Upload many files to AI as one single file",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@wahibonae",
    images: ["/seo-card.jpg"],
  },
  alternates: {
    canonical: url,
  },
  category: "productivity",
  classification: "File Management Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "OneFile",
      alternateName: [
        "OneFile",
        "OneFile - Bypass ChatGPT Upload Limits",
      ],
      url: url,
      description: description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      publisher: {
        "@type": "Organization",
        name: "OneFile",
        url: url,
        logo: {
          "@type": "ImageObject",
          url: `${url}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "OneFile",
      applicationCategory: "WebApplication",
      operatingSystem: "Web Browser",
      description: description,
      url: url,
      softwareVersion: "1.1",
      datePublished: "2024-01-01",
      author: {
        "@type": "Person",
        name: "Mohamed Wahib ABKARI",
        url: "https://www.linkedin.com/in/abkarimohamedwahib/",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Bypass ChatGPT upload limits",
        "Combine unlimited files into one",
        "Support for 50+ file types",
        "GitHub repository import",
        "Open source and transparent",
      ],
      screenshot: {
        "@type": "ImageObject",
        url: `${url}/seo-card.jpg`,
        width: 1200,
        height: 627,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many files can I combine with OneFile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There's no limit! Combine 10, 100, or even 1,000+ files into one. The only constraint is your browser's memory, which can typically handle thousands of files without issues.",
          },
        },
        {
          "@type": "Question",
          name: "Does this work with ChatGPT's free plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! ChatGPT free users are limited to uploading 3 files per day. With OneFile, you can merge unlimited files into one text file and upload that single file to ChatGPT, bypassing the 3-file restriction entirely. Even Plus users benefit by avoiding the frustration of uploading files in batches of 10 for large projects.",
          },
        },
        {
          "@type": "Question",
          name: "Is my data private and secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Text and code files are processed entirely in your browser - they never leave your computer. Documents like PDFs and Word files are temporarily processed on our server for text extraction but are never stored. Our entire codebase is open-source on GitHub, so you can verify exactly how your files are handled.",
          },
        },
        {
          "@type": "Question",
          name: "Can I upload an entire GitHub repository?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Use our GitHub import feature to browse and select files from any public repository. You can also download a repo as a ZIP, extract it, and upload the entire folder. OneFile automatically respects .gitignore files and skips node_modules, .git, and other unnecessary directories.",
          },
        },
        {
          "@type": "Question",
          name: "What file types are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OneFile supports 50+ file types including PDFs (.pdf), Microsoft Office files (.docx, .xlsx, .pptx), code files (.js, .py, .java, .cpp, .tsx, etc.), text files (.txt, .md, .csv), configuration files (.json, .yaml, .env), and many more. Images and binary files are automatically filtered out.",
          },
        },
        {
          "@type": "Question",
          name: "Is OneFile really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely free with no hidden costs, no account required, and no usage limits. OneFile is open-source software released under the MIT license.",
          },
        },
      ],
    },
  ];

  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/android-chrome-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />

          <meta
            name="theme-color"
            content="#ffffff"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#09090b"
            media="(prefers-color-scheme: dark)"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          <meta
            property="og:image:secure_url"
            content={`${url}/seo-card.jpg`}
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
          <meta name="twitter:image:src" content={`${url}/seo-card.jpg`} />
          <meta
            name="twitter:image:alt"
            content="OneFile - Upload many files to AI as one single file"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </head>
        <body className={`${spaceGrotesk.className} ${inter.className} bg-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalNavbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
              success: {
                iconTheme: {
                  primary: "hsl(var(--primary))",
                  secondary: "hsl(var(--primary-foreground))",
                },
              },
            }}
          />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
