import { Metadata } from "next";
import FAQContent from "./FAQContent";
import { faqs } from "./faq-data";

export const metadata: Metadata = {
  title: "ChatGPT Upload Limit FAQ (2026): How Many Files Can You Upload?",
  description:
    "Answers to every ChatGPT upload question. Free: 3 files/day. Plus: ~80/3hrs (10 per message). Pro: Unlimited. Includes a free workaround to upload unlimited files to any AI.",
  keywords: [
    "ChatGPT file upload limit",
    "ChatGPT Plus file upload limit",
    "ChatGPT Go upload limit",
    "ChatGPT free upload limit",
    "how many files ChatGPT",
    "ChatGPT upload limit bypass",
    "AI unlimited file upload",
    "you've reached our limit of file uploads",
    "chatgpt reached limit of file uploads",
  ],
  openGraph: {
    title: "ChatGPT Upload Limit FAQ (2026): How Many Files Can You Upload?",
    description:
      "Answers to every ChatGPT upload question. Free: 3/day. Plus: ~80/3hrs. Pro: Unlimited. Plus a free workaround to bypass limits.",
    type: "website",
    url: "https://onefileapp.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Upload Limit FAQ (2026): How Many Files Can You Upload?",
    description:
      "Free: 3/day. Plus: ~80/3hrs. Pro: Unlimited. Every ChatGPT upload limit answered, plus a free bypass.",
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
