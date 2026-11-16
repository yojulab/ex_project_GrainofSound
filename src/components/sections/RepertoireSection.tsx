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
    key: "welfare",
    tabNum: "01",
    tabEn: "WELFARE",
    tabKo: "요양원 힐링 연희",
    badge: "WELFARE & HEALING",
    title: "요양원 힐링 연희",
    target: "요양원 · 주간보호센터 · 노인복지관 · 지역 돌봄 소외 이웃 최적화",
    summary:
      "어르신들의 정서와 호흡에 맞춘 친숙한 민요 가락과 장구·소고 신명 한마당으로, 실내 강당이나 소규모 병동 공간에서도 안전하고 따뜻하게 즐길 수 있는 맞춤형 치유 나눔 공연입니다.",
    highlights: [
      "어르신 함께 부르는 경기·남도 민요 및 아리랑 메들리",
      "장구·소고 합주와 흥겨운 어깨춤·박수 레크리에이션",
      "소요 시간 30~50분 (기관 일정 및 어르신 컨디션에 맞춘 유연한 구성)",
      "이동이 불편하신 어르신들을 위한 좌석 맞춤형 동선 조율",
    ],
  },
  festival: {
    key: "festival",
    tabNum: "02",
    tabEn: "FESTIVAL",
    tabKo: "길놀이·판굿",
    badge: "FESTIVAL & PROTOCOL",
    title: "길놀이·판굿",
    target: "지자체 문화축제 · 구청·시청 공식 행사 · 주한 대사관 문화교류",
    summary:
      "행사장의 품격을 높이는 힘찬 길놀이부터 사물판굿, 한국 전통연희 갈라 프로그램까지, 관객과 함께 호흡하며 한국 소리의 웅장한 결을 선보이는 공식 초청 무대입니다.",
    highlights: [
      "개막을 알리는 야외/실내 길놀이 및 비나리 축원",
      "풍물 사물판굿, 설장구 독주 및 모둠북·소고 역동적 앙상블",
      "국제 교류 및 외교 행사 맞춤형 영문·국문 레퍼토리 해설 지원",
      "관객이 참여하는 대동놀이 및 피날레 어울림",
    ],
  },
  workshop: {
    key: "workshop",
    tabNum: "03",
    tabEn: "WORKSHOP",
    tabKo: "글로벌 청소년 워크숍",
    badge: "WORKSHOP & EXCHANGE",
    title: "글로벌 청소년 워크숍",
    target: "초·중·고교 예술 교육 · 다문화 가정 및 주한 외국인 체험 · 재외동포 청소년",
    summary:
      "눈으로 보는 공연을 넘어 직접 장구와 버나를 돌리고 추임새를 배우는 참여형 워크숍입니다. 언어의 장벽을 넘어 우리 장단의 신명과 공동체 호흡을 온몸으로 체득할 수 있습니다.",
    highlights: [
      "기초 자진모리·휘모리 장단 타구 및 버나 돌리기 체험",
      "우리 가락의 호흡과 원리를 쉽게 풀어내는 해설형 예술 강습",
      "영어·한국어 이중 해설 및 단체 수료증/기념 굿즈 제공 가능",
      "학교 및 청소년 기관 일정에 맞춘 40~90분 맞춤형 모듈",
    ],
  },
} as const;

type ProgramKey = keyof typeof PROGRAMS;

export function RepertoireSection({
  archiveItems,
  onRequestPerformance,
}: RepertoireSectionProps) {
  const [activeTab, setActiveTab] = useState<ProgramKey>("welfare");
  const [selectedItem, setSelectedItem] = useState<ArchiveItemView | null>(null);

  const currentProgram = PROGRAMS[activeTab];

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
            subtitle: "지역 돌봄 센터 초청",
            description: "온 세대가 함께 손뼉 치며 흥을 나눈 어울림 자리입니다.",
            imageUrl: "/images/archive/welfare-3.webp",
            imageAlt: "돌봄 센터 어울림 마당 현장",
            aspectRatio: "4:5" as const,
          },
          {
            id: "f-4",
            category: "festival" as const,
            title: "축제의 서막을 여는 힘찬 길놀이",
            subtitle: "부천 문화축제 식전 길놀이",
            description: "축제의 번영과 시민의 안녕을 기원하는 행렬입니다.",
            imageUrl: "/images/archive/festival-1.webp",
            imageAlt: "문화축제 길놀이 현장",
            aspectRatio: "4:5" as const,
          },
          {
            id: "f-5",
            category: "festival" as const,
            title: "한국 소리의 결을 전하는 공식 갈라",
            subtitle: "외교·기관 초청 전통연희 갈라",
            description: "한국 전통 타악의 미학을 전한 공식 의전 무대입니다.",
            imageUrl: "/images/archive/festival-2.webp",
            imageAlt: "기관 초청 문화교류 갈라 무대",
            aspectRatio: "1:1" as const,
          },
          {
            id: "f-6",
            category: "festival" as const,
            title: "사물판굿과 소고놀음의 정수",
            subtitle: "지자체 광장 야외 본공연",
            description: "웅장한 타악과 역동적인 춤사위가 어우러진 신명판입니다.",
            imageUrl: "/images/archive/festival-3.webp",
            imageAlt: "야외 광장 사물판굿 현장",
            aspectRatio: "4:5" as const,
          },
        ];

  return (
    <section
      id="repertoire"
      data-serial-id="G03-REP-SEC01"
      data-serial-label="Section 03: Repertoire & Archive 전시 도록"
      className="gyeol-divider gyeol-section mx-auto max-w-5xl"
    >
      <FadeUp>
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
              03 · Exhibition Catalog & Repertoire
            </p>
            <h2
              data-serial-id="G03-REP-TTL01"
              data-serial-label="Repertoire 섹션 타이틀"
              className="font-serif-kr mt-2 text-2xl font-semibold leading-snug text-[#262523] sm:text-3xl"
            >
              공간과 사람에 맞추어 빚어내는
              <br className="sm:hidden" /> 3대 연희 레퍼토리
            </h2>
          </div>
          <p className="max-w-md text-base leading-[1.7] text-[#5C564F]">
            단아한 치유의 소리부터 웅장한 축제 판굿, 청소년 예술 워크숍까지
            무대의 크기와 관객의 성격에 최적화된 맞춤 구성을 제공합니다.
          </p>
        </div>
      </FadeUp>

      {/* 3대 프로그램 탭 */}
      <div
        role="tablist"
        aria-label="공연 프로그램 분류"
        className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
      >
        {(Object.keys(PROGRAMS) as ProgramKey[]).map((key) => {
          const prog = PROGRAMS[key];
          const isSelected = activeTab === key;
          return (
            <button
              key={key}
              type="button"
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
              추천 대상: {currentProgram.target}
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
              이 프로그램으로 공연 신청하기
            </button>
          </div>
        </div>
      </div>

      {/* 활동 아카이브 갤러리 그리드 */}
      <div className="mt-12">
        <div className="mb-5 flex items-baseline justify-between border-b border-[#D8D0C5] pb-3">
          <h3 className="font-serif-kr text-lg font-semibold text-[#262523] sm:text-xl">
            전시 도록 아카이브 갤러리
          </h3>
          <span className="text-xs text-[#5C564F]">
            사진을 누르면 상세 도록 캡션을 보실 수 있습니다
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
