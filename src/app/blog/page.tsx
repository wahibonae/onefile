"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Tag,
  TrendingUp,
} from "lucide-react";
import { blogPosts } from "@/data/blog-posts";


export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const allCategories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            OneFile Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tutorials, guides, and tips for bypassing AI upload limits and
            working smarter with ChatGPT, Claude, and Gemini.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" className="rounded-full">
              All Posts
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                Featured Article
              </h2>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all hover:shadow-lg">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readingTime}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {featuredPost.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-background border border-border rounded text-xs text-muted-foreground"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Button>
                  Read Full Article
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </Link>
          </section>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <div key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-all hover:shadow-md">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                      <div className="text-primary text-sm font-medium">
                        Read more →
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Posts State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No blog posts yet. Check back soon for tutorials and guides!
            </p>
            <Link href="/">
              <Button>Try OneFile Now</Button>
            </Link>
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Never Miss an Update
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get notified when we publish new tutorials, guides, and tips for
              bypassing AI upload limits and maximizing your productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://twitter.com/wahibonae"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Follow on Twitter</Button>
              </a>
              <a
                href="https://github.com/wahibonae/onefile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Star on GitHub</Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
