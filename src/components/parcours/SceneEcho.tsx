"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { ArchiveItemView } from "@/components/modals/ArchiveLightboxModal";
import { ECHO_CONTENT } from "./parcoursData";

interface SceneEchoProps {
  archiveItems: ArchiveItemView[];
  onSelectArchive: (item: ArchiveItemView) => void;
}

export function SceneEcho({ archiveItems, onSelectArchive }: SceneEchoProps) {
  const items =
    archiveItems.length > 0 ? archiveItems : ECHO_CONTENT.fallbackArchives;
  const [archiveIdx, setArchiveIdx] = useState(0);
  const currentItem = items[archiveIdx % items.length];

  const handlePrevArchive = () => {
    setArchiveIdx((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNextArchive = () => {
    setArchiveIdx((prev) => (prev + 1) % items.length);
  };

  return (
    <section
      aria-label="III. L’Écho"
      data-serial-id="G03-PARCOURS-ECHO"
      className="mx-auto w-full max-w-4xl px-6 py-8 md:py-12"
    >
      <div className="mb-8 border-b border-[#D8D0C5] pb-4">
        <p className="text-[11px] tracking-[0.26em] text-[#A63A2B] uppercase">
          III · L’Écho — {ECHO_CONTENT.eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-normal leading-snug text-[#262523] sm:text-3xl">
          {ECHO_CONTENT.title}
        </h2>
      </div>

      {/* 비영리 예술단체로서의 결·태도 3가지 */}
      <div className="grid grid-cols-1 gap-6 border-b border-[#D8D0C5] pb-8 md:grid-cols-3">
        {ECHO_CONTENT.statements.map((item) => (
          <div key={item.num} className="space-y-2">
            <span className="text-[11px] tracking-[0.2em] text-[#A63A2B]">
              {item.num}
            </span>
            <h3 className="text-base font-medium text-[#262523]">
              {item.heading}
            </h3>
            <p className="text-sm leading-relaxed text-[#5C564F]">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      {/* 기록(아카이브) 전환 뷰 */}
      {currentItem && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] tracking-[0.22em] text-[#5C564F] uppercase">
              Archives &amp; Traces ({String(archiveIdx + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")})
            </span>

            {items.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevArchive}
                  aria-label="Archive précédente"
                  className="inline-flex h-8 w-8 items-center justify-center border border-[#D8D0C5] text-[#262523] transition-colors hover:border-[#4A3525] hover:bg-[#EFECE4]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextArchive}
                  aria-label="Archive suivante"
                  className="inline-flex h-8 w-8 items-center justify-center border border-[#D8D0C5] text-[#262523] transition-colors hover:border-[#4A3525] hover:bg-[#EFECE4]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div
            key={currentItem.id}
            className="hanji-scene-enter grid grid-cols-1 gap-6 border border-[#D8D0C5] bg-[#EFECE4]/35 p-5 md:grid-cols-[220px_1fr] md:items-center"
          >
            <button
              type="button"
              onClick={() => onSelectArchive(currentItem)}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-[#D8D0C5] bg-[#F9F7F2]"
            >
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-2 bottom-2 inline-flex h-7 w-7 items-center justify-center bg-[#F9F7F2]/90 text-[#262523]">
                <Maximize2 className="h-3.5 w-3.5" />
              </span>
            </button>

            <div>
              <p className="text-[11px] tracking-[0.2em] text-[#A63A2B] uppercase">
                {currentItem.subtitle}
              </p>
              <h3 className="mt-1.5 text-xl font-medium text-[#262523]">
                {currentItem.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5C564F]">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
