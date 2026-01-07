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
    slug: "chatgpt-file-upload-limits-2025",
    title: "ChatGPT File Upload Limits 2025: Complete Guide for Every Plan",
    description:
      "Complete breakdown of ChatGPT file upload limits for Free, Plus, Pro, Team, and Enterprise plans. Learn the exact limits and how to upload more files.",
    image: "/blog/chatgpt-file-upload-limits.png",
    publishedAt: "2025-12-22",
    updatedAt: "2026-01-07",
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
    title: "How to Generate Documentation from Code Using AI (2025 Guide)",
    description:
      "Generate code documentation with AI in minutes. Compare Mintlify, DocuWriter.ai, Cursor, Claude Code, and ChatGPT workflows with ready-to-use prompts.",
    image: "/blog/generate-code-docs-ai.png",
    publishedAt: "2025-12-14",
    updatedAt: "2025-12-14",
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
    image: "/blog/chatgpt-github-import.png",
    publishedAt: "2025-12-08",
    updatedAt: "2026-01-07",
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
    image: "/blog/bypass-chatgpt-limit.png",
    publishedAt: "2025-11-19",
    updatedAt: "2026-01-07",
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
