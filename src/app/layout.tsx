import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
  "OneFile - Upload Unlimited Files to ChatGPT | Free AI File Tool";
const description =
  "ChatGPT limits you to 3 files? Combine unlimited files into one and upload to any AI. Free, no account, works with PDFs, code, docs.";
const url = "https://onefileapp.com";

export const metadata: Metadata = {
  title,
  description,
  robots: "index, follow",
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
    site: "@wahibonae",
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
        "OneFile - Bypass ChatGPT Upload Limits | Free AI File Tool",
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
        sameAs: [
          "https://github.com/wahibonae/onefile",
          "https://www.linkedin.com/company/onefileapp/",
        ],
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
        "Text content import",
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
      "@type": "Organization",
      name: "OneFile",
      alternateName: "OneFileApp",
      url: url,
      logo: {
        "@type": "ImageObject",
        url: `${url}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
      image: `${url}/seo-card.jpg`,
      description: description,
      foundingDate: "2025",
      founder: {
        "@type": "Person",
        name: "Mohamed Wahib ABKARI",
        url: "https://www.linkedin.com/in/abkarimohamedwahib/",
      },
      sameAs: [
        "https://github.com/wahibonae/onefile",
        "https://www.linkedin.com/company/onefileapp/",
        "https://twitter.com/wahibonae",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${url}/contact`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mohamed Wahib ABKARI",
      jobTitle: "AI Engineer",
      url: "https://www.linkedin.com/in/abkarimohamedwahib/",
      sameAs: [
        "https://github.com/wahibonae",
        "https://twitter.com/wahibonae",
        "https://www.linkedin.com/in/abkarimohamedwahib/",
      ],
    },
  ];

  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
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
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="9ea2fab0-bc2c-4b56-987d-f3c1ddc3267c"
          />
        </head>
        <body className={`${spaceGrotesk.className} ${inter.className} bg-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:top-4 focus:left-4 focus:rounded-md"
            >
              Skip to main content
            </a>
            <ConditionalNavbar />
            <main id="main-content">
              {children}
            </main>
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
        </body>
      </html>
    </ClerkProvider>
  );
}
