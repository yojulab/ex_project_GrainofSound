"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";
import {
  ArchiveLightboxModal,
  type ArchiveItemView,
} from "@/components/modals/ArchiveLightboxModal";

interface RepertoireSectionProps {
  archiveItems: ArchiveItemView[];
  onRequestPerformance: () => void;
}

const PROGRAMS = {
  welfare: {
    badge: "WELFARE & HEALING",
    title: "나눔·복지 공연",
    target: "요양원 · 주간보호센터 · 노인복지관 · 지역 돌봄 기관 최적화",
    summary:
      "어르신들의 정서와 호흡에 맞춘 친숙한 민요 가락과 장구·소고 신명 한마당으로, 실내 강당이나 소규모 공간에서도 안전하고 따뜻하게 즐길 수 있는 맞춤형 공연입니다.",
    highlights: [
      "어르신 함께 부르는 경기·남도 민요 및 아리랑 메들리",
      "장구·소고 합주와 흥겨운 어깨춤·박수 레크리에이션",
      "소요 시간 30~50분 (기관 일정 및 어르신 컨디션에 맞춘 유연한 구성)",
    ],
  },
  festival: {
    badge: "FESTIVAL & PROTOCOL",
    title: "축제·의전 공연",
    target: "지자체 문화축제 · 구청·시청 공식 행사 · 주한 대사관 문화교류",
    summary:
      "행사장의 품격을 높이는 힘찬 길놀이부터 사물판굿, 한국 전통연희 갈라 프로그램까지, 관객과 함께 호흡하며 한국 소리의 웅장한 결을 선보이는 공식 초청 무대입니다.",
    highlights: [
      "개막을 알리는 야외/실내 길놀이 및 비나리 축원",
      "풍물 사물판굿, 설장구 독주 및 모둠북·소고 역동적 앙상블",
      "국제 교류 및 외교 행사 맞춤형 영문·국문 레퍼토리 해설 지원",
    ],
  },
} as const;

export function RepertoireSection({
  archiveItems,
  onRequestPerformance,
}: RepertoireSectionProps) {
  const [activeTab, setActiveTab] = useState<"welfare" | "festival">("welfare");
  const [selectedItem, setSelectedItem] = useState<ArchiveItemView | null>(
    null
  );

  const currentProgram = PROGRAMS[activeTab];
  const filteredArchive = archiveItems.filter(
    (item) => item.category === activeTab
  );
  const displayArchive =
    filteredArchive.length > 0 ? filteredArchive : archiveItems;

  return (
    <section
      id="repertoire"
      data-serial-id="G03-REP-SEC01"
      data-serial-label="Section 03: Repertoire & Archive (공연 프로그램 및 갤러리)"
      className="gyeol-divider gyeol-section mx-auto max-w-5xl"
    >
      <FadeUp>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
              03 · Repertoire &amp; Archive
            </p>
            <h2 className="font-serif-kr mt-2 text-2xl font-semibold text-[#1A1917] sm:text-3xl">
              섭외 맞춤형 공연 프로그램
            </h2>
          </div>
          <p className="max-w-md text-base leading-[1.7] text-[#5C564F]">
            공연 장소의 성격과 관객에 맞추어 가장 알맞은 소리 결을 제안합니다.
          </p>
        </div>
      </FadeUp>

      {/* 프로그램 탭 전환 */}
      <div
        role="tablist"
        aria-label="공연 프로그램 유형 선택"
        className="mb-6 grid grid-cols-2 gap-3"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "welfare"}
          onClick={() => setActiveTab("welfare")}
          data-serial-id="G03-REP-TAB01"
          data-serial-label="프로그램 탭 - [나눔·복지 공연]"
          className={`min-h-[48px] border px-4 py-3 text-left transition-colors ${
            activeTab === "welfare"
              ? "border-[#4A3525] bg-[#4A3525] text-[#F6F3EC]"
              : "border-[#D8D0C5] bg-[#EAE4D7]/50 text-[#1A1917] hover:border-[#4A3525]"
          }`}
        >
          <span className="block text-[11px] tracking-widest opacity-80">
            01 · WELFARE
          </span>
          <span className="font-serif-kr text-sm font-semibold sm:text-base">
            나눔·복지 공연
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "festival"}
          onClick={() => setActiveTab("festival")}
          data-serial-id="G03-REP-TAB02"
          data-serial-label="프로그램 탭 - [축제·의전 공연]"
          className={`min-h-[48px] border px-4 py-3 text-left transition-colors ${
            activeTab === "festival"
              ? "border-[#4A3525] bg-[#4A3525] text-[#F6F3EC]"
              : "border-[#D8D0C5] bg-[#EAE4D7]/50 text-[#1A1917] hover:border-[#4A3525]"
          }`}
        >
          <span className="block text-[11px] tracking-widest opacity-80">
            02 · FESTIVAL
          </span>
          <span className="font-serif-kr text-sm font-semibold sm:text-base">
            축제·의전 공연
          </span>
        </button>
      </div>

      {/* 선택된 프로그램 상세 카드 */}
      <div
        role="tabpanel"
        className="border border-[#D8D0C5] bg-[#EAE4D7]/55 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="font-serif-en text-xs tracking-[0.2em] text-[#A63A2B] uppercase">
              {currentProgram.badge}
            </p>
            <h3 className="font-serif-kr mt-1 text-xl font-semibold text-[#1A1917] sm:text-2xl">
              {currentProgram.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-[#4A3525]">
              추천 대상: {currentProgram.target}
            </p>
            <p className="mt-4 text-base leading-[1.7] text-[#1A1917]">
              {currentProgram.summary}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#5C564F] sm:text-base">
              {currentProgram.highlights.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A63A2B]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onRequestPerformance}
              className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-6 py-3 text-sm font-semibold text-[#F6F3EC] transition-colors hover:bg-[#38271B] md:w-auto"
            >
              이 프로그램으로 공연 신청하기
            </button>
          </div>
        </div>
      </div>

      {/* 활동 아카이브 갤러리 */}
      <div className="mt-12">
        <div className="mb-5 flex items-baseline justify-between border-b border-[#D8D0C5] pb-3">
          <h3 className="font-serif-kr text-lg font-semibold text-[#1A1917] sm:text-xl">
            활동 아카이브 갤러리
          </h3>
          <span className="text-xs text-[#5C564F]">
            사진을 누르면 크게 보실 수 있습니다
          </span>
        </div>

        <div
          data-serial-id="G03-ARC-GAL01"
          data-serial-label="활동 아카이브 그리드 갤러리"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6"
        >
          {displayArchive.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              data-serial-id={`G03-ARC-ITM0${idx + 1}`}
              data-serial-label={`아카이브 사진 - ${item.title}`}
              className="group text-left focus:outline-none"
            >
              <div
                className={`relative w-full overflow-hidden border border-[#D8D0C5] bg-[#EAE4D7] ${
                  item.aspectRatio === "1:1" ? "aspect-square" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 46vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="font-serif-kr mt-2.5 text-sm font-semibold text-[#1A1917] group-hover:text-[#A63A2B] sm:text-base">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-[#5C564F] sm:text-sm">
                {item.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>

      <ArchiveLightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
