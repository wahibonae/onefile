"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import GitHub from "@/components/icons/Github";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const GITHUB_URL = "https://github.com/wahibonae/onefile";
const SKIPIT_URL = "https://getskipit.com";
const COUNTDOWN_SECONDS = 4;

interface PostSuccessCardProps {
  downloadRequested: number;
  onDownload: () => void;
}

function fireConfetti() {
  const end = Date.now() + 800;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export function PostSuccessCard({ downloadRequested, onDownload }: PostSuccessCardProps) {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [downloaded, setDownloaded] = useState(false);
  const onDownloadRef = useRef(onDownload);
  onDownloadRef.current = onDownload;

  const handleDownloadComplete = useCallback(() => {
    onDownloadRef.current();
    setDownloaded(true);
    fireConfetti();
  }, []);

  // Open modal when download is requested
  useEffect(() => {
    if (downloadRequested < 1) return;

    setOpen(true);
    setCountdown(COUNTDOWN_SECONDS);
    setDownloaded(false);
  }, [downloadRequested]);

  // Countdown timer
  useEffect(() => {
    if (!open || downloaded) return;
    if (countdown <= 0) {
      handleDownloadComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [open, countdown, downloaded, handleDownloadComplete]);

  // If user closes modal early, still download the file
  const handleOpenChange = (value: boolean) => {
    if (!value && !downloaded) {
      onDownloadRef.current();
    }
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl gap-0 p-0 overflow-hidden border-border [&>button:last-child]:hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Capybara left side */}
          <div className="hidden sm:flex items-center justify-center pl-12 pr-8 py-8 sm:w-[40%] shrink-0">
            <Image
              src="/onefile-capybara-light.png"
              alt="OneFile capybara mascot"
              width={190}
              height={253}
              className="object-contain dark:hidden"
            />
            <Image
              src="/onefile-capybara-dark.png"
              alt="OneFile capybara mascot"
              width={190}
              height={253}
              className="object-contain hidden dark:block opacity-90"
            />
          </div>

          {/* Content right side */}
          <div className="flex-1 px-6 pt-10 pb-6 sm:pt-12 sm:pb-10 sm:pr-10 sm:pl-6">

            <DialogHeader className="space-y-1.5 text-center sm:text-left mb-5">
              <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-foreground">
                {downloaded
                  ? "Your One File is downloaded!"
                  : `Your file will download in ${countdown}...`}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-muted-foreground leading-relaxed">
                OneFile is free &amp; open source. <br /> Here&apos;s how you can help us keep building:
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl border border-border bg-card dark:hover:bg-primary/10 hover:bg-muted/40 hover:border-primary/40 px-4 py-3.5 shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                    <GitHub className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                      Star us on GitHub
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Takes 2 seconds, helps us reach more people
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </a>

              <a
                href={SKIPIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl border border-border bg-card dark:hover:bg-[#FE7150]/10 hover:bg-[#FE7150]/5 hover:border-[#FE7150]/40 hover:text-[#FE7150] px-4 py-3.5 shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-[#FE7150]/10 shrink-0">
                    <Image
                      src="https://icons.duckduckgo.com/ip3/getskipit.com.ico"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-[#FE7150]">
                      Try our new app: Skipit
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-[#FE7150]/65 dark:group-hover:text-[#FE7150]/75">
                      Skip inappropriate scenes on Netflix (free)
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-[#FE7150] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </a>

              <div className="flex justify-center mt-1">
                <Button
                  variant="ghost"
                  className="text-muted-foreground/60 hover:text-primary hover:bg-primary/5 hover:border-1 hover:border-primary/10 transition-all duration-200 text-xs h-9"
                  onClick={() => setOpen(false)}
                >
                  {downloaded ? "Close" : "Maybe later"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
