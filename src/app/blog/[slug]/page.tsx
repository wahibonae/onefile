"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogMetadata } from "@/components/blog/BlogMetadata";
import { AuthorCard } from "@/components/blog/AuthorCard";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Import the blog post content dynamically
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const BlogContent = require(`@/content/blog/${slug}.tsx`).default;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div>
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left Column - Article Content */}
          <article className="min-w-0">
            {/* Article Header */}
            <header className="mb-10">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-muted-foreground">
                {post.description}
              </p>
            </header>

            {/* Article Content */}
            <div className="prose prose-neutral mx-auto max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-ul:my-6 prose-li:my-2 prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border prose-pre:border-border prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:font-normal prose-blockquote:not-italic">
              <BlogContent />
            </div>

            {/* Tags Section */}
            <footer className="mt-12 border-t border-border pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>

          {/* Right Column - Sticky Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <div className="space-y-6">
              {/* Table of Contents */}
              <TableOfContents />

              {/* Blog Metadata */}
              <BlogMetadata
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
                category={post.category}
                updatedAt={post.updatedAt}
              />

              {/* Share Buttons */}
              <ShareButtons title={post.title} slug={post.slug} />

              {/* Author Card */}
              <AuthorCard author={post.author} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
