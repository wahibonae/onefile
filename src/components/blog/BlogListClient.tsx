import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps): React.JSX.Element {
  return (
    <>
      {/* Blog Posts Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition-colors group hover:border-primary/50">
                {/* Image Container */}
                <div className="relative aspect-[16/9] sm:aspect-[5/3] overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 dark:brightness-90"
                  />
                  {/* Featured Badge */}
                  {post.featured && (
                    <span className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-md bg-primary px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-semibold text-primary-foreground">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {/* Author */}
                  <div className="mb-2 sm:mb-3">
                    <span className="inline-flex items-center rounded-full bg-muted px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-muted-foreground">
                      {post.author.split(" ")[0]}{" "}
                      {post.author.split(" ")[1]?.[0]}.
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-1.5 sm:mb-2 line-clamp-2 text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground/80">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1.5 sm:pt-2">
                    <time className="text-xs sm:text-sm text-muted-foreground/50">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground transition-all group-hover:gap-1 group-hover:text-primary">
                      Read
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
      </div>
    </>
  );
}
