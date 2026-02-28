export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-file-upload-limits-compared",
    title:
      "AI File Upload Limits Compared: ChatGPT vs Claude vs Gemini vs Grok (2026)",
    description:
      "Side-by-side comparison of file upload limits for ChatGPT, Claude, Gemini, Grok, and Perplexity in 2026. Max file size, supported types, free vs paid limits, and how to bypass them all.",
    image: "/blog/ai-file-upload-limits-compared.webp",
    publishedAt: "2026-02-28",
    author: "Mohamed Wahib ABKARI",
    readingTime: "12 min read",
    tags: [
      "AI Tools",
      "File Upload Limits",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Grok",
      "Perplexity",
      "Comparison",
    ],
    featured: true,
  },
  {
    slug: "how-many-files-upload-chatgpt",
    title: "How Many Files Can You Upload to ChatGPT? (2026 Limits)",
    description:
      "ChatGPT Free: 3 files/day. Plus: ~80 files/3 hours. Pro: Unlimited. Complete breakdown of upload limits for every plan, plus how to upload more.",
    image: "/blog/how-many-files-chatgpt.webp",
    publishedAt: "2026-01-07",
    author: "Mohamed Wahib ABKARI",
    readingTime: "6 min read",
    tags: [
      "ChatGPT",
      "File Upload Limits",
      "ChatGPT Free",
      "ChatGPT Plus",
      "AI Tools",
    ],
    featured: false,
  },
  {
    slug: "chatgpt-file-upload-limits-2025",
    title: "ChatGPT File Upload Limits 2026: Complete Guide for Every Plan",
    description:
      "Complete breakdown of ChatGPT file upload limits for Free, Plus, Pro, Team, and Enterprise plans in 2026. Learn the exact limits and how to upload more files.",
    image: "/blog/chatgpt-file-upload-limits.webp",
    publishedAt: "2025-12-22",
    updatedAt: "2026-02-28",
    author: "Mohamed Wahib ABKARI",
    readingTime: "7 min read",
    tags: [
      "ChatGPT",
      "File Upload Limits",
      "AI Tools",
      "ChatGPT Plus",
      "ChatGPT Pro",
      "Productivity",
    ],
    featured: true,
  },
  {
    slug: "generate-code-documentation-ai-2025",
    title: "How to Generate Documentation from Code Using AI (2026 Guide)",
    description:
      "Generate code documentation with AI in minutes. Compare Mintlify, DocuWriter.ai, Cursor, Claude Code, and ChatGPT workflows with ready-to-use prompts.",
    image: "/blog/generate-code-docs-ai.webp",
    publishedAt: "2025-12-14",
    updatedAt: "2026-02-28",
    author: "Mohamed Wahib ABKARI",
    readingTime: "10 min read",
    tags: [
      "Documentation",
      "AI Tools",
      "Developer Productivity",
      "Code Documentation",
      "Mintlify",
      "ChatGPT",
    ],
    featured: true,
  },
  {
    slug: "chatgpt-github-import-free",
    title: "How to Import GitHub to ChatGPT For Free",
    description:
      "ChatGPT's GitHub connector requires Plus ($20/mo). Use OneFile to import any GitHub repository to ChatGPT for free. No account, no limits.",
    image: "/blog/chatgpt-github-import.webp",
    publishedAt: "2025-12-08",
    updatedAt: "2026-02-28",
    author: "Mohamed Wahib ABKARI",
    readingTime: "5 min read",
    tags: [
      "ChatGPT",
      "GitHub",
      "Free Tools",
      "Code Analysis",
      "AI Development",
    ],
    featured: false,
  },
  {
    slug: "bypass-chatgpt-file-upload-limit-2025",
    title: "ChatGPT File Upload Limit? Upload Unlimited Files (Free Fix 2026)",
    description:
      "Say goodbye to hitting ChatGPT's file upload limit. Combine unlimited files into one and upload instantly. Free tool, no account, works on Free & Plus plans.",
    image: "/blog/bypass-chatgpt-limit.webp",
    publishedAt: "2025-11-19",
    updatedAt: "2026-02-28",
    author: "Mohamed Wahib ABKARI",
    readingTime: "8 min read",
    tags: [
      "ChatGPT",
      "AI Upload Limits",
      "File Management",
      "Productivity",
      "Tutorial",
    ],
    featured: true,
  },
];
