"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk, useAuth } from "@clerk/nextjs";
import { FileWithContent } from "@/types";
import { saveFiles } from "@/lib/fileStorage";

interface UseGitHubBrowserReturn {
  isGitHubBrowserOpen: boolean;
  setIsGitHubBrowserOpen: (open: boolean) => void;
  handleSignInClick: () => void;
  handleGitHubImportClick: () => void;
  triggerSignIn: () => void;
  isSignedIn: boolean;
  isAuthLoaded: boolean;
}

export function useGitHubBrowser(files: FileWithContent[]): UseGitHubBrowserReturn {
  const [isGitHubBrowserOpen, setIsGitHubBrowserOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { isLoaded } = useAuth();
  const { openSignIn } = useClerk();

  // Check for pending actions after OAuth redirect
  useEffect(() => {
    if (isSignedIn) {
      try {
        const pendingAction = sessionStorage.getItem("onefile-pending-action");
        if (pendingAction === "github-import") {
          sessionStorage.removeItem("onefile-pending-action");
          // Small delay to ensure UI is ready
          setTimeout(() => {
            setIsGitHubBrowserOpen(true);
          }, 100);
        }
      } catch (error) {
        console.error("Failed to check pending action:", error);
        sessionStorage.removeItem("onefile-pending-action");
      }
    }
  }, [isSignedIn]);

  const handleSignInClick = (): void => {
    // Save files to IndexedDB before OAuth redirect (extra safety)
    if (files.length > 0) {
      saveFiles(files).catch((error) => {
        console.error("Failed to save files before sign-in:", error);
      });
    }
  };

  const handleGitHubImportClick = (): void => {
    if (!isSignedIn) {
      handleSignInClick(); // Save files before OAuth redirect
      sessionStorage.setItem("onefile-pending-action", "github-import"); // Save intent
      openSignIn(); // Open sign-in modal programmatically
      return;
    }
    setIsGitHubBrowserOpen(true);
  };

  const triggerSignIn = (): void => {
    handleSignInClick(); // Save files before OAuth redirect
    sessionStorage.setItem("onefile-pending-action", "github-import"); // Save intent
    openSignIn(); // Open sign-in modal programmatically
  };

  return {
    isGitHubBrowserOpen,
    setIsGitHubBrowserOpen,
    handleSignInClick,
    handleGitHubImportClick,
    triggerSignIn,
    isSignedIn: isSignedIn ?? false,
    isAuthLoaded: isLoaded,
  };
}
