export interface FooterSiteInfo {
  organizationName: string;
  legalDesignation: string;
  location: string;
  representativeName: string;
  registrationNumber: string;
  contactPhone: string;
  contactEmail: string;
}

export function Footer({ siteInfo }: { siteInfo: FooterSiteInfo }) {
  return (
    <footer
      data-serial-id="G00-FTR-SEC01"
      data-serial-label="단체 기본 정보 및 법적 고지 푸터"
      className="gyeol-divider bg-[#EFECE4]/65 px-5 pt-12 pb-32 md:px-8 md:pt-16 md:pb-24"
    >
      <div
        data-serial-id="G00-FTR-INFO01"
        data-serial-label="단체 법적 등록 정보 및 공식 연락처"
        className="mx-auto max-w-4xl"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-6 w-6 items-center justify-center border border-[#A63A2B] text-xs font-bold text-[#A63A2B]">
                結
              </span>
              <p className="font-serif-kr text-lg font-semibold text-[#262523]">
                {siteInfo.organizationName}
              </p>
            </div>
            <p className="mt-1.5 text-sm text-[#5C564F]">
              {siteInfo.legalDesignation}
            </p>
            <p className="font-serif-en mt-1 text-sm italic tracking-wider text-[#5C564F]">
              The Grain of Sound, GYEOL
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-2 text-sm text-[#5C564F] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2">
            <div>
              <dt className="inline font-medium text-[#262523]">소재지: </dt>
              <dd className="inline">{siteInfo.location}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#262523]">대표자: </dt>
              <dd className="inline">{siteInfo.representativeName}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#262523]">고유번호: </dt>
              <dd className="inline">{siteInfo.registrationNumber}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#262523]">공식 연락처: </dt>
              <dd className="inline">{siteInfo.contactPhone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="inline font-medium text-[#262523]">이메일: </dt>
              <dd className="inline">
                <a
                  href={`mailto:${siteInfo.contactEmail}`}
                  className="underline decoration-[#D8D0C5] underline-offset-4 hover:text-[#262523]"
                >
                  {siteInfo.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* 비영리임의단체 법적 가드레일 & 기부금 영수증 미발행 고지 박스 */}
        <div
          data-serial-id="G00-FTR-LGL01"
          data-serial-label="푸터 법적 안전장치 및 기부금 영수증 미발행 고지"
          className="mt-8 border-l-2 border-[#A63A2B] bg-[#F9F7F2] p-4 text-xs leading-relaxed text-[#5C564F]"
        >
          <strong className="block text-[#262523] mb-1 font-medium">
            ※ 비영리임의단체 법적 지위 및 기부금 영수증 미발행 안내
          </strong>
          연희단 결은 부천세무서 고유번호증(123-82-45678)을 교부받은 비영리임의단체입니다. 법인세법 및 소득세법상 지정기부금단체가 아니므로, 납부하신 회비·후원금에 대해 세액공제용 기부금 영수증은 발행되지 않습니다. 후원회원 가입 및 회비 안내는 1:1 개별 문의를 통해서만 진행되며, 본 웹사이트에는 계좌번호를 일체 공개하지 않습니다.
        </div>

        <div className="mt-6 border-t border-[#D8D0C5] pt-5 text-xs text-[#5C564F] flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteInfo.organizationName}. All rights
            reserved.
          </p>
          <p>
            전통예술 보급 및 문화 취약계층 나눔을 실천하는 비영리 예술 공동체
          </p>
        </div>
      </div>
    </footer>
  );
}
