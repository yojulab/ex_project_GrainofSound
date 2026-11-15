import { FadeUp } from "@/components/motion/FadeUp";

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
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif-en text-sm tracking-[0.2em] text-[#A63A2B] uppercase">
              02 · About GYEOL
            </p>
            <h2
              data-serial-id="G02-ABT-TTL01"
              data-serial-label="About 섹션 타이틀"
              className="font-serif-kr mt-2 text-2xl font-semibold leading-snug text-[#1A1917] sm:text-3xl"
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {CORE_VALUES.map((item, index) => (
          <FadeUp key={item.id} delayMs={index * 90}>
            <article
              data-serial-id={item.id}
              data-serial-label={`핵심 가치 카드 - ${item.title}`}
              className="flex h-full flex-col justify-between border border-[#D8D0C5] bg-[#EAE4D7]/60 p-6 transition-colors hover:border-[#4A3525] sm:p-7"
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
                <h3 className="font-serif-kr text-xl font-semibold text-[#1A1917]">
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
