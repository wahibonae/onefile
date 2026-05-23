import { Metadata } from "next";
import FAQContent from "./FAQContent";
import { faqs } from "./faq-data";

export const metadata: Metadata = {
  title: "ChatGPT Upload Limits 2026: Free, Go, Plus, Pro (Full FAQ)",
  description:
    "How many files can you upload to ChatGPT? Free: 3/day. Go: extended. Plus: ~80 files/3hrs. Pro: unlimited. 2026 limits for every plan, plus a free way to upload more.",
  keywords: [
    "ChatGPT file upload limit",
    "ChatGPT Plus file upload limit",
    "ChatGPT Go upload limit",
    "ChatGPT Pro upload limit",
    "ChatGPT free upload limit",
    "how many files ChatGPT",
    "how many uploads chatgpt go",
    "AI unlimited file upload",
    "you've reached our limit of file uploads",
    "chatgpt reached limit of file uploads",
  ],
  openGraph: {
    title: "ChatGPT Upload Limits 2026: Free, Go, Plus, Pro (Full FAQ)",
    description:
      "How many files can you upload to ChatGPT? Free: 3/day. Go: extended. Plus: ~80/3hrs. Pro: unlimited. Every plan's 2026 limits, plus a free workaround.",
    type: "website",
    url: "https://onefileapp.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Upload Limits 2026: Free, Go, Plus, Pro (Full FAQ)",
    description:
      "Free: 3/day. Go: extended. Plus: ~80/3hrs. Pro: unlimited. Every ChatGPT upload limit answered, plus a free workaround.",
  },
  alternates: {
    canonical: "https://onefileapp.com/faq",
  },
};

// Generate FAQ Schema for rich results
function generateFAQSchema() {
  // Select the most SEO-relevant questions for the schema (limit to ~10-15 for best results)
  const seoQuestions = faqs.filter((faq) =>
    faq.category === "ChatGPT Limits" ||
    faq.question.toLowerCase().includes("chatgpt") ||
    faq.question.toLowerCase().includes("upload") ||
    faq.question.toLowerCase().includes("unlimited")
  ).slice(0, 8);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://onefileapp.com/faq#faq",
    name: "ChatGPT Upload Limit FAQ (2026): How Many Files Can You Upload?",
    url: "https://onefileapp.com/faq",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://onefileapp.com/faq",
    },
    mainEntity: seoQuestions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function FAQPage() {
  const faqSchema = generateFAQSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQContent />
    </>
  );
}
