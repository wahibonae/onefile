import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact";
}

export function BlogCard({
  post,
  variant = "default",
}: BlogCardProps): React.JSX.Element {
  const isCompact = variant === "compact";

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article
        className={`flex h-full flex-col overflow-hidden border border-border bg-card transition-colors group hover:border-primary/50 ${
          isCompact ? "rounded-lg" : "rounded-xl sm:rounded-2xl"
        }`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-muted ${
            isCompact ? "aspect-[16/9]" : "aspect-[16/9] sm:aspect-[5/3]"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 dark:brightness-90"
          />
          {post.featured && !isCompact && (
            <span className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-md bg-primary px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-semibold text-primary-foreground">
              FEATURED
            </span>
          )}
        </div>

        {/* Content */}
        <div
          className={`flex flex-1 flex-col ${isCompact ? "p-3.5" : "p-4 sm:p-5"}`}
        >
          {/* Author (default only) */}
          {!isCompact && (
            <div className="mb-2 sm:mb-3">
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-muted-foreground">
                {post.author.split(" ")[0]}{" "}
                {post.author.split(" ")[1]?.[0]}.
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className={`line-clamp-2 font-bold tracking-tight text-foreground group-hover:text-primary transition-colors ${
              isCompact
                ? "mb-1 text-sm"
                : "mb-1.5 sm:mb-2 text-base sm:text-lg"
            }`}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p
            className={`flex-1 leading-relaxed text-muted-foreground/80 ${
              isCompact
                ? "mb-2 line-clamp-2 text-xs"
                : "mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm"
            }`}
          >
            {post.description}
          </p>

          {/* Footer */}
          <div
            className={`flex items-center justify-between ${
              isCompact ? "" : "pt-1.5 sm:pt-2"
            }`}
          >
            <time
              className={`text-muted-foreground/50 ${
                isCompact ? "text-[11px]" : "text-xs sm:text-sm"
              }`}
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span
              className={`inline-flex items-center font-semibold text-muted-foreground transition-all group-hover:text-primary ${
                isCompact
                  ? "gap-1 text-[11px] group-hover:gap-0.5"
                  : "gap-1 sm:gap-1.5 text-xs sm:text-sm group-hover:gap-1"
              }`}
            >
              Read
              <ArrowRight
                className={isCompact ? "h-3 w-3" : "h-3.5 w-3.5 sm:h-4 sm:w-4"}
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
