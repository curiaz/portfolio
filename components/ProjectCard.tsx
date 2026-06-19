"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectCardProps = {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  highlights?: string[];
  previewSrc?: string;
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
  previewPath,
  previewAlt,
  accent,
}: ProjectCardProps) {
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(Boolean(previewSrc));

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
            {previewSrc && isPreviewAvailable ? (
              <Image
                src={previewSrc}
                alt={previewAlt}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                onError={() => setIsPreviewAvailable(false)}
              />
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
          <span className="hidden shrink-0 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 min-[380px]:inline-flex">
            Case
          </span>
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
    </article>
  );
}
