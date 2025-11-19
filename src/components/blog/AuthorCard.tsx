import Link from "next/link";
import GitHub from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import X from "@/components/icons/X";

interface AuthorCardProps {
  author: string;
}

// Author information - can be extended to support multiple authors in the future
const authorInfo: Record<
  string,
  {
    bio: string;
    github: string;
    twitter: string;
    linkedin: string;
  }
> = {
  "Mohamed Wahib ABKARI": {
    bio: "Developer and creator of OneFile. Building tools to make working with AI easier and more efficient.",
    github: "https://github.com/wahibonae",
    twitter: "https://twitter.com/wahibonae",
    linkedin: "https://www.linkedin.com/in/abkarimohamedwahib/",
  },
};

export function AuthorCard({ author }: AuthorCardProps) {
  const info = authorInfo[author];

  if (!info) {
    return <div />;
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        About the Author
      </h3>

      <div className="space-y-3">
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {info.bio}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href={info.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <GitHub className="h-5 w-5" />
          </Link>
          <Link
            href={info.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <X className="h-5 w-5" />
          </Link>
          <Link
            href={info.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
