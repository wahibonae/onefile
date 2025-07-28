import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function InfoDialog() {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="text-foreground/80 border-border/40 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200"
      asChild
    >
      <Link href="/about">
        <Info className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">About OneFile</span>
      </Link>
    </Button>
  );
}
