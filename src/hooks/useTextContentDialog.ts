"use client";

import { useState } from "react";

interface UseTextContentDialogReturn {
  isTextContentDialogOpen: boolean;
  setIsTextContentDialogOpen: (open: boolean) => void;
  handleTextContentClick: () => void;
}

export function useTextContentDialog(): UseTextContentDialogReturn {
  const [isTextContentDialogOpen, setIsTextContentDialogOpen] = useState(false);

  const handleTextContentClick = (): void => {
    setIsTextContentDialogOpen(true);
  };

  return {
    isTextContentDialogOpen,
    setIsTextContentDialogOpen,
    handleTextContentClick,
  };
}
