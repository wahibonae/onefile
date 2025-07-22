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

const title = "OneFile - Upload many files to AI as one single file";
const description = "Combine multiple files into one AI-ready file. No more file upload limits or file size limits. Perfect for students, professionals, researchers, and anyone who needs to merge files for AI platforms like ChatGPT, Gemini, and Deepseek.";
const url = "https://onefileapp.com";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "onefile",
    "multiple files",
    "one file",
    "file merger",
    "AI prompt generator",
    "combine files",
    "merge documents",
    "PDF merger",
    "CSV combiner",
    "AI file processor",
    "ChatGPT upload",
    "Claude assistant",
    "Gemini helper",
    "student tools",
    "research tools",
    "business tools",
    "document merger",
    "file converter",
    "AI tools",
    "study helper",
    "meeting prep",
    "thesis helper"
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
        alt: "OneFile - Upload many files to AI as one single file"
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
  category: "productivity",
  classification: "File Management Tools"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured data for brand recognition
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OneFile",
    "alternateName": ["OneFile", "OneFile - Upload many files to AI as one single file"],
    "url": url,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OneFile",
      "url": url,
      "logo": {
        "@type": "ImageObject",
        "url": `${url}/android-chrome-512x512.png`,
        "width": 512,
        "height": 512
      }
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        <meta property="og:image:secure_url" content={`${url}/seo-card.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta name="twitter:image:src" content={`${url}/seo-card.jpg`} />
        <meta name="twitter:image:alt" content="OneFile - Upload many files to AI as one single file" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={`${spaceGrotesk.className} ${inter.className}`}>
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