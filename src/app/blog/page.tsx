import { blogPosts } from "@/data/blog-posts";
import { BlogListClient } from "@/components/blog/BlogListClient";

export default function BlogPage(): React.JSX.Element {
  return (
    <div className="container max-w-5xl mx-auto px-6 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">
          OneFile Blog
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
          Tutorials, guides, and tips for bypassing AI upload limits and working
          smarter with ChatGPT, Claude, and Gemini.
        </p>
      </div>

      {/* Blog List with Client-Side Filtering */}
      <BlogListClient posts={blogPosts} />
    </div>
  );
}
