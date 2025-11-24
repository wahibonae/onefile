export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
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
      "Bypass ChatGPT's 3-file limit with OneFile. Upload unlimited files to AI platforms - free, open-source, no account required.",
    image: "/blog/bypass-chatgpt-limit.png",
    publishedAt: "2025-11-19",
    updatedAt: "2025-11-19",
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
    featured: false,
  },
];
