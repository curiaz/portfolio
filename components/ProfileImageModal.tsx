"use client";

import { ImagePreviewModal } from "@/components/ImagePreviewModal";

type ProfileImageModalProps = {
  src: string;
  alt: string;
};

export function ProfileImageModal({ src, alt }: ProfileImageModalProps) {
  return (
    <ImagePreviewModal
      src={src}
      alt={alt}
      label="Portrait"
      previewClassName="h-20 w-20 shrink-0 rounded-[24px] border border-cyan-300/25 bg-slate-950 shadow-[0_18px_50px_rgba(34,211,238,0.14)] transition hover:-translate-y-0.5 hover:border-cyan-300/60 min-[390px]:h-24 min-[390px]:w-24 sm:h-32 sm:w-32 sm:rounded-[30px] md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-52 xl:w-52"
      previewImageClassName="object-cover object-[center_34%]"
      previewSizes="(min-width: 1280px) 208px, (min-width: 1024px) 192px, (min-width: 768px) 160px, (min-width: 640px) 128px, (min-width: 390px) 96px, 80px"
      modalWidthClassName="w-[min(82vw,560px,78dvh)]"
      modalAspectClassName="aspect-square"
      priority
    />
  );
}
