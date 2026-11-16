"use client";

import { IdCard } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface MinimalHeaderProps {
  onOpenDigitalCard?: () => void;
}

export function MinimalHeader({ onOpenDigitalCard }: MinimalHeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header
      data-serial-id="G00-HDR-BAR01"
      data-serial-label="상단 미니멀 헤더 바"
      className="sticky top-0 z-30 border-b border-[#D8D0C5] bg-[#F9F7F2]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:px-8">
        <a
          href="#hero"
          data-serial-id="G00-HDR-LOGO01"
          data-serial-label="상단 미니멀 로고 (연희단 결 | GYEOL)"
          className="flex items-center gap-2 text-[#262523] transition-opacity hover:opacity-75"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center border border-[#A63A2B] text-[10px] font-bold text-[#A63A2B]">
            結
          </span>
          <span className="font-serif-kr text-sm font-semibold tracking-wide md:text-base">
            {t.common.siteTitle}
          </span>
          <span className="text-[#D8D0C5]" aria-hidden="true">
            |
          </span>
          <span className="font-serif-en text-sm tracking-[0.14em] text-[#5C564F] uppercase">
            {t.common.siteEn}
          </span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav
            data-serial-id="G00-HDR-NAV01"
            data-serial-label="원페이지 섹션 앵커 내비게이션"
            aria-label={t.header.ariaNav}
            className="flex items-center gap-3 text-xs font-medium text-[#5C564F] sm:gap-5 sm:text-sm"
          >
            <a href="#about" className="py-1 transition-colors hover:text-[#262523]">
              {t.header.navAbout}
            </a>
            <a
              href="#repertoire"
              className="py-1 transition-colors hover:text-[#262523]"
            >
              {t.header.navRepertoire}
            </a>
            <a href="#join" className="py-1 transition-colors hover:text-[#262523]">
              {t.header.navJoin}
            </a>
            <a
              href="#action"
              className="hidden sm:inline-block rounded-sm border border-[#4A3525] px-2.5 py-1 text-[#4A3525] transition-colors hover:bg-[#4A3525] hover:text-[#F9F7F2]"
            >
              {t.header.navAction}
            </a>
          </nav>

          {/* 언어 전환기 (KO | FR) */}
          <div
            data-serial-id="G00-HDR-LANG01"
            data-serial-label="상단 헤더 언어 스위처 (KO | FR)"
            className="flex items-center gap-1.5 text-xs font-serif-en tracking-wider"
          >
            <button
              type="button"
              onClick={() => setLanguage("ko")}
              data-serial-id="G00-HDR-BTN-KO"
              data-serial-label="한국어 언어 선택 버튼"
              aria-pressed={language === "ko"}
              className={
                language === "ko"
                  ? "text-[#262523] font-semibold underline underline-offset-4 decoration-1"
                  : "text-[#7A756D] hover:text-[#262523] transition-colors duration-200"
              }
            >
              KO
            </button>
            <span className="text-[#D8D0C5] select-none" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => setLanguage("fr")}
              data-serial-id="G00-HDR-BTN-FR"
              data-serial-label="프랑스어 언어 선택 버튼"
              aria-pressed={language === "fr"}
              className={
                language === "fr"
                  ? "text-[#262523] font-semibold underline underline-offset-4 decoration-1"
                  : "text-[#7A756D] hover:text-[#262523] transition-colors duration-200"
              }
            >
              FR
            </button>
          </div>

          {onOpenDigitalCard && (
            <button
              type="button"
              onClick={onOpenDigitalCard}
              data-serial-id="G00-HDR-BTN-CARD"
              data-serial-label="상단 헤더 - [디지털 명함] 버튼"
              className="flex items-center gap-1.5 rounded-sm border border-[#A63A2B] bg-[#F9F7F2] px-2.5 py-1 text-xs font-semibold text-[#A63A2B] transition-colors hover:bg-[#A63A2B] hover:text-[#F9F7F2]"
            >
              <IdCard className="h-3.5 w-3.5" />
              <span>{t.header.digitalCard}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
