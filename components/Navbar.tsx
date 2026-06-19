"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <a href="#top" className="group flex min-w-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Jeremiah James A. Curias</p>
            <p className="hidden truncate text-xs uppercase tracking-[0.22em] text-slate-400 min-[420px]:block sm:tracking-[0.3em]">Software Developer</p>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white hover:ring-1 hover:ring-cyan-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 xl:px-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-sm text-white transition hover:border-cyan-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:px-4 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-white transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/5 bg-slate-950/95 transition-[max-height] duration-300 lg:hidden ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
