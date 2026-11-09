"use client";

import { useId, useState, type ReactNode } from "react";

type AnimatedDisclosureProps = {
  title: string;
  children: ReactNode;
};

export function AnimatedDisclosure({ title, children }: AnimatedDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 py-2 text-left text-sm font-semibold text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        {title}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={`h-4 w-4 shrink-0 text-cyan-300 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={contentId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={`min-h-0 overflow-hidden transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
