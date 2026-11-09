"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProjectCardProps = {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  highlights?: string[];
  previewSrc?: string;
  previewImages?: string[];
  previewPath: string;
  previewAlt: string;
  accent: string;
};

export function ProjectCard({
  title,
  subtitle,
  description,
  tech,
  highlights,
  previewSrc,
  previewImages,
  previewPath,
  previewAlt,
  accent,
}: ProjectCardProps) {
  const imageSources = useMemo(
    () => Array.from(new Set(previewImages?.length ? previewImages : previewSrc ? [previewSrc] : [])),
    [previewImages, previewSrc],
  );
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const availableImages = imageSources.filter((src) => !failedImages.includes(src));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewMounted, setIsPreviewMounted] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const activeImage = availableImages.length > 0 ? availableImages[activeIndex % availableImages.length] : undefined;

  const showPreviousImage = () => {
    setActiveIndex((index) => (index - 1 + availableImages.length) % availableImages.length);
  };

  const showNextImage = () => {
    setActiveIndex((index) => (index + 1) % availableImages.length);
  };

  const closePreview = useCallback(() => {
    setIsPreviewVisible(false);
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsPreviewMounted(false);
      previewButtonRef.current?.focus();
    }, 300);
  }, []);

  useEffect(() => {
    if (!isPreviewMounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePreview, isPreviewMounted]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPreviewMounted || availableImages.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % availableImages.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [availableImages.length, isPreviewMounted]);

  const openPreview = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsPreviewMounted(true);
    window.requestAnimationFrame(() => setIsPreviewVisible(true));
  };

  return (
    <article className="group relative flex h-full overflow-hidden rounded-[22px] border border-slate-800 bg-slate-950/80 p-3.5 shadow-[0_18px_70px_rgba(2,6,23,0.35)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:rounded-[28px] sm:p-5 md:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: accent }}
      />
      <div className="relative flex h-full w-full flex-col">
        <div className="mb-4 overflow-hidden rounded-[18px] border border-white/10 bg-slate-950/70 sm:mb-5 sm:rounded-[22px]">
          <div className="relative aspect-[16/10]">
            {activeImage ? (
              <button
                ref={previewButtonRef}
                type="button"
                aria-label={`View larger image: ${previewAlt}${availableImages.length > 1 ? `, image ${activeIndex + 1} of ${availableImages.length}` : ""}`}
                onClick={openPreview}
                className="group/image absolute inset-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
              >
                {availableImages.map((src, index) => (
                  <span
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${index === activeIndex % availableImages.length ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image
                      src={src}
                      alt={previewAlt}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover/image:scale-[1.03] motion-reduce:transition-none"
                      onError={() => setFailedImages((failed) => [...failed, src])}
                    />
                  </span>
                ))}
                <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pb-3 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover/image:opacity-100 group-focus-visible/image:opacity-100 motion-reduce:transition-none">
                  View
                </span>
              </button>
            ) : (
              <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))] px-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:text-xs">
                  Image Preview
                </p>
                <p className="mt-2 max-w-[16rem] text-[11px] leading-5 text-slate-400 sm:text-xs">
                  Upload screenshot to {previewPath}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 flex min-h-[6.75rem] items-start justify-between gap-3 sm:mb-5 sm:min-h-[8.25rem] sm:gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80 sm:text-xs sm:tracking-[0.3em]">
              Featured Project
            </p>
            <h3 className="mt-1.5 min-h-[2.75rem] text-lg font-semibold leading-snug text-white sm:mt-2 sm:min-h-[4rem] sm:text-2xl">
              {title}
            </h3>
            <p className={`mt-1.5 min-h-[2.5rem] text-xs font-medium leading-5 text-slate-300 sm:mt-2 sm:text-sm ${subtitle ? "" : "invisible"}`}>
              {subtitle || "Project subtitle placeholder"}
            </p>
          </div>
        </div>

        <p className="min-h-[4.5rem] text-xs leading-6 text-slate-300 sm:min-h-[5.25rem] sm:text-sm sm:leading-7">{description}</p>

        {highlights && highlights.length > 0 ? (
          <ul className="mt-4 min-h-[5.25rem] space-y-2 text-xs text-slate-300 sm:mt-5 sm:min-h-[6.5rem] sm:space-y-3 sm:text-sm">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5 sm:gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 sm:h-2 sm:w-2" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4 sm:gap-2 sm:pt-5">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-200 transition group-hover:border-cyan-400/40 sm:px-3 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {isPreviewMounted && activeImage
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${title} image preview`}
              aria-hidden={!isPreviewVisible}
              inert={!isPreviewVisible}
              className={`fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 p-3 transition-[opacity,backdrop-filter] duration-300 ease-out motion-reduce:transition-none sm:p-6 ${isPreviewVisible ? "opacity-100 backdrop-blur-md" : "opacity-0 backdrop-blur-none"}`}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closePreview();
                }
              }}
            >
              <div className={`relative w-[min(95vw,1440px)] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.65)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none sm:rounded-3xl ${isPreviewVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <button
                  type="button"
                  autoFocus
                  aria-label="Close image preview"
                  onClick={closePreview}
                  className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl leading-none text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  &times;
                </button>
                <div className="relative aspect-video max-h-[78dvh] bg-black/30">
                  {availableImages.map((src, index) => (
                    <div
                      key={src}
                      aria-hidden={index !== activeIndex % availableImages.length}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${index === activeIndex % availableImages.length ? "opacity-100" : "opacity-0"}`}
                    >
                      <Image
                        src={src}
                        alt={`${previewAlt} ${index + 1}`}
                        fill
                        sizes="95vw"
                        className="object-contain"
                      />
                    </div>
                  ))}
                  {availableImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        aria-label="Previous project image"
                        onClick={showPreviousImage}
                        className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      >
                        <span aria-hidden="true">&lsaquo;</span>
                      </button>
                      <button
                        type="button"
                        aria-label="Next project image"
                        onClick={showNextImage}
                        className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      >
                        <span aria-hidden="true">&rsaquo;</span>
                      </button>
                      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
                        {availableImages.map((src, index) => (
                          <button
                            key={src}
                            type="button"
                            aria-label={`Show image ${index + 1}`}
                            aria-current={index === activeIndex % availableImages.length}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 w-2.5 rounded-full border border-white/70 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${index === activeIndex % availableImages.length ? "bg-cyan-300" : "bg-slate-950/70 hover:bg-white/70"}`}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  );
}
