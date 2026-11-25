"use client";

import { IdCard } from "lucide-react";
import { PARCOURS_SCENES, type SceneId } from "@/components/parcours/parcoursData";

interface MinimalHeaderProps {
  activeSceneId?: SceneId;
  onSelectScene?: (id: SceneId) => void;
  onOpenDigitalCard?: () => void;
}

export function MinimalHeader({
  activeSceneId = "seuil",
  onSelectScene,
  onOpenDigitalCard,
}: MinimalHeaderProps) {
  return (
    <header
      data-serial-id="G00-HDR-BAR01"
      data-serial-label="상단 4장면 인덱스 헤더 바"
      className="sticky top-0 z-30 border-b border-[#D8D0C5] bg-[#F9F7F2]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 md:px-8">
        <button
          type="button"
          onClick={() => onSelectScene?.("seuil")}
          data-serial-id="G00-HDR-LOGO01"
          className="flex shrink-0 items-center gap-2 text-[#262523] transition-opacity hover:opacity-75"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center border border-[#A63A2B] text-[10px] font-bold text-[#A63A2B]">
            結
          </span>
          <span className="text-sm font-medium tracking-[0.12em] uppercase sm:text-base">
            Yeonheedan Gyeol
          </span>
        </button>

        {/* 상단 4개 장면 인덱스 내비게이션 */}
        <nav
          data-serial-id="G00-HDR-NAV01"
          aria-label="Parcours en quatre scènes"
          className="flex items-center gap-3 overflow-x-auto text-xs tracking-wide sm:gap-6 sm:text-sm"
        >
          {PARCOURS_SCENES.map((scene) => {
            const isActive = scene.id === activeSceneId;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSelectScene?.(scene.id)}
                aria-current={isActive ? "step" : undefined}
                className={`shrink-0 border-b pb-0.5 transition-colors duration-300 ${
                  isActive
                    ? "border-[#A63A2B] font-medium text-[#262523]"
                    : "border-transparent text-[#5C564F] hover:text-[#262523]"
                }`}
              >
                <span className="text-[11px] text-[#A63A2B] mr-1">
                  {scene.roman}.
                </span>
                <span>{scene.title}</span>
              </button>
            );
          })}
        </nav>

        {onOpenDigitalCard && (
          <button
            type="button"
            onClick={onOpenDigitalCard}
            data-serial-id="G00-HDR-BTN-CARD"
            aria-label="Carte de visite numérique"
            className="hidden shrink-0 items-center gap-1.5 border border-[#D8D0C5] bg-[#F9F7F2] px-2.5 py-1 text-xs text-[#5C564F] transition-colors hover:border-[#4A3525] hover:text-[#262523] md:inline-flex"
          >
            <IdCard className="h-3.5 w-3.5" />
            <span>Carte</span>
          </button>
        )}
      </div>
    </header>
  );
}
