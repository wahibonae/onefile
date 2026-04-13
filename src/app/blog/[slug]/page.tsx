import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const BASE_URL = "https://onefileapp.com";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${BASE_URL}/blog/${slug}`;

  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.description;

  return {
    title: seoTitle,
    description: seoDescription,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${BASE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@wahibonae",
      creator: "@wahibonae",
      title: seoTitle,
      description: seoDescription,
      images: [`${BASE_URL}${post.image}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Dynamic import of blog content
  const { default: BlogContent } = await import(`@/content/blog/${slug}`);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if this post was updated this month (for showing "Updated" badge)
  const isRecentlyUpdated = (): boolean => {
    if (!post.updatedAt || post.updatedAt === post.publishedAt) return false;
    const updatedDate = new Date(post.updatedAt);
    const now = new Date();
    return (
      updatedDate.getMonth() === now.getMonth() &&
      updatedDate.getFullYear() === now.getFullYear()
    );
  };

  // Format relative time (e.g., "3 days ago", "2 weeks ago")
  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return "1 month ago";
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // FAQ schema for blog posts with FAQ sections
  const faqSchemaMap: Record<string, Array<{ question: string; answer: string }>> = {
    "chatgpt-file-upload-limit-error": [
      { question: "What does \"You've reached our limit of file uploads\" mean?", answer: "It means you've exceeded the maximum number of files your ChatGPT plan allows. Free: 3 files/day. Plus: ~80 files/3 hours. Pro: unlimited. You need to wait for the limit to reset, or paste your content directly instead of uploading files." },
      { question: "How long until I can upload again?", answer: "Free users wait 24 hours. Plus/Team users wait 1-3 hours (rolling window). Or skip the wait: use OneFile (onefileapp.com) to combine your files, copy the merged content, and paste it directly into ChatGPT's message box. Pasting text bypasses the upload limit." },
      { question: "Does this error mean my account is restricted?", answer: "No. This is a normal rate limit, not a restriction or ban. Every ChatGPT user has upload limits based on their plan. Your account is fine." },
      { question: "Why do I see this error on ChatGPT Plus?", answer: "Plus has a limit of ~80 files per 3-hour rolling window and 10 files per message. If you're uploading many files for a large project, you can hit this limit. Combine your files before uploading to avoid it." },
      { question: "Can I upload more files if I clear my chat history?", answer: "No. Deleting conversations doesn't reset your upload limit. The limit is based on uploads over time (daily for Free, 3-hour window for Plus), not on how many conversations you have." },
      { question: "Is there a way to send unlimited files to ChatGPT for free?", answer: "Yes. Use OneFile (onefileapp.com) to merge your files, then copy the combined content and paste it directly into ChatGPT. Pasting text bypasses the file upload limit entirely, so there's no cap." },
    ],
    "bypass-chatgpt-file-upload-limit-2025": [
      { question: "Does this work with ChatGPT Plus?", answer: "Yes. Plus users bypass both the 10-file per message limit and the ~80 files per 3-hour window limit. Upload unlimited content in one file." },
      { question: "Will this work with Claude or Gemini?", answer: "Yes. OneFile's output works with all AI platforms: Claude, Gemini, Grok, Perplexity, and any LLM." },
      { question: "Is my data private?", answer: "Yes. Text files are processed in your browser and never reach our servers. Complex documents (PDFs, DOCX) are sent to our API for extraction, then immediately deleted. OneFile is open source." },
      { question: "Can I upload an entire GitHub repository?", answer: "Yes. Sign in with GitHub and import any repository. OneFile respects .gitignore and skips node_modules, .git, and build artifacts." },
      { question: "How large can the combined file be?", answer: "No limit in OneFile, but ChatGPT has a ~128K token context window. Keep combined files under 1-2MB for best results." },
      { question: "What file types are supported?", answer: "50+ file types including PDFs, Microsoft Office (DOCX, PPTX, XLSX), code files (JS, TS, PY, Java, Go, Rust, Ruby, PHP, C, C++), web files (HTML, CSS, JSON, XML, YAML), data files (CSV, TSV, SQL), and config files." },
      { question: "Does this violate ChatGPT's Terms of Service?", answer: "No. You're uploading a single text file, which is allowed. The file just contains content from multiple sources." },
    ],
    "ai-file-upload-limits-compared": [
      { question: "Which AI allows the most file uploads for free?", answer: "Google Gemini allows 10 files per prompt on the free plan, the most of any platform. However, it doesn't support code files or spreadsheets on the free tier. ChatGPT Free allows only 3 files per day but supports all file types." },
      { question: "What AI has unlimited file uploads?", answer: "ChatGPT Pro ($200/month) is the only plan with truly unlimited file uploads. Perplexity Pro ($20/mo) offers unlimited daily uploads but caps at 10 files per prompt. For a free alternative, use OneFile to combine unlimited files into one upload." },
      { question: "Can I upload a folder to ChatGPT, Claude, or Gemini?", answer: "No. None of the major AI platforms support direct folder uploads. You must select files individually. To upload entire folders or projects, use OneFile to combine the folder contents into a single file first." },
      { question: "Which AI has the largest file size limit?", answer: "ChatGPT allows files up to 512 MB, the largest of any AI platform. Gemini allows 100 MB (2 GB for video), Grok caps at 48 MB, Perplexity at ~50 MB, and Claude at 30 MB." },
      { question: "What file types does every AI support?", answer: "PDF, TXT, and images (JPEG, PNG) are supported by all 5 platforms. DOCX is supported by all except some Grok surfaces. CSV is universally supported. XLSX, PPTX, and code files have varying support across platforms." },
      { question: "Is there a free AI with unlimited uploads?", answer: "No AI platform offers unlimited free uploads. The closest is Gemini Free (10 files/prompt) but with file type restrictions. The practical solution is using OneFile to combine unlimited files into a single upload — it's free and works on every platform." },
      { question: "ChatGPT vs Claude: which is better for file uploads?", answer: "ChatGPT has higher file size limits (512 MB vs 30 MB) and more uploads per day (~80 vs 20). Claude has a larger context window (200K vs 128K tokens), meaning it can read more text content at once. For large individual files, choose ChatGPT. For analyzing lots of text content, choose Claude." },
    ],
    "how-many-files-upload-chatgpt": [
      { question: "How many files can I upload to ChatGPT for free?", answer: "ChatGPT Free allows 3 file uploads per day. The limit resets every 24 hours." },
      { question: "How many files can ChatGPT Plus users upload?", answer: "ChatGPT Plus users can upload approximately 80 files per 3-hour rolling window, with a maximum of 10 files per message." },
      { question: "Why does ChatGPT say 'You've reached your file upload limit'?", answer: "This error appears when you've hit your plan's upload cap. Free users see it after 3 files per day. Plus users see it after ~80 files in 3 hours." },
      { question: "Can I upload a folder to ChatGPT?", answer: "No, ChatGPT doesn't support folder uploads directly. You need to select files individually. However, you can use OneFile to upload entire folders, combine them into one file, and then upload that to ChatGPT." },
      { question: "What's the maximum file size for ChatGPT?", answer: "512MB per file for documents, 20MB for images, and 50MB for spreadsheets. These limits apply to all plans." },
      { question: "How do I upload more than 10 files to ChatGPT at once?", answer: "ChatGPT limits you to 10 files per message. To upload more at once, combine your files into a single file using OneFile, then upload that one file containing all your content." },
      { question: "Does ChatGPT Pro really have unlimited uploads?", answer: "Yes, ChatGPT Pro ($200/month) has no explicit file upload limits. However, OpenAI may throttle extreme usage to prevent abuse." },
    ],
  };

  const faqSchema = faqSchemaMap[slug]
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        name: post.title,
        mainEntity: faqSchemaMap[slug].map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  // HowTo schema for the bypass blog post
  const howToSchema =
    slug === "bypass-chatgpt-file-upload-limit-2025"
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Upload More Than 3 Files to ChatGPT",
          description:
            "Step-by-step guide to bypass ChatGPT's file upload limits using OneFile",
          totalTime: "PT2M",
          tool: {
            "@type": "SoftwareApplication",
            name: "OneFile",
            url: "https://onefileapp.com",
            applicationCategory: "WebApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Go to OneFile",
              text: "Visit onefileapp.com in your browser. No downloads or account needed.",
              url: "https://onefileapp.com",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Upload your files",
              text: "Drag and drop your files or folders into OneFile. You can also import directly from GitHub.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Download combined file",
              text: "Click 'Download' to save all your files as a single .txt file.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Upload to ChatGPT",
              text: "Upload the single combined file to ChatGPT and ask questions about any of your files.",
            },
          ],
        }
      : null;

  // Article schema for all blog posts
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.linkedin.com/in/abkarimohamedwahib/",
    },
    publisher: {
      "@type": "Organization",
      name: "OneFile",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
  };

  return (
    <>
      {/* Structured Data - separate script tags for each schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <div className="container max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <div className="lg:grid lg:grid-cols-[210px_1fr] lg:gap-8 xl:grid-cols-[230px_1fr] xl:gap-10">
          {/* Left Sidebar - Table of Contents (hidden on mobile/tablet) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>

          {/* Main Content */}
          <article className="min-w-0">
            {/* Title */}
            <h1 className="mb-7 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="mb-7 text-md leading-relaxed text-muted-foreground sm:text-xl">
              {post.description}
            </p>

            {/* Meta info */}
            <div className="mb-8 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <a
                href="#author"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                By {post.author}
              </a>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              {isRecentlyUpdated() && (
                <>
                  <span>•</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Updated {getRelativeTime(post.updatedAt!)}
                  </span>
                </>
              )}
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>

            {/* Blog Image */}
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-3 prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-lg prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-base prose-p:text-muted-foreground prose-p:leading-6 prose-p:mb-4 prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-strong:text-foreground/80 prose-ul:my-4 prose-ul:space-y-1 prose-ol:my-4 prose-ol:space-y-1 prose-li:text-muted-foreground prose-li:leading-7 prose-li:my-0 prose-code:rounded-sm prose-code:bg-muted-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-muted-foreground prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border prose-pre:border-border prose-pre:bg-card prose-blockquote:border-l-2 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-muted-foreground">
              <BlogContent />
            </div>

            {/* Author Section */}
            <footer
              id="author"
              className="mt-12 border-t border-border pt-8 scroll-mt-24"
            >
              <AuthorCard author={post.author} />
            </footer>
          </article>
        </div>
      </div>
    </>
  );
}
