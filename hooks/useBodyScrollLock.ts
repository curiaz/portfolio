"use client";

import { useEffect } from "react";

let activeLocks = 0;
let savedBodyStyles: {
  overflow: string;
  overscrollBehavior: string;
} | null = null;
let savedDocumentStyles: {
  overflow: string;
  overscrollBehavior: string;
} | null = null;

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    if (activeLocks === 0) {
      savedBodyStyles = {
        overflow: document.body.style.overflow,
        overscrollBehavior: document.body.style.overscrollBehavior,
      };
      savedDocumentStyles = {
        overflow: document.documentElement.style.overflow,
        overscrollBehavior: document.documentElement.style.overscrollBehavior,
      };

      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
    }

    activeLocks += 1;

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);

      if (activeLocks !== 0 || !savedBodyStyles || !savedDocumentStyles) {
        return;
      }

      document.body.style.overflow = savedBodyStyles.overflow;
      document.body.style.overscrollBehavior = savedBodyStyles.overscrollBehavior;
      document.documentElement.style.overflow = savedDocumentStyles.overflow;
      document.documentElement.style.overscrollBehavior = savedDocumentStyles.overscrollBehavior;
      savedBodyStyles = null;
      savedDocumentStyles = null;
    };
  }, [isLocked]);
}
