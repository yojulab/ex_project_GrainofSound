import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="hero"
      data-serial-id="G01-HERO-SEC01"
      data-serial-label="Section 01: Hero 도입부 (100dvh)"
      className="relative flex min-h-[100dvh] flex-col items-center justify-between overflow-hidden bg-[#F6F3EC] px-5 pt-10 pb-24 md:px-8 md:pt-14 md:pb-16"
    >
      {/* 배경 풀폭 세피아/먹선 아트워크 */}
      <div
        data-serial-id="G01-HERO-VIS01"
        data-serial-label="Hero 장구·소고 세피아 먹선 풀폭 비주얼"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-janggu-ink.webp"
          alt="나무와 가죽, 전통 장구와 소고의 결을 담은 연희단 결 세피아 먹선 비주얼"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20 sepia-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F3EC]/85 via-[#F6F3EC]/55 to-[#F6F3EC]" />
      </div>

      {/* 상단 에디토리얼 메타 라인 */}
      <div className="relative z-10 flex w-full max-w-4xl items-center justify-between border-b border-[#D8D0C5] pb-3 text-xs tracking-[0.18em] text-[#5C564F] uppercase">
        <span>BUCHEON · NON-PROFIT TRADITIONAL ARTS</span>
        <span className="font-serif-kr">연희단 결</span>
      </div>

      {/* 중앙 메인 타이틀 & 장구·소고 먹선 드로잉 */}
      <div className="relative z-10 my-auto flex max-w-3xl flex-col items-center py-8 text-center">
        {/* 장구·소고 미니멀 먹선 SVG 아트워크 */}
        <svg
          viewBox="0 0 240 100"
          className="mb-6 h-20 w-48 text-[#1A1917] opacity-85 md:h-24 md:w-56"
          fill="none"
          aria-hidden="true"
        >
          {/* 장구 실루엣 먹선 */}
          <path
            d="M45 25 C65 25, 85 45, 110 50 C135 55, 155 75, 175 75"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M45 75 C65 75, 85 55, 110 50 C135 45, 155 25, 175 25"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <ellipse cx="45" cy="50" rx="8" ry="25" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="175" cy="50" rx="8" ry="25" stroke="currentColor" strokeWidth="1.2" />
          {/* 조임줄 (부전) */}
          <path
            d="M52 30 L168 70 M52 70 L168 30 M85 38 L85 62 M135 38 L135 62"
            stroke="#5C564F"
            strokeWidth="0.8"
          />
          {/* 열채와 궁채 먹선 */}
          <line x1="25" y1="82" x2="95" y2="18" stroke="#4A3525" strokeWidth="1.1" />
          <circle cx="198" cy="52" r="14" stroke="#A63A2B" strokeWidth="1.1" />
          <line x1="198" y1="66" x2="198" y2="88" stroke="#4A3525" strokeWidth="1.4" />
        </svg>

        <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[#A63A2B] uppercase">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#A63A2B]" />
          GYEOL : THE GRAIN OF SOUND
        </p>

        <h1
          data-serial-id="G01-HERO-TTL01"
          data-serial-label="Hero 메인 영문 슬로건 (The Grain of Sound, GYEOL)"
          className="font-serif-en text-4xl font-normal leading-[1.12] tracking-tight text-[#1A1917] sm:text-5xl md:text-6xl"
        >
          The Grain of Sound,
          <br />
          <span className="italic text-[#4A3525]">GYEOL</span>
        </h1>

        <p
          data-serial-id="G01-HERO-TXT01"
          data-serial-label="Hero 국문 서브 카피"
          className="font-serif-kr mt-6 max-w-xl text-base leading-[1.75] text-[#1A1917] sm:text-lg"
        >
          나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결
        </p>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5C564F] sm:text-base">
          부천을 거점으로 전통연희의 울림을 이웃과 세계에 나누는 비영리 예술
          공동체 연희단 결입니다.
        </p>
      </div>

      {/* 하단 스크롤 유도 인디케이터 */}
      <a
        href="#about"
        data-serial-id="G01-HERO-SCR01"
        data-serial-label="Hero 하단 스크롤 유도 인디케이터"
        className="relative z-10 flex flex-col items-center gap-2 text-[11px] tracking-[0.22em] text-[#5C564F] uppercase transition-colors hover:text-[#1A1917]"
      >
        <span>Scroll to Explore</span>
        <span className="scroll-line-anim h-8 w-px bg-[#4A3525]" />
      </a>
    </section>
  );
}
