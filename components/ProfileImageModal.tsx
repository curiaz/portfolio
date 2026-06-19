"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProfileImageModalProps = {
  src: string;
  alt: string;
};

export function ProfileImageModal({ src, alt }: ProfileImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="View larger portrait"
        onClick={() => setIsOpen(true)}
        className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-[24px] border border-cyan-300/25 bg-slate-950 shadow-[0_18px_50px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:border-cyan-300/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 min-[390px]:h-24 min-[390px]:w-24 sm:h-32 sm:w-32 sm:rounded-[30px] md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-52 xl:w-52"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1280px) 208px, (min-width: 1024px) 192px, (min-width: 768px) 160px, (min-width: 640px) 128px, (min-width: 390px) 96px, 80px"
          className="object-cover object-[center_34%] transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-2 pb-2 pt-8 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs">
          View
        </span>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portrait image preview"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              aria-label="Close portrait preview"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-xl leading-none text-white transition hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              &times;
            </button>
            <div className="relative aspect-[4/3] max-h-[82vh]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
