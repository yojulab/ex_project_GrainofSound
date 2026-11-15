"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  serialId: string;
  children: ReactNode;
}

export function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  serialId,
  children,
}: ModalShellProps) {
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-serial-id={serialId}
      data-serial-label={`${title} 모달`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1917]/65 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto border border-[#D8D0C5] bg-[#F6F3EC] p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#D8D0C5] pb-4">
          <div>
            <p className="font-serif-en text-xs tracking-[0.18em] text-[#A63A2B] uppercase">
              {subtitle}
            </p>
            <h2 className="font-serif-kr mt-1 text-xl font-semibold text-[#1A1917]">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#D8D0C5] bg-[#F6F3EC] text-[#1A1917] transition-colors hover:border-[#4A3525] hover:bg-[#EAE4D7]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
