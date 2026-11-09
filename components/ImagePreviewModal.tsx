"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type ImagePreviewModalProps = {
  src: string;
  alt: string;
  label: string;
  previewClassName: string;
  previewImageClassName: string;
  previewSizes: string;
  modalWidthClassName?: string;
  modalAspectClassName?: string;
  priority?: boolean;
};

const transitionDuration = 350;

export function ImagePreviewModal({
  src,
  alt,
  label,
  previewClassName,
  previewImageClassName,
  previewSizes,
  modalWidthClassName = "w-[min(95vw,1440px,128dvh)]",
  modalAspectClassName = "aspect-[16/10]",
  priority = false,
}: ImagePreviewModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const [imageTransform, setImageTransform] = useState("translate(0, 0) scale(1, 1)");
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const sourceRectRef = useRef<DOMRect | null>(null);
  const targetRectRef = useRef<DOMRect | null>(null);
  const isClosingRef = useRef(false);

  useBodyScrollLock(isMounted);

  const closePreview = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;
    setIsVisible(false);

    const sourceRect = sourceRectRef.current;
    const targetRect = targetRectRef.current;
    const imagePanel = imagePanelRef.current;

    if (
      !sourceRect ||
      !targetRect ||
      !imagePanel ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsMounted(false);
      setIsImageReady(false);
      previewButtonRef.current?.focus({ preventScroll: true });
      return;
    }

    const scaleX = sourceRect.width / targetRect.width;
    const scaleY = sourceRect.height / targetRect.height;
    const translateX = sourceRect.left - targetRect.left;
    const translateY = sourceRect.top - targetRect.top;

    setTransitionEnabled(true);
    setImageTransform(`translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    let secondFrameId = 0;
    const firstFrameId = window.requestAnimationFrame(() => {
      const sourceRect = sourceRectRef.current;
      const imagePanel = imagePanelRef.current;

      if (!sourceRect || !imagePanel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsImageReady(true);
        setIsVisible(true);
        return;
      }

      const targetRect = imagePanel.getBoundingClientRect();
      targetRectRef.current = targetRect;
      const scaleX = sourceRect.width / targetRect.width;
      const scaleY = sourceRect.height / targetRect.height;
      const translateX = sourceRect.left - targetRect.left;
      const translateY = sourceRect.top - targetRect.top;

      setTransitionEnabled(false);
      setImageTransform(`translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`);

      secondFrameId = window.requestAnimationFrame(() => {
        if (isClosingRef.current) {
          return;
        }

        setTransitionEnabled(true);
        setIsImageReady(true);
        setImageTransform("translate(0, 0) scale(1, 1)");
        setIsVisible(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
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
  }, [closePreview, isMounted]);

  const openPreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    isClosingRef.current = false;
    setIsImageReady(false);
    setIsVisible(false);
    sourceRectRef.current = event.currentTarget.getBoundingClientRect();
    targetRectRef.current = null;
    setTransitionEnabled(false);
    setImageTransform("translate(0, 0) scale(1, 1)");
    setIsMounted(true);
  };

  const handleImageTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (isClosingRef.current && event.target === event.currentTarget && event.propertyName === "transform") {
      setIsMounted(false);
      setIsImageReady(false);
      previewButtonRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <button
        ref={previewButtonRef}
        type="button"
        aria-label={`View larger image: ${alt}`}
        onClick={openPreview}
        className={`group/image relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 ${previewClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={previewSizes}
          className={`transition-transform duration-500 group-hover/image:scale-[1.03] motion-reduce:transition-none ${previewImageClassName}`}
        />
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pb-3 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover/image:opacity-100 group-focus-visible/image:opacity-100 motion-reduce:transition-none">
          View
        </span>
      </button>

      {isMounted
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${label} image preview`}
              aria-hidden={!isVisible}
              inert={!isVisible}
              className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden p-3 sm:p-6"
            >
              <div
                aria-hidden="true"
                onMouseDown={closePreview}
                className={`absolute inset-0 bg-slate-950/90 transition-[opacity,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${isVisible ? "opacity-100 backdrop-blur-md" : "opacity-0 backdrop-blur-none"}`}
              />
              <div
                ref={imagePanelRef}
                className={`relative z-10 ${modalAspectClassName} ${modalWidthClassName} overflow-hidden rounded-[18px] border border-white/10 bg-slate-950 shadow-[0_24px_90px_rgba(0,0,0,0.65)] will-change-transform sm:rounded-[22px]`}
                onTransitionEnd={handleImageTransitionEnd}
                style={{
                  transform: imageTransform,
                  transformOrigin: "top left",
                  visibility: isImageReady ? "visible" : "hidden",
                  transition: transitionEnabled
                    ? `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : "none",
                }}
              >
                <button
                  type="button"
                  autoFocus
                  aria-label="Close image preview"
                  onClick={closePreview}
                  className={`absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 text-xl leading-none text-white transition-[opacity,background-color] duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  &times;
                </button>
                <Image src={src} alt={alt} fill sizes="95vw" className="object-contain" />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
