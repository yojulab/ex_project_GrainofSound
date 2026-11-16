"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";
import {
  ArchiveLightboxModal,
  type ArchiveItemView,
} from "@/components/modals/ArchiveLightboxModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface RepertoireSectionProps {
  archiveItems: ArchiveItemView[];
  onRequestPerformance: () => void;
}

type ProgramKey = "welfare" | "festival" | "workshop";

export function RepertoireSection({
  archiveItems,
  onRequestPerformance,
}: RepertoireSectionProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ProgramKey>("welfare");
  const [selectedItem, setSelectedItem] = useState<ArchiveItemView | null>(null);

  const programs = t.repertoire.programs;
  const currentProgram = programs[activeTab];
  const programKeys: ProgramKey[] = ["welfare", "festival", "workshop"];

  // 갤러리 기본 데이터
  const displayArchive =
    archiveItems.length > 0
      ? archiveItems
      : [
          {
            id: "f-1",
            category: "welfare" as const,
            title: "어르신과 함께하는 신명 민요 한마당",
            subtitle: "부천시 노인복지관 나눔 공연",
            description: "어르신들과 함께 호흡하며 부른 정겨운 민요 무대입니다.",
            imageUrl: "/images/archive/welfare-1.webp",
            imageAlt: "부천시 복지관 나눔 공연 현장",
            aspectRatio: "4:5" as const,
          },
          {
            id: "f-2",
            category: "welfare" as const,
            title: "찾아가는 치유의 장구·소고 합주",
            subtitle: "부천 요양원 실내 위문 공연",
            description: "안전하고 정갈한 소리로 전한 치유의 장단입니다.",
            imageUrl: "/images/archive/welfare-2.webp",
            imageAlt: "요양원 실내 장구 합주 현장",
            aspectRatio: "1:1" as const,
          },
          {
            id: "f-3",
            category: "welfare" as const,
            title: "세대를 잇는 어울림 박수 마당",
            subtitle: "주간보호센터 효 사랑 연희",
            description: "어르신들의 손뼉과 어깨춤이 이어진 따뜻한 교감의 시간.",
            imageUrl: "/images/archive/welfare-3.webp",
            imageAlt: "어르신 손뼉 치는 위문 공연",
            aspectRatio: "4:5" as const,
          },
          {
            id: "f-4",
            category: "festival" as const,
            title: "거리의 흥을 깨우는 길놀이 행렬",
            subtitle: "부천시 시민 문화축제 개막식",
            description: "길을 열고 복을 비는 힘찬 사물 풍물 행렬입니다.",
            imageUrl: "/images/archive/festival-1.webp",
            imageAlt: "시민 축제 개막 길놀이",
            aspectRatio: "1:1" as const,
          },
          {
            id: "f-5",
            category: "festival" as const,
            title: "사물판굿과 설장구 독주",
            subtitle: "지자체 공식 초청 문화행사",
            description: "단아하면서도 폭발적인 전통 가락의 정수를 선보였습니다.",
            imageUrl: "/images/archive/festival-2.webp",
            imageAlt: "설장구 역동적 연주 무대",
            aspectRatio: "4:5" as const,
          },
          {
            id: "f-6",
            category: "festival" as const,
            title: "세계인과 호흡하는 판굿 앙상블",
            subtitle: "주한 대사관 문화교류 리셉션",
            description: "외교 사절 및 글로벌 청소년과 함께 나눈 우리 소리의 결.",
            imageUrl: "/images/archive/festival-3.webp",
            imageAlt: "주한 외교 사절 문화교류 공연",
            aspectRatio: "1:1" as const,
          },
        ];

  return (
    <section
      id="repertoire"
      data-serial-id="G03-REP-SEC01"
      data-serial-label="Section 03: Repertoire & Catalog 전시 도록"
      className="gyeol-divider gyeol-section mx-auto max-w-5xl"
    >
      <FadeUp>
        <div className="mb-10">
          <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
            {t.repertoire.sectionNum}
          </p>
          <h2
            data-serial-id="G03-REP-TTL01"
            data-serial-label="Repertoire 섹션 타이틀"
            className="font-serif-kr mt-2 text-2xl font-semibold text-[#262523] sm:text-3xl"
          >
            {t.repertoire.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-[1.7] text-[#5C564F]">
            {t.repertoire.description}
          </p>
        </div>
      </FadeUp>

      {/* 3대 프로그램 탭 셀렉터 */}
      <div
        role="tablist"
        aria-label="3대 대표 프로그램 선택"
        className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3"
      >
        {programKeys.map((key) => {
          const prog = programs[key];
          const isSelected = activeTab === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTab(key)}
              data-serial-id={`G03-REP-TAB-${key}`}
              data-serial-label={`프로그램 탭 - [${prog.title}]`}
              className={`min-h-[52px] border px-4 py-3 text-left transition-colors ${
                isSelected
                  ? "border-[#4A3525] bg-[#4A3525] text-[#F9F7F2] shadow-xs"
                  : "border-[#D8D0C5] bg-[#EFECE4]/50 text-[#262523] hover:border-[#4A3525] hover:bg-[#EFECE4]"
              }`}
            >
              <span className="block text-[11px] tracking-widest opacity-80 font-serif-en">
                {prog.tabNum} · {prog.tabEn}
              </span>
              <span className="font-serif-kr text-sm font-semibold sm:text-base">
                {prog.tabKo}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 프로그램 상세 전시 도록 카드 */}
      <div
        role="tabpanel"
        className="border border-[#D8D0C5] bg-[#EFECE4]/60 p-6 sm:p-8 transition-all"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="font-serif-en text-xs tracking-[0.2em] text-[#A63A2B] uppercase font-semibold">
              {currentProgram.badge}
            </p>
            <h3 className="font-serif-kr mt-1.5 text-xl font-semibold text-[#262523] sm:text-2xl">
              {currentProgram.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-[#4A3525]">
              {t.repertoire.targetLabel}
              {currentProgram.target}
            </p>
            <p className="mt-4 text-base leading-[1.7] text-[#262523]">
              {currentProgram.summary}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-[#5C564F] sm:text-base">
              {currentProgram.highlights.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A63A2B]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onRequestPerformance}
              className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-6 py-3 text-sm font-semibold text-[#F9F7F2] transition-colors hover:bg-[#38271B] md:w-auto"
            >
              {t.repertoire.applyButton}
            </button>
          </div>
        </div>
      </div>

      {/* 활동 아카이브 갤러리 그리드 */}
      <div className="mt-12">
        <div className="mb-5 flex items-baseline justify-between border-b border-[#D8D0C5] pb-3">
          <h3 className="font-serif-kr text-lg font-semibold text-[#262523] sm:text-xl">
            {t.repertoire.galleryTitle}
          </h3>
          <span className="text-xs text-[#5C564F]">
            {t.repertoire.galleryHint}
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
                className={`relative w-full overflow-hidden border border-[#D8D0C5] bg-[#EFECE4] ${
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
              <p className="font-serif-kr mt-2.5 text-sm font-semibold text-[#262523] group-hover:text-[#A63A2B] sm:text-base">
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
