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

const BASE_URL = "https://www.onefileapp.com";

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

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
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
      title: post.title,
      description: post.description,
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

  return (
    <div className="container max-w-6xl mx-auto sm:px-6 py-8">
      {/* Back Button */}
      <div className="mb-10">
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
        <p className="mb-7 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {post.description}
        </p>

        {/* Meta info */}
        <div className="mb-8 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <a href="#author" className="font-medium text-foreground hover:text-primary transition-colors">By {post.author}</a>
          <span>•</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-3 prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-lg prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-base prose-p:text-muted-foreground prose-p:leading-5 prose-p:mb-4 prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-strong:text-foreground prose-ul:my-4 prose-ul:space-y-1 prose-ol:my-4 prose-ol:space-y-1 prose-li:text-muted-foreground prose-li:leading-7 prose-li:my-0 prose-code:rounded-sm prose-code:bg-muted-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-muted-foreground prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border prose-pre:border-border prose-pre:bg-card prose-blockquote:border-l-2 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-muted-foreground">
          <BlogContent />
        </div>

        {/* Author Section */}
        <footer id="author" className="mt-12 border-t border-border pt-8 scroll-mt-24">
          <AuthorCard author={post.author} />
        </footer>
        </article>
      </div>
    </div>
  );
}
