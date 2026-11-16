"use client";

import { FadeUp } from "@/components/motion/FadeUp";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      data-serial-id="G02-ABT-SEC01"
      data-serial-label="Section 02: About 단체 소개"
      className="gyeol-divider gyeol-section mx-auto max-w-5xl"
    >
      <FadeUp>
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
              {t.about.sectionNum}
            </p>
            <h2
              data-serial-id="G02-ABT-TTL01"
              data-serial-label="About 섹션 타이틀"
              className="font-serif-kr mt-2 text-2xl font-semibold leading-snug text-[#262523] sm:text-3xl"
            >
              {t.about.titleLine1}
              <br className="sm:hidden" /> {t.about.titleLine2}
            </h2>
          </div>
          <p className="max-w-md text-base leading-[1.7] text-[#5C564F]">
            {t.about.description}
          </p>
        </div>
      </FadeUp>

      {/* 활동 발자취 소셜 프루프 스탯 (48회+ 나눔공연, 2,400명+ 온기, 16명 단원) */}
      <FadeUp delayMs={60}>
        <div
          data-serial-id="G02-STA-SEC01"
          data-serial-label="활동 발자취 소셜 프루프 스탯"
          className="mb-12 grid grid-cols-1 divide-y divide-[#D8D0C5] border border-[#D8D0C5] bg-[#EFECE4]/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {t.about.stats.map((stat, idx) => (
            <div
              key={idx}
              data-serial-id={`G02-STA-CRD0${idx + 1}`}
              data-serial-label={stat.label}
              className="p-6 text-center sm:p-7"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-serif-en text-3xl font-semibold tracking-tight text-[#4A3525] sm:text-4xl">
                  {stat.num}
                </span>
                <span className="text-sm font-medium text-[#A63A2B]">
                  {stat.unit}
                </span>
              </div>
              <p className="font-serif-kr mt-2 text-base font-semibold text-[#262523]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-[#5C564F] leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* 3대 핵심 가치 카드 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {t.about.values.map((item, index) => (
          <FadeUp key={item.num} delayMs={index * 90}>
            <article
              data-serial-id={`G02-VAL-CRD0${index + 1}`}
              data-serial-label={`핵심 가치 카드 - ${item.title}`}
              className="flex h-full flex-col justify-between border border-[#D8D0C5] bg-[#EFECE4]/60 p-6 transition-colors hover:border-[#4A3525] sm:p-7"
            >
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-[#D8D0C5] pb-3">
                  <span className="font-serif-en text-lg italic text-[#4A3525]">
                    {item.num}
                  </span>
                  <span className="font-serif-en text-xs tracking-[0.15em] text-[#5C564F] uppercase">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="font-serif-kr text-xl font-semibold text-[#262523]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-[#5C564F]">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs tracking-wider text-[#4A3525]">
                <span className="h-px w-6 bg-[#A63A2B]" />
                <span className="font-serif-en">THE GRAIN OF SOUND</span>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
