"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export interface ArchiveItemView {
  id: string;
  category: "welfare" | "festival";
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  aspectRatio: "1:1" | "4:5";
}

interface ArchiveLightboxModalProps {
  item: ArchiveItemView | null;
  onClose: () => void;
}

export function ArchiveLightboxModal({
  item,
  onClose,
}: ArchiveLightboxModalProps) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} 전시 도록 아카이브 확대 보기`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#262523]/85 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl border border-[#D8D0C5] bg-[#F9F7F2] p-4 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="확대 보기 닫기"
          className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center border border-[#D8D0C5] bg-[#F9F7F2] text-[#262523] transition-colors hover:border-[#4A3525] hover:bg-[#EFECE4]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFECE4]">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 92vw, 672px"
            className="object-cover"
          />
        </div>

        <div className="mt-4 border-t border-[#D8D0C5] pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-[#A63A2B]">
              {item.category === "welfare" ? "01 · WELFARE 나눔·복지 공연" : "02 · FESTIVAL 축제·의전 공연"}
            </p>
            <span className="font-serif-en text-xs italic text-[#5C564F]">
              GYEOL Archive No. {item.id.slice(-4)}
            </span>
          </div>
          <h3 className="font-serif-kr mt-1.5 text-lg font-semibold text-[#262523] sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-[#4A3525]">{item.subtitle}</p>
          <p className="mt-2.5 text-sm leading-relaxed text-[#5C564F] sm:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
