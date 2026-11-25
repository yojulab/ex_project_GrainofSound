"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { COUR_AXES, type CourAxis } from "./parcoursData";

interface SceneCourProps {
  onOpenPerformanceModal: () => void;
}

export function SceneCour({ onOpenPerformanceModal }: SceneCourProps) {
  const [selectedId, setSelectedId] = useState<CourAxis["id"]>("partage");
  const activeAxis =
    COUR_AXES.find((axis) => axis.id === selectedId) ?? COUR_AXES[0];

  return (
    <section
      aria-label="II. La Cour"
      data-serial-id="G02-PARCOURS-COUR"
      className="mx-auto w-full max-w-4xl px-6 py-8 md:py-12"
    >
      <div className="mb-8 border-b border-[#D8D0C5] pb-4">
        <p className="text-[11px] tracking-[0.26em] text-[#A63A2B] uppercase">
          II · La Cour
        </p>
        <h2 className="mt-2 text-2xl font-normal text-[#262523] sm:text-3xl">
          Trois axes d’une présence vivante
        </h2>
      </div>

      {/* 3축 탭/카드 선택 */}
      <div
        role="tablist"
        aria-label="Axes d'activité de Yeonheedan Gyeol"
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        {COUR_AXES.map((axis) => {
          const isSelected = axis.id === activeAxis.id;
          return (
            <button
              key={axis.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(axis.id)}
              className={`border p-5 text-left transition-all duration-300 ${
                isSelected
                  ? "border-[#4A3525] bg-[#EFECE4]/70"
                  : "border-[#D8D0C5] bg-[#F9F7F2] hover:border-[#4A3525]/50 hover:bg-[#EFECE4]/35"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-[#5C564F] uppercase">
                <span>{axis.index}</span>
                <span>{axis.koreanSubtitle}</span>
              </div>
              <h3 className="mt-3 text-lg font-medium leading-snug text-[#262523]">
                {axis.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* 선택된 축 상세 패널 */}
      <div
        role="tabpanel"
        key={activeAxis.id}
        className="hanji-scene-enter mt-6 border border-[#D8D0C5] bg-[#EFECE4]/30 p-6 sm:p-8"
      >
        <p className="text-xs tracking-[0.2em] text-[#A63A2B] uppercase">
          Axe {activeAxis.index} — {activeAxis.koreanSubtitle}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-[#262523] sm:text-xl">
          {activeAxis.lead}
        </p>

        <ul className="mt-5 space-y-2.5 border-t border-[#D8D0C5] pt-5 text-sm leading-relaxed text-[#5C564F] sm:text-base">
          {activeAxis.details.map((line, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 h-px w-4 shrink-0 bg-[#4A3525]/60"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onOpenPerformanceModal}
            className="inline-flex items-center gap-2 border border-[#4A3525] px-4 py-2 text-xs tracking-[0.16em] text-[#4A3525] uppercase transition-colors hover:bg-[#4A3525] hover:text-[#F9F7F2]"
          >
            <span>{activeAxis.actionLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
