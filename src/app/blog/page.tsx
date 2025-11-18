"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const featuredPost = blogPosts.find((post) => post.featured);
  const allCategories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === "All") return !post.featured;
    return post.category === selectedCategory && !post.featured;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            OneFile Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Tutorials, guides, and tips for bypassing AI upload limits and
            working smarter with ChatGPT, Claude, and Gemini.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={(): void => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && (
          <section className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-all hover:border-primary/40 hover:shadow-xl">
                <div className="p-6 sm:p-8">
                  {/* Metadata */}
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <time>
                        {new Date(featuredPost.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readingTime}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 text-base sm:text-lg text-muted-foreground">
                    {featuredPost.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 font-semibold text-primary transition-colors group-hover:gap-3">
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* All Posts Grid */}
        {filteredPosts.length > 0 ? (
          <section>
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              {selectedCategory === "All"
                ? "Latest Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold tracking-tight">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
                      {post.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:gap-3">
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No articles found in this category yet.
            </p>
            <Button
              variant="outline"
              onClick={(): void => setSelectedCategory("All")}
            >
              View All Posts
            </Button>
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="mt-20">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-10">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
              Stay Updated
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Follow us on social media to get notified when we publish new
              tutorials and guides.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="outline" asChild>
                <a
                  href="https://twitter.com/wahibonae"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Twitter
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/wahibonae/onefile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
