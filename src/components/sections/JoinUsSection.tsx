"use client";

import { FadeUp } from "@/components/motion/FadeUp";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface JoinUsSectionProps {
  onOpenMemberModal: () => void;
  onOpenSupporterModal: () => void;
}

export function JoinUsSection({
  onOpenMemberModal,
  onOpenSupporterModal,
}: JoinUsSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="join"
      data-serial-id="G04-JOIN-SEC01"
      data-serial-label="Section 04: Join Us (함께하는 길)"
      className="gyeol-divider gyeol-section mx-auto max-w-5xl"
    >
      <FadeUp>
        <div className="mb-10">
          <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
            {t.joinUs.sectionNum}
          </p>
          <h2 className="font-serif-kr mt-2 text-2xl font-semibold text-[#262523] sm:text-3xl">
            {t.joinUs.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-[1.7] text-[#5C564F]">
            {t.joinUs.description}
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 일반단원 모집 안내 */}
        <FadeUp delayMs={60}>
          <article
            data-serial-id="G04-JOIN-CRD01"
            data-serial-label="일반단원(연주 단원) 모집 안내 카드"
            className="flex h-full flex-col justify-between border border-[#D8D0C5] bg-[#EFECE4]/55 p-6 sm:p-8"
          >
            <div>
              <p className="font-serif-en text-xs tracking-[0.18em] text-[#4A3525] uppercase">
                {t.joinUs.memberCard.subtitle}
              </p>
              <h3 className="font-serif-kr mt-1.5 text-xl font-semibold text-[#262523]">
                {t.joinUs.memberCard.title}
              </h3>
              <p className="mt-3 text-base leading-[1.7] text-[#5C564F]">
                {t.joinUs.memberCard.description}
              </p>
              <ul className="mt-4 space-y-2 border-t border-[#D8D0C5] pt-4 text-sm leading-relaxed text-[#5C564F] sm:text-base">
                {t.joinUs.memberCard.points.map((pt, i) => (
                  <li key={i}>• {pt}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenMemberModal}
                className="min-h-[48px] w-full rounded-sm border border-[#4A3525] bg-[#F9F7F2] px-5 py-3 text-sm font-semibold text-[#4A3525] transition-colors hover:bg-[#4A3525] hover:text-[#F9F7F2]"
              >
                {t.joinUs.memberCard.button}
              </button>
            </div>
          </article>
        </FadeUp>

        {/* 후원회원(서포터즈) 안내 */}
        <FadeUp delayMs={140}>
          <article
            data-serial-id="G04-JOIN-CRD02"
            data-serial-label="후원회원(서포터즈) 안내 카드"
            className="flex h-full flex-col justify-between border border-[#D8D0C5] bg-[#EFECE4]/55 p-6 sm:p-8"
          >
            <div>
              <p className="font-serif-en text-xs tracking-[0.18em] text-[#A63A2B] uppercase">
                {t.joinUs.supporterCard.subtitle}
              </p>
              <h3 className="font-serif-kr mt-1.5 text-xl font-semibold text-[#262523]">
                {t.joinUs.supporterCard.title}
              </h3>
              <p className="mt-3 text-base leading-[1.7] text-[#5C564F]">
                {t.joinUs.supporterCard.description}
              </p>
              <ul className="mt-4 space-y-2 border-t border-[#D8D0C5] pt-4 text-sm leading-relaxed text-[#5C564F] sm:text-base">
                {t.joinUs.supporterCard.points.map((pt, i) => (
                  <li key={i}>• {pt}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenSupporterModal}
                className="min-h-[48px] w-full rounded-sm border border-[#A63A2B] bg-[#F9F7F2] px-5 py-3 text-sm font-semibold text-[#A63A2B] transition-colors hover:bg-[#A63A2B] hover:text-[#F9F7F2]"
              >
                {t.joinUs.supporterCard.button}
              </button>
            </div>
          </article>
        </FadeUp>
      </div>
    </section>
  );
}
