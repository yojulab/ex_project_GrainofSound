"use client";

import { MessageCircle } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import type { ActionModalType } from "@/components/layout/StickyBottomCta";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ActionCenterSectionProps {
  kakaoOpenChatUrl: string;
  onOpenModal: (type: Exclude<ActionModalType, null>) => void;
}

export function ActionCenterSection({
  kakaoOpenChatUrl,
  onOpenModal,
}: ActionCenterSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="action"
      data-serial-id="G05-ACT-SEC01"
      data-serial-label="Section 05: Action Center (문의 및 신청)"
      className="gyeol-divider gyeol-section mx-auto max-w-5xl"
    >
      <FadeUp>
        <div className="mb-10 text-center">
          <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
            {t.actionCenter.sectionNum}
          </p>
          <h2 className="font-serif-kr mt-2 text-2xl font-semibold text-[#262523] sm:text-3xl">
            {t.actionCenter.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-[1.7] text-[#5C564F]">
            {t.actionCenter.description}
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <button
          type="button"
          onClick={() => onOpenModal("performance")}
          data-serial-id="G05-ACT-BTN01"
          data-serial-label="Action Center - [공연 신청하기] 모달 호출 버튼"
          className="flex min-h-[112px] flex-col justify-between border border-[#4A3525] bg-[#4A3525] p-6 text-left text-[#F9F7F2] transition-colors hover:bg-[#38271B]"
        >
          <span className="font-serif-en text-xs tracking-[0.18em] opacity-80 uppercase">
            {t.actionCenter.cards.performance.step}
          </span>
          <div>
            <span className="font-serif-kr block text-lg font-semibold">
              {t.actionCenter.cards.performance.title}
            </span>
            <span className="mt-1 block text-xs text-[#EFECE4]">
              {t.actionCenter.cards.performance.desc}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal("member")}
          data-serial-id="G05-ACT-BTN02"
          data-serial-label="Action Center - [일반회원(단원) 지원] 모달 호출 버튼"
          className="flex min-h-[112px] flex-col justify-between border border-[#4A3525] bg-[#EFECE4]/70 p-6 text-left text-[#262523] transition-colors hover:bg-[#EFECE4]"
        >
          <span className="font-serif-en text-xs tracking-[0.18em] text-[#4A3525] uppercase">
            {t.actionCenter.cards.member.step}
          </span>
          <div>
            <span className="font-serif-kr block text-lg font-semibold">
              {t.actionCenter.cards.member.title}
            </span>
            <span className="mt-1 block text-xs text-[#5C564F]">
              {t.actionCenter.cards.member.desc}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal("supporter")}
          data-serial-id="G05-ACT-BTN03"
          data-serial-label="Action Center - [후원회원 가입 문의] 모달 호출 버튼"
          className="flex min-h-[112px] flex-col justify-between border border-[#A63A2B] bg-[#F9F7F2] p-6 text-left text-[#262523] transition-colors hover:bg-[#EFECE4]/60"
        >
          <span className="font-serif-en text-xs tracking-[0.18em] text-[#A63A2B] uppercase">
            {t.actionCenter.cards.supporter.step}
          </span>
          <div>
            <span className="font-serif-kr block text-lg font-semibold text-[#A63A2B]">
              {t.actionCenter.cards.supporter.title}
            </span>
            <span className="mt-1 block text-xs text-[#5C564F]">
              {t.actionCenter.cards.supporter.desc}
            </span>
          </div>
        </button>
      </div>

      {/* 카카오톡 오픈채팅 직결 배너 */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 border border-[#D8D0C5] bg-[#EFECE4]/45 p-5 sm:flex-row sm:px-7">
        <div className="text-center sm:text-left">
          <p className="font-serif-kr text-base font-semibold text-[#262523]">
            {t.actionCenter.kakao.title}
          </p>
          <p className="mt-0.5 text-sm text-[#5C564F]">
            {t.actionCenter.kakao.desc}
          </p>
        </div>

        <a
          href={kakaoOpenChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-serial-id="G05-ACT-KAKAO01"
          data-serial-label="카카오톡 오픈채팅 1:1 직통 연결 버튼"
          className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-[#262523] px-5 py-3 text-sm font-semibold text-[#F9F7F2] transition-colors hover:bg-[#4A3525] sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{t.actionCenter.kakao.button}</span>
        </a>
      </div>
    </section>
  );
}
