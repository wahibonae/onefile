import { Metadata } from "next";
import FAQContent from "./FAQContent";
import { faqs } from "./faq-data";

export const metadata: Metadata = {
  title: "ChatGPT File Upload Limits 2026 | Free: 3/day, Plus: 80/3hrs, Pro: Unlimited",
  description:
    "What is ChatGPT's file upload limit? Free: 3 files/day. Plus: ~80 files per 3 hours (10 per message). Pro: Unlimited. Complete FAQ with exact limits for every plan and how to bypass them for free.",
  keywords: [
    "ChatGPT file upload limit",
    "ChatGPT Plus file upload limit",
    "ChatGPT Go upload limit",
    "ChatGPT free upload limit",
    "how many files ChatGPT",
    "ChatGPT upload limit bypass",
    "AI unlimited file upload",
  ],
  openGraph: {
    title: "ChatGPT File Upload Limits 2026 | Free, Plus, Pro Limits",
    description:
      "What is ChatGPT's file upload limit? Free: 3/day. Plus: ~80/3hrs. Pro: Unlimited. Complete FAQ with how to bypass limits for free.",
    type: "website",
    url: "https://onefileapp.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT File Upload Limits 2026 | Free, Plus, Pro",
    description:
      "Free: 3/day. Plus: ~80/3hrs. Pro: Unlimited. FAQ with exact limits for every ChatGPT plan.",
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
  ).slice(0, 15);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
