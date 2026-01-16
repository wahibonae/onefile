"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GitHub from "@/components/icons/Github";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const GITHUB_REPO = "wahibonae/onefile";
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

interface GitHubStarsButtonProps {
  className?: string;
  showText?: boolean;
}

export function GitHubStarsButton({
  className,
  showText = true,
}: GitHubStarsButtonProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // Check sessionStorage cache first
        const cached = sessionStorage.getItem("github-stars");
        const cachedTime = sessionStorage.getItem("github-stars-time");

        if (cached && cachedTime) {
          const age = Date.now() - parseInt(cachedTime, 10);
          // Use cache if less than 5 minutes old
          if (age < 5 * 60 * 1000) {
            setStars(parseInt(cached, 10));
            return;
          }
        }

        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}`
        );
        if (response.ok) {
          const data = await response.json();
          const starCount = data.stargazers_count;
          setStars(starCount);

          // Cache the result
          sessionStorage.setItem("github-stars", starCount.toString());
          sessionStorage.setItem("github-stars-time", Date.now().toString());
        }
      } catch {
        // Silently fail - just show the button without count
      }
    };

    fetchStars();
  }, []);

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return count.toString();
  };

  return (
    <Button
      variant="outline"
      size={showText ? "default" : "icon"}
      className={cn(className, "px-3")}
      asChild
    >
      <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <GitHub className="h-4 w-4" />
        {showText && stars !== null && (
            <span className="tabular-nums">{formatStars(stars)}</span>
        )}
      </Link>
    </Button>
  );
}
