"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 600);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950/90 text-cyan-200 shadow-[0_18px_40px_rgba(2,132,199,0.2)] transition hover:-translate-y-1 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
    >
      &uarr;
    </a>
  );
}
