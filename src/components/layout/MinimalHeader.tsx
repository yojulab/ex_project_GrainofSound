"use client";

export function MinimalHeader() {
  return (
    <header
      data-serial-id="G00-HDR-BAR01"
      data-serial-label="상단 미니멀 헤더 바"
      className="sticky top-0 z-30 border-b border-[#D8D0C5] bg-[#F6F3EC]/92 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:px-8">
        <a
          href="#hero"
          data-serial-id="G00-HDR-LOGO01"
          data-serial-label="상단 미니멀 로고 (연희단 결 | GYEOL)"
          className="flex items-center gap-2 text-[#1A1917] transition-opacity hover:opacity-75"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center border border-[#A63A2B] text-[10px] font-bold text-[#A63A2B]">
            結
          </span>
          <span className="font-serif-kr text-sm font-semibold tracking-wide md:text-base">
            연희단 결
          </span>
          <span className="text-[#D8D0C5]" aria-hidden="true">
            |
          </span>
          <span className="font-serif-en text-sm tracking-[0.14em] text-[#5C564F] uppercase">
            GYEOL
          </span>
        </a>

        <nav
          data-serial-id="G00-HDR-NAV01"
          data-serial-label="원페이지 섹션 앵커 내비게이션"
          aria-label="섹션 바로가기"
          className="flex items-center gap-4 text-xs font-medium text-[#5C564F] sm:gap-6 sm:text-sm"
        >
          <a href="#about" className="py-1 transition-colors hover:text-[#1A1917]">
            소개
          </a>
          <a
            href="#repertoire"
            className="py-1 transition-colors hover:text-[#1A1917]"
          >
            프로그램
          </a>
          <a href="#join" className="py-1 transition-colors hover:text-[#1A1917]">
            함께하기
          </a>
          <a
            href="#action"
            className="rounded-sm border border-[#4A3525] px-2.5 py-1 text-[#4A3525] transition-colors hover:bg-[#4A3525] hover:text-[#F6F3EC]"
          >
            문의·신청
          </a>
        </nav>
      </div>
    </header>
  );
}
