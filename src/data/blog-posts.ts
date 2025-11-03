export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bypass-chatgpt-file-upload-limit-2025",
    title: "How to Bypass ChatGPT's 3-File Upload Limit (Complete Guide 2025)",
    description:
      "ChatGPT's 3-file upload limit is frustrating. Learn how to bypass it and upload unlimited files using OneFile - a free, open-source solution that combines multiple files into one.",
    publishedAt: "2025-01-15",
    author: "Mohamed Wahib ABKARI",
    readingTime: "8 min read",
    category: "Tutorials",
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
