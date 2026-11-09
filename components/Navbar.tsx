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

const name = "Jeremiah James A. Curias";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameLength, setNameLength] = useState(name.length);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timer: number;
    const schedule = (callback: () => void, delay: number) => {
      timer = window.setTimeout(callback, delay);
    };

    const erase = (length: number) => {
      setNameLength(length);
      setIsCursorVisible(true);

      if (length > 0) {
        schedule(() => erase(length - 1), 55);
      } else {
        schedule(() => type(0), 650);
      }
    };

    const blink = (count: number) => {
      if (count === 6) {
        setIsCursorVisible(true);
        erase(name.length);
        return;
      }

      setIsCursorVisible(count % 2 === 1);
      schedule(() => blink(count + 1), 180);
    };

    const type = (length: number) => {
      setNameLength(length);

      if (length < name.length) {
        schedule(() => type(length + 1), 95);
      } else {
        schedule(() => blink(0), 450);
      }
    };

    schedule(() => type(0), 0);

    return () => window.clearTimeout(timer);
  }, []);

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
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <a href="#top" className="group absolute left-1/2 flex min-w-0 max-w-[calc(100%-5.5rem)] -translate-x-1/2 items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 lg:static lg:max-w-none lg:translate-x-0 lg:text-left">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              <span className="sr-only">{name}</span>
              <span aria-hidden="true">
                {name.slice(0, nameLength)}
                <span className={`ml-0.5 inline-block h-[0.9em] w-px translate-y-[0.1em] bg-cyan-300 align-baseline ${isCursorVisible ? "opacity-100" : "opacity-0"}`} />
              </span>
            </p>
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
          className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 lg:hidden"
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
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`absolute right-4 top-full z-50 max-h-[calc(100dvh-4rem)] w-[min(20rem,calc(100vw-2rem))] origin-top-right overflow-y-auto rounded-b-2xl border-t border-white/10 bg-slate-950/95 shadow-[0_24px_48px_rgba(2,6,23,0.6)] backdrop-blur-xl transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:right-6 lg:hidden ${isOpen ? "translate-y-0 scale-y-100 opacity-100" : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"}`}
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
