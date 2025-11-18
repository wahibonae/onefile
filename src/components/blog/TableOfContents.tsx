"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface Heading {
  id: string;
  text: string;
}

export function TableOfContents(): JSX.Element {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract only H2 headings from the article (main sections only)
    const articleElement = document.querySelector("article");
    if (!articleElement) return;

    const headingElements = articleElement.querySelectorAll("h2");
    const headingData: Heading[] = [];

    headingElements.forEach((heading) => {
      let id = heading.id;

      // Generate ID if it doesn't exist
      if (!id) {
        id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "";
        heading.id = id;
      }

      if (heading.textContent) {
        headingData.push({
          id,
          text: heading.textContent,
        });
      }
    });

    setHeadings(headingData);

    // Scroll spy functionality
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 1.0,
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return (): void => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  const handleClick = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return <div />;
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Table of Contents
        </h3>
      </div>

      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={(): void => handleClick(heading.id)}
                className={`block w-full text-left transition-colors hover:text-primary ${
                  activeId === heading.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
