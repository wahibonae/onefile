"use client";

import { useState } from "react";

interface UseYouTubeBrowserReturn {
  isYouTubeBrowserOpen: boolean;
  setIsYouTubeBrowserOpen: (open: boolean) => void;
  handleYouTubeImportClick: () => void;
}

export function useYouTubeBrowser(): UseYouTubeBrowserReturn {
  const [isYouTubeBrowserOpen, setIsYouTubeBrowserOpen] = useState(false);

  const handleYouTubeImportClick = (): void => {
    setIsYouTubeBrowserOpen(true);
  };

  return {
    isYouTubeBrowserOpen,
    setIsYouTubeBrowserOpen,
    handleYouTubeImportClick,
  };
}
