"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const allCategories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="container max-w-5xl mx-auto py-6 sm:py-8 lg:py-12 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          OneFile Blog
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Tutorials, guides, and tips for bypassing AI upload limits and working
          smarter with ChatGPT, Claude, and Gemini.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {allCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="rounded-full"
            onClick={(): void => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors group hover:border-primary/50">
                {/* Image Container */}
                <div className="relative aspect-[5/3] overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Featured Badge */}
                  {post.featured && (
                    <span className="absolute right-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Author */}
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {post.author.split(" ")[0]}{" "}
                      {post.author.split(" ")[1]?.[0]}.
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground/80">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2">
                    <time className="text-sm text-muted-foreground/50">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-all group-hover:gap-1 group-hover:text-primary">
                      Read
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
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
    </div>
  );
}
