"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Check,
} from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { useState } from "react";


interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    notFound();
  }

  const shareUrl = `https://www.onefileapp.com/blog/${slug}`;

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Import the blog post content dynamically
  const BlogContent = require(`@/content/blog/${slug}.tsx`).default;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Article Header */}
        <article>
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          {/* Author & Share */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                By{" "}
                <span className="font-medium text-foreground">
                  {post.author}
                </span>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Share
                </>
              )}
            </Button>
          </div>

          {/* Blog Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <BlogContent />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-card border border-border rounded-full text-sm text-muted-foreground hover:border-primary/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Author Bio */}
        <section className="mt-12 bg-card border border-border rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-2">
                About {post.author}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Developer and creator of OneFile. Passionate about building
                tools that solve real problems for developers, students, and
                professionals working with AI platforms.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com/wahibonae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/wahibonae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/abkarimohamedwahib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Bypass AI Upload Limits?
            </h2>
            <p className="text-muted-foreground mb-6">
              Try OneFile now and combine unlimited files for ChatGPT, Claude,
              and Gemini in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button size="lg" className="px-8">
                  Try OneFile - Free
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="px-8">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
