"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SEUIL_CONTENT } from "./parcoursData";

interface SceneSeuilProps {
  onNextScene: () => void;
}

export function SceneSeuil({ onNextScene }: SceneSeuilProps) {
  const [opened, setOpened] = useState(false);

  return (
    <section
      aria-label="I. Le Seuil"
      data-serial-id="G01-PARCOURS-SEUIL"
      className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-8 text-center md:py-12"
    >
      <p className="text-[11px] tracking-[0.28em] text-[#5C564F] uppercase">
        {SEUIL_CONTENT.eyebrow}
      </p>

      <h1 className="mt-4 max-w-2xl text-3xl font-normal leading-[1.2] tracking-tight text-[#262523] sm:text-4xl md:text-5xl">
        {SEUIL_CONTENT.headline}
      </h1>

      <p className="mt-5 max-w-xl text-sm italic leading-[1.85] text-[#5C564F] sm:text-base">
        {SEUIL_CONTENT.tissageQuote}
      </p>

      {/* 중앙 원형 인터랙션: 클릭 시 결(Gyeol)의 서사 개방 */}
      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setOpened((prev) => !prev)}
          aria-expanded={opened}
          data-serial-id="G01-SEUIL-CIRCLE"
          className="group relative flex h-44 w-44 items-center justify-center rounded-full transition-all duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A3525] sm:h-52 sm:w-52"
        >
          {/* 외곽 세선 원 */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-full border border-[#D8D0C5] transition-all duration-700 ease-out ${
              opened
                ? "scale-110 border-[#4A3525]/50 opacity-70"
                : "group-hover:scale-105 group-hover:border-[#4A3525]"
            }`}
          />
          {/* 중간 동심원 */}
          <span
            aria-hidden="true"
            className={`absolute inset-4 rounded-full border border-[#D8D0C5]/80 transition-all duration-700 ease-out ${
              opened ? "scale-105 border-[#A63A2B]/40" : "group-hover:scale-[1.02]"
            }`}
          />
          {/* 중심 인장 및 안내 */}
          <span className="relative z-10 flex flex-col items-center gap-2 px-4">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center border text-base font-medium transition-colors duration-500 ${
                opened
                  ? "border-[#A63A2B] bg-[#A63A2B] text-[#F9F7F2]"
                  : "border-[#A63A2B] text-[#A63A2B] group-hover:bg-[#A63A2B]/10"
              }`}
            >
              結
            </span>
            <span className="text-[11px] tracking-[0.2em] text-[#5C564F] uppercase">
              {opened ? SEUIL_CONTENT.circleOpenedLabel : SEUIL_CONTENT.circlePrompt}
            </span>
          </span>
        </button>

        {/* 개방되는 서사 영역 */}
        <div
          className={`grid transition-all duration-700 ease-out ${
            opened
              ? "mt-8 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mx-auto max-w-xl border-t border-[#D8D0C5] pt-6 text-left sm:text-center">
              <div className="space-y-3 text-sm leading-[1.85] text-[#262523] sm:text-base">
                {SEUIL_CONTENT.revealedNarrative.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <button
                type="button"
                onClick={onNextScene}
                className="mt-6 inline-flex items-center gap-2 border-b border-[#4A3525] pb-1 text-xs tracking-[0.18em] text-[#4A3525] uppercase transition-opacity hover:opacity-70"
              >
                <span>{SEUIL_CONTENT.nextHint}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
