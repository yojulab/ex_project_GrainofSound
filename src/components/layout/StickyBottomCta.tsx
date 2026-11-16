"use client";

export type ActionModalType = "performance" | "member" | "supporter" | null;

interface StickyBottomCtaProps {
  onOpenModal: (type: Exclude<ActionModalType, null>) => void;
}

export function StickyBottomCta({ onOpenModal }: StickyBottomCtaProps) {
  return (
    <div
      data-serial-id="G00-STK-BAR01"
      data-serial-label="모바일 최하단 고정 3대 액션 바 (Sticky Bottom CTA)"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#D8D0C5] bg-[#F9F7F2]/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(38,37,35,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 px-3 py-2.5 md:gap-3 md:px-6">
        <button
          type="button"
          onClick={() => onOpenModal("performance")}
          data-serial-id="G00-STK-BTN01"
          data-serial-label="하단 고정 바 - [공연 신청하기]"
          className="min-h-[48px] rounded-sm bg-[#4A3525] px-2 py-2 text-xs font-semibold text-[#F9F7F2] transition-colors hover:bg-[#38271B] active:scale-[0.99] sm:text-sm"
        >
          공연 신청하기
        </button>
        <button
          type="button"
          onClick={() => onOpenModal("member")}
          data-serial-id="G00-STK-BTN02"
          data-serial-label="하단 고정 바 - [일반회원(단원) 지원]"
          className="min-h-[48px] rounded-sm border border-[#4A3525] bg-[#F9F7F2] px-2 py-2 text-xs font-semibold text-[#4A3525] transition-colors hover:bg-[#EFECE4] active:scale-[0.99] sm:text-sm"
        >
          단원 지원
        </button>
        <button
          type="button"
          onClick={() => onOpenModal("supporter")}
          data-serial-id="G00-STK-BTN03"
          data-serial-label="하단 고정 바 - [후원회원 가입 문의]"
          className="min-h-[48px] rounded-sm border border-[#A63A2B] bg-[#F9F7F2] px-2 py-2 text-xs font-semibold text-[#A63A2B] transition-colors hover:bg-[#A63A2B] hover:text-[#F9F7F2] active:scale-[0.99] sm:text-sm"
        >
          후원 문의
        </button>
      </div>
    </div>
  );
}
