"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubStarsButton } from "@/components/GitHubStarsButton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="bg-transparent container max-w-6xl mx-auto px-6 pt-6 sm:pt-10 sm:pb-7">
      <div className="flex items-start justify-between">
        {/* Logo - Left Side */}
        <Link
          href="/"
          className="flex items-center space-x-1.5 sm:space-x-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="p-1 sm:p-1.5 rounded-sm sm:rounded-lg bg-primary/10">
            <span className="flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 text-primary font-bold text-xl sm:text-2xl">
              1
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            OneFile
          </span>
        </Link>

        {/* Controls - Right Side */}
        <div className="flex flex-col items-end gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <Button
                variant="ghost"
                className="px-3 text-foreground/80 border-border/40 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200"
                asChild
              >
                <Link href="/">Home</Link>
              </Button>

              <Button
                variant="ghost"
                className="px-3 text-foreground/80 border-border/40 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200"
                asChild
              >
                <Link href="/about">About</Link>
              </Button>
            </div>

            <GitHubStarsButton
              showText={false}
              className="flex sm:hidden text-foreground/80 border-border/40 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200"
            />
            <GitHubStarsButton />
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="px-3 sm:px-4">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 sm:w-9 sm:h-9",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
