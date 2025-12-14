import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className="bg-card border border-border rounded-lg py-1.5 px-6 my-4">
      <p className="text-sm font-mono text-muted-foreground mb-0">
        {children}
      </p>
    </div>
  );
}
