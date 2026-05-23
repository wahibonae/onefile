import type { BlogPost } from "@/data/blog-posts";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps): React.JSX.Element {
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
