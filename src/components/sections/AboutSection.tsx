import { FadeUp } from "@/components/motion/FadeUp";

const SOCIAL_STATS = [
  {
    id: "G02-STA-CRD01",
    num: "48+",
    unit: "회",
    label: "누적 나눔·복지 공연",
    description: "요양원·복지관 소외 이웃과 함께한 따뜻한 무대",
  },
  {
    id: "G02-STA-CRD02",
    num: "2,400+",
    unit: "명",
    label: "함께 나눈 온기",
    description: "전통 장단과 소리로 마주한 소중한 관객과 이웃",
  },
  {
    id: "G02-STA-CRD03",
    num: "16",
    unit: "명",
    label: "활동 단원",
    description: "땀과 호흡으로 결을 이어가는 열정의 전통 예술인",
  },
] as const;

const CORE_VALUES = [
  {
    id: "G02-VAL-CRD01",
    num: "01",
    title: "나눔의 결",
    subtitle: "Healing & Sharing",
    description:
      "요양원·복지관 등 문화 소외 이웃을 직접 찾아가 어르신과 이웃의 마음에 따뜻한 치유와 신명의 무대를 전합니다.",
  },
  {
    id: "G02-VAL-CRD02",
    num: "02",
    title: "교류의 결",
    subtitle: "Cultural Exchange",
    description:
      "지자체 공식 축제, 주한 대사관 문화교류 행사 등 한국 전통연희의 단아하고 역동적인 미를 알리는 초청 무대를 빚습니다.",
  },
  {
    id: "G02-VAL-CRD03",
    num: "03",
    title: "이음의 결",
    subtitle: "Open Community",
    description:
      "전통문화의 맥을 잇고 청소년 예술 활동과 지역 연주자들의 숨결이 어우러지는 열린 비영리 예술 공동체를 지향합니다.",
  },
] as const;

export function AboutSection() {
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
              02 · About GYEOL
            </p>
            <h2
              data-serial-id="G02-ABT-TTL01"
              data-serial-label="About 섹션 타이틀"
              className="font-serif-kr mt-2 text-2xl font-semibold leading-snug text-[#262523] sm:text-3xl"
            >
              부천에서 울려 퍼지는
              <br className="sm:hidden" /> 우리 소리의 공동체
            </h2>
          </div>
          <p className="max-w-md text-base leading-[1.7] text-[#5C564F]">
            연희단 결(GYEOL)은 나무의 나이테처럼 시간이 쌓아 올린 전통 장단과
            사람의 온기를 담아내는 고유번호증 등록 비영리임의단체입니다.
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
          {SOCIAL_STATS.map((stat) => (
            <div
              key={stat.id}
              data-serial-id={stat.id}
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
        {CORE_VALUES.map((item, index) => (
          <FadeUp key={item.id} delayMs={index * 90}>
            <article
              data-serial-id={item.id}
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
                <span>THE GRAIN OF SOUND</span>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
