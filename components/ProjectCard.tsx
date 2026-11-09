"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type ProjectCardProps = {
  title: string;
  projectType?: string;
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

const imageTransitionDuration = 350;

export function ProjectCard({
  title,
  projectType = "Featured Project",
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
  const [isImageReady, setIsImageReady] = useState(false);
  const [isDetailsMounted, setIsDetailsMounted] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isDetailsReady, setIsDetailsReady] = useState(false);
  const [imageTransform, setImageTransform] = useState("translate(0, 0) scale(1, 1)");
  const [imageTransitionEnabled, setImageTransitionEnabled] = useState(false);
  const [detailsTransform, setDetailsTransform] = useState("translate(0, 0) scale(1, 1)");
  const [detailsTransitionEnabled, setDetailsTransitionEnabled] = useState(false);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const sourceRectRef = useRef<DOMRect | null>(null);
  const targetRectRef = useRef<DOMRect | null>(null);
  const detailsSourceRectRef = useRef<DOMRect | null>(null);
  const detailsTargetRectRef = useRef<DOMRect | null>(null);
  const isClosingRef = useRef(false);
  const isDetailsClosingRef = useRef(false);
  const activeImage = availableImages.length > 0 ? availableImages[activeIndex % availableImages.length] : undefined;

  useBodyScrollLock(isPreviewMounted || isDetailsMounted);

  const showPreviousImage = () => {
    setActiveIndex((index) => (index - 1 + availableImages.length) % availableImages.length);
  };

  const showNextImage = () => {
    setActiveIndex((index) => (index + 1) % availableImages.length);
  };

  const closeDetails = useCallback(() => {
    if (isDetailsClosingRef.current) {
      return;
    }

    isDetailsClosingRef.current = true;
    setIsDetailsVisible(false);

    const sourceRect = detailsSourceRectRef.current;
    const targetRect = detailsTargetRectRef.current;
    const detailsPanel = detailsPanelRef.current;

    if (
      !sourceRect ||
      !targetRect ||
      !detailsPanel ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDetailsMounted(false);
      setIsDetailsReady(false);
      return;
    }

    const scaleX = sourceRect.width / targetRect.width;
    const scaleY = sourceRect.height / targetRect.height;
    const translateX = sourceRect.left - targetRect.left;
    const translateY = sourceRect.top - targetRect.top;

    setDetailsTransitionEnabled(true);
    setDetailsTransform(`translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`);
  }, []);

  const closePreview = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;
    setIsPreviewVisible(false);
    const sourceRect = sourceRectRef.current;
    const targetRect = targetRectRef.current;
    const imagePanel = imagePanelRef.current;

    if (
      !sourceRect ||
      !targetRect ||
      !imagePanel ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsPreviewMounted(false);
      setIsImageReady(false);
      previewButtonRef.current?.focus({ preventScroll: true });
      return;
    }

    const scaleX = sourceRect.width / targetRect.width;
    const scaleY = sourceRect.height / targetRect.height;
    const translateX = sourceRect.left - targetRect.left;
    const translateY = sourceRect.top - targetRect.top;

    setImageTransitionEnabled(true);
    setImageTransform(`translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`);
  }, []);

  useEffect(() => {
    if (!isPreviewMounted) {
      return;
    }

    let secondFrameId = 0;
    const firstFrameId = window.requestAnimationFrame(() => {
      const sourceRect = sourceRectRef.current;
      const imagePanel = imagePanelRef.current;

      if (!sourceRect || !imagePanel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsImageReady(true);
        setIsPreviewVisible(true);
        return;
      }

      const targetRect = imagePanel.getBoundingClientRect();
      targetRectRef.current = targetRect;
      const scaleX = sourceRect.width / targetRect.width;
      const scaleY = sourceRect.height / targetRect.height;
      const translateX = sourceRect.left - targetRect.left;
      const translateY = sourceRect.top - targetRect.top;

      setImageTransitionEnabled(false);
      setImageTransform(`translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`);

      secondFrameId = window.requestAnimationFrame(() => {
        if (isClosingRef.current) {
          return;
        }

        setImageTransitionEnabled(true);
        setIsImageReady(true);
        setImageTransform("translate(0, 0) scale(1, 1)");
        setIsPreviewVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [isPreviewMounted]);

  useEffect(() => {
    if (!isDetailsMounted) {
      return;
    }

    let secondFrameId = 0;
    const firstFrameId = window.requestAnimationFrame(() => {
      const sourceRect = detailsSourceRectRef.current;
      const detailsPanel = detailsPanelRef.current;

      if (!sourceRect || !detailsPanel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsDetailsReady(true);
        setIsDetailsVisible(true);
        return;
      }

      const targetRect = detailsPanel.getBoundingClientRect();
      detailsTargetRectRef.current = targetRect;
      const scaleX = sourceRect.width / targetRect.width;
      const scaleY = sourceRect.height / targetRect.height;
      const translateX = sourceRect.left - targetRect.left;
      const translateY = sourceRect.top - targetRect.top;

      setDetailsTransitionEnabled(false);
      setDetailsTransform(`translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`);

      secondFrameId = window.requestAnimationFrame(() => {
        if (isDetailsClosingRef.current) {
          return;
        }

        setDetailsTransitionEnabled(true);
        setIsDetailsReady(true);
        setDetailsTransform("translate(0, 0) scale(1, 1)");
        setIsDetailsVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [isDetailsMounted]);

  useEffect(() => {
    if (!isDetailsMounted) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetails();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDetails, isDetailsMounted]);

  useEffect(() => {
    if (!isPreviewMounted) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePreview, isPreviewMounted]);

  useEffect(() => {
    if (isPreviewMounted || availableImages.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % availableImages.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [availableImages.length, isPreviewMounted]);

  const openPreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    isClosingRef.current = false;
    setIsImageReady(false);
    setIsPreviewVisible(false);
    sourceRectRef.current = event.currentTarget.getBoundingClientRect();
    targetRectRef.current = null;
    setImageTransitionEnabled(false);
    setImageTransform("translate(0, 0) scale(1, 1)");
    setIsPreviewMounted(true);
  };

  const openDetails = () => {
    if (!window.matchMedia("(max-width: 639px)").matches || !cardRef.current) {
      return;
    }

    isDetailsClosingRef.current = false;
    setIsDetailsReady(false);
    setIsDetailsVisible(false);
    detailsSourceRectRef.current = cardRef.current.getBoundingClientRect();
    detailsTargetRectRef.current = null;
    setDetailsTransitionEnabled(false);
    setDetailsTransform("translate(0, 0) scale(1, 1)");
    setIsDetailsMounted(true);
  };

  const handleImageTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (isClosingRef.current && event.target === event.currentTarget && event.propertyName === "transform") {
      setIsPreviewMounted(false);
      setIsImageReady(false);
      previewButtonRef.current?.focus({ preventScroll: true });
    }
  };

  const handleDetailsTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (
      isDetailsClosingRef.current &&
      event.target === event.currentTarget &&
      event.propertyName === "transform"
    ) {
      setIsDetailsMounted(false);
      setIsDetailsReady(false);
    }
  };

  return (
    <article ref={cardRef} className="group relative flex h-full overflow-hidden rounded-[18px] border border-slate-800 bg-slate-950/80 p-2.5 shadow-[0_18px_70px_rgba(2,6,23,0.35)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:rounded-[28px] sm:p-5 md:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: accent }}
      />
      <div className="relative flex h-full w-full flex-col">
        <div className="mb-2.5 overflow-hidden rounded-[12px] border border-white/10 bg-slate-950/70 sm:mb-5 sm:rounded-[22px]">
          <div className="relative aspect-[16/10]">
            {activeImage ? (
              <button
                ref={previewButtonRef}
                type="button"
                aria-label={`View larger image: ${previewAlt}${availableImages.length > 1 ? `, image ${activeIndex + 1} of ${availableImages.length}` : ""}`}
                onClick={openPreview}
                className="group/image absolute inset-0 z-20 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300"
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

        <div className="mb-2.5 flex items-start justify-between gap-2 sm:mb-5 sm:min-h-[8.25rem] sm:gap-4">
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-[0.12em] text-cyan-300/80 sm:text-xs sm:tracking-[0.3em]">{projectType}</p>
            <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-white sm:mt-2 sm:min-h-[4rem] sm:text-2xl">
              {title}
            </h3>
            <p className={`mt-1 line-clamp-2 text-[10px] font-medium leading-4 text-slate-300 sm:mt-2 sm:min-h-[2.5rem] sm:text-sm sm:leading-5 ${subtitle ? "" : "invisible"}`}>
              {subtitle || "Project subtitle placeholder"}
            </p>
          </div>
        </div>

        <p className="line-clamp-3 text-[11px] leading-4 text-slate-300 sm:min-h-[5.25rem] sm:text-sm sm:leading-7">{description}</p>

        {highlights && highlights.length > 0 ? (
          <ul className="mt-4 hidden space-y-2 text-xs text-slate-300 sm:mt-5 sm:block sm:min-h-[6.5rem] sm:space-y-3 sm:text-sm">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5 sm:gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 sm:h-2 sm:w-2" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-1 pt-3 sm:gap-2 sm:pt-5">
          {tech.map((item, index) => (
            <span
              key={item}
              className={`rounded-full border border-slate-700 bg-slate-900/70 px-1.5 py-0.5 text-[9px] leading-4 text-slate-200 transition group-hover:border-cyan-400/40 sm:px-3 sm:py-1 sm:text-xs ${index < 4 ? "inline-flex" : "hidden sm:inline-flex"}`}
            >
              {item}
            </span>
          ))}
          {tech.length > 4 ? (
            <span className="inline-flex rounded-full border border-slate-700 bg-slate-900/70 px-1.5 py-0.5 text-[9px] leading-4 text-slate-300 sm:hidden">
              +{tech.length - 4}
            </span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        aria-label={`View details for ${title}`}
        onClick={openDetails}
        className="absolute inset-0 z-10 rounded-[18px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:hidden"
      />

      {isDetailsMounted
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${title} project details`}
              aria-hidden={!isDetailsVisible}
              inert={!isDetailsVisible}
              className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden p-3"
            >
              <div
                aria-hidden="true"
                onMouseDown={closeDetails}
                className={`absolute inset-0 bg-slate-950/90 transition-[opacity,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${isDetailsVisible ? "opacity-100 backdrop-blur-md" : "opacity-0 backdrop-blur-none"}`}
              />
              <div
                ref={detailsPanelRef}
                onMouseDown={(event) => event.stopPropagation()}
                onTransitionEnd={handleDetailsTransitionEnd}
                style={{
                  transform: detailsTransform,
                  transformOrigin: "top left",
                  visibility: isDetailsReady ? "visible" : "hidden",
                  transition: detailsTransitionEnabled
                    ? `transform ${imageTransitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : "none",
                }}
                className="relative z-10 flex h-[min(88dvh,720px)] w-[min(92vw,620px)] flex-col overflow-hidden rounded-[22px] border border-slate-700 bg-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.65)] will-change-transform"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 opacity-90" style={{ background: accent }} />
                <button
                  type="button"
                  autoFocus
                  aria-label="Close project details"
                  onClick={closeDetails}
                  className={`absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-xl leading-none text-white transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isDetailsVisible ? "opacity-100" : "opacity-0"}`}
                >
                  &times;
                </button>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
                  <div className="mb-4 min-h-9 pr-11">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">{projectType}</p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight text-white">{title}</h2>
                    {subtitle ? <p className="mt-1 text-sm font-medium leading-5 text-slate-300">{subtitle}</p> : null}
                  </div>
                  {activeImage ? (
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[14px] border border-white/10 bg-slate-900">
                      <Image src={activeImage} alt={previewAlt} fill sizes="(max-width: 640px) 95vw, 620px" className="object-cover" />
                    </div>
                  ) : null}
                  <p className="text-sm leading-6 text-slate-300">{description}</p>
                  {highlights && highlights.length > 0 ? (
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      {highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {isPreviewMounted && activeImage
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${title} image preview`}
              aria-hidden={!isPreviewVisible}
              inert={!isPreviewVisible}
              className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden p-3 sm:p-6"
            >
              <div
                aria-hidden="true"
                onMouseDown={closePreview}
                className={`absolute inset-0 bg-slate-950/90 transition-[opacity,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${isPreviewVisible ? "opacity-100 backdrop-blur-md" : "opacity-0 backdrop-blur-none"}`}
              />
              <div
                ref={imagePanelRef}
                className="relative z-10 aspect-[16/10] w-[min(95vw,1440px,128dvh)] overflow-hidden rounded-[18px] border border-white/10 bg-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.65)] will-change-transform sm:rounded-[22px]"
                onTransitionEnd={handleImageTransitionEnd}
                style={{
                  transform: imageTransform,
                  transformOrigin: "top left",
                  visibility: isImageReady ? "visible" : "hidden",
                  transition: imageTransitionEnabled
                    ? `transform ${imageTransitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : "none",
                }}
              >
                <button
                  type="button"
                  autoFocus
                  aria-label="Close image preview"
                  onClick={closePreview}
                  className={`absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl leading-none text-white transition-[opacity,background-color] duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isPreviewVisible ? "opacity-100" : "opacity-0"}`}
                >
                  &times;
                </button>
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
                      className={`absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl text-white transition-[opacity,background-color] duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isPreviewVisible ? "opacity-100" : "opacity-0"}`}
                    >
                      <span aria-hidden="true">&lsaquo;</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Next project image"
                      onClick={showNextImage}
                      className={`absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl text-white transition-[opacity,background-color] duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isPreviewVisible ? "opacity-100" : "opacity-0"}`}
                    >
                      <span aria-hidden="true">&rsaquo;</span>
                    </button>
                    <div className={`absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 transition-opacity duration-200 ${isPreviewVisible ? "opacity-100" : "opacity-0"}`}>
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
            </div>,
            document.body,
          )
        : null}
    </article>
  );
}
