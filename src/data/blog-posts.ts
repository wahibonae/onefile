export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** SEO-optimized title for <title> tag and OG/Twitter. Falls back to `title` if not set. */
  metaTitle?: string;
  /** SEO-optimized description for meta description and OG/Twitter. Falls back to `description` if not set. */
  metaDescription?: string;
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
    slug: "chatgpt-file-upload-limit-error",
    title:
      "\"You've Reached Our Limit of File Uploads\" on ChatGPT: How to Fix It",
    description:
      "Getting the \"You've reached our limit of file uploads\" error on ChatGPT? Here's why it happens, when the limit resets, and how to keep working instantly without waiting.",
    metaTitle:
      "\"You've Reached Our Limit of File Uploads\": ChatGPT Fix (2026)",
    metaDescription:
      "ChatGPT says \"You've reached our limit of file uploads\"? Free: resets in 24hrs. Plus: 1-3hrs. Or fix it now: merge your files and paste them into ChatGPT directly.",
    image: "/blog/chatgpt-upload-limit-error.webp",
    publishedAt: "2026-03-15",
    author: "Mohamed Wahib ABKARI",
    readingTime: "5 min read",
    tags: [
      "ChatGPT",
      "File Upload Limits",
      "Troubleshooting",
      "Error Fix",
      "AI Tools",
    ],
    featured: true,
  },
  {
    slug: "ai-file-upload-limits-compared",
    title:
      "AI File Upload Limits Compared: ChatGPT vs Claude vs Gemini vs Grok (2026)",
    description:
      "Side-by-side comparison of file upload limits for ChatGPT, Claude, Gemini, Grok, and Perplexity in 2026. Max file size, supported types, free vs paid limits, and how to bypass them all.",
    metaTitle:
      "AI Upload Limits Compared (2026): Which AI Lets You Upload the Most?",
    metaDescription:
      "Which AI has unlimited uploads? We compared ChatGPT, Claude, Gemini, Grok & Perplexity file limits side by side. See the winner, plus a free tool to bypass them all.",
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
    metaTitle:
      "How Many Files Can You Upload to ChatGPT? (Free: 3, Plus: 80, Pro: Unlimited)",
    metaDescription:
      "ChatGPT Free: 3 files/day. Plus: ~80 per 3 hours. Pro: Unlimited. Exact 2026 upload limits for every ChatGPT plan, and a free workaround to upload more.",
    image: "/blog/how-many-files-chatgpt.webp",
    publishedAt: "2026-01-07",
    updatedAt: "2026-04-22",
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
    slug: "generate-code-documentation-ai-2025",
    title: "How to Generate Documentation from Code Using AI (2026 Guide)",
    description:
      "Generate code documentation with AI in minutes. Compare Mintlify, DocuWriter.ai, Cursor, Claude Code, and ChatGPT workflows with ready-to-use prompts.",
    metaTitle:
      "Generate Code Documentation with AI in Minutes (2026 Guide)",
    metaDescription:
      "Turn your codebase into documentation automatically. We compare Mintlify, DocuWriter.ai, Cursor, Claude Code & ChatGPT, with ready-to-use prompts for each.",
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
    metaTitle:
      "Import GitHub Repos to ChatGPT for Free (No Plus Required)",
    metaDescription:
      "ChatGPT's GitHub connector needs Plus ($20/mo). Skip it, import any GitHub repo to ChatGPT for free with OneFile. No account, no file limits, 30 seconds.",
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
    metaTitle:
      "How to Bypass ChatGPT's File Upload Limit (Free Fix, 30 Seconds)",
    metaDescription:
      "Hit ChatGPT's 3-file limit? Here's the free fix: combine unlimited files into one upload in 30 seconds. Works on Free & Plus plans. No account needed.",
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
