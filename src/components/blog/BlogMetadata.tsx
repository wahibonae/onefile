import { Calendar, Clock } from "lucide-react";

interface BlogMetadataProps {
  publishedAt: string;
  readingTime: string;
  updatedAt?: string;
}

export function BlogMetadata({
  publishedAt,
  readingTime,
  updatedAt,
}: BlogMetadataProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Post Details
      </h3>

      <div className="space-y-3">
        {/* Reading Time */}
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Reading Time</div>
            <div className="text-sm font-medium">{readingTime}</div>
          </div>
        </div>

        {/* Published Date */}
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-xs text-muted-foreground">Published</div>
            <div className="text-sm font-medium">{formatDate(publishedAt)}</div>
          </div>
        </div>

        {/* Updated Date (if exists) */}
        {updatedAt && (
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Last Updated</div>
              <div className="text-sm font-medium">{formatDate(updatedAt)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
