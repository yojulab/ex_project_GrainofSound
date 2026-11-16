import { FadeUp } from "@/components/motion/FadeUp";

interface JoinUsSectionProps {
  onOpenMemberModal: () => void;
  onOpenSupporterModal: () => void;
}

export function JoinUsSection({
  onOpenMemberModal,
  onOpenSupporterModal,
}: JoinUsSectionProps) {
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
            04 · Join Us
          </p>
          <h2 className="font-serif-kr mt-2 text-2xl font-semibold text-[#262523] sm:text-3xl">
            소리의 결을 함께 빚어가는 길
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-[1.7] text-[#5C564F]">
            무대 위에서 함께 장단을 맞추는 연주 단원부터, 전통문화 나눔의 뜻에
            마음을 보태주시는 후원회원(서포터즈)까지 모두 연희단 결의 소중한
            구성원입니다.
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
                PERFORMING MEMBER
              </p>
              <h3 className="font-serif-kr mt-1.5 text-xl font-semibold text-[#262523]">
                일반단원 모집 안내
              </h3>
              <p className="mt-3 text-base leading-[1.7] text-[#5C564F]">
                경기도 부천시 및 인근 지역(인천·서울 서부 등) 거주자 중{" "}
                <strong className="font-semibold text-[#262523]">
                  장구 · 소고 · 민요
                </strong>{" "}
                등 전통연희 유경험자 분들을 환영합니다.
              </p>
              <ul className="mt-4 space-y-2 border-t border-[#D8D0C5] pt-4 text-sm leading-relaxed text-[#5C564F] sm:text-base">
                <li>• 활동 거점: 경기도 부천시 연습실 (정기 합주 및 참관 가능)</li>
                <li>• 연습 분위기: 서로의 호흡을 존중하며 즐겁게 기량을 나누는 공동체</li>
                <li>• 주요 활동: 부천 관내 복지기관 나눔 공연 및 지역 축제 무대 참여</li>
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenMemberModal}
                className="min-h-[48px] w-full rounded-sm border border-[#4A3525] bg-[#F9F7F2] px-5 py-3 text-sm font-semibold text-[#4A3525] transition-colors hover:bg-[#4A3525] hover:text-[#F9F7F2]"
              >
                일반회원(단원) 지원하기
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
                SUPPORTERS
              </p>
              <h3 className="font-serif-kr mt-1.5 text-xl font-semibold text-[#262523]">
                후원회원(서포터즈) 안내
              </h3>
              <p className="mt-3 text-base leading-[1.7] text-[#5C564F]">
                연희단 결의 요양원·복지관 찾아가는 나눔 공연과 청소년 전통예술
                활동은 서포터즈 분들의 소중한 회비로 이어집니다.
              </p>
              <ul className="mt-4 space-y-2 border-t border-[#D8D0C5] pt-4 text-sm leading-relaxed text-[#5C564F] sm:text-base">
                <li>• 회비 사용처: 취약계층 무료 나눔 공연 제작 및 악기·의상 유지</li>
                <li>• 청소년 예술 지원: 지역 청소년 전통연희 체험 및 무대 기회 제공</li>
                <li>
                  • 가입 절차: 문의 접수 후 담당자가 1:1로 연락드려 상세히 안내해
                  드립니다
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenSupporterModal}
                className="min-h-[48px] w-full rounded-sm border border-[#A63A2B] bg-[#F9F7F2] px-5 py-3 text-sm font-semibold text-[#A63A2B] transition-colors hover:bg-[#A63A2B] hover:text-[#F9F7F2]"
              >
                후원회원 가입 문의하기
              </button>
            </div>
          </article>
        </FadeUp>
      </div>
    </section>
  );
}
