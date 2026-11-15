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
      data-serial-label="단체 기본 정보 푸터"
      className="gyeol-divider bg-[#EAE4D7]/55 px-5 pt-12 pb-32 md:px-8 md:pt-16 md:pb-24"
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
              <p className="font-serif-kr text-lg font-semibold text-[#1A1917]">
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
              <dt className="inline font-medium text-[#1A1917]">소재지: </dt>
              <dd className="inline">{siteInfo.location}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#1A1917]">대표자: </dt>
              <dd className="inline">{siteInfo.representativeName}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#1A1917]">고유번호: </dt>
              <dd className="inline">{siteInfo.registrationNumber}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#1A1917]">공식 연락처: </dt>
              <dd className="inline">{siteInfo.contactPhone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="inline font-medium text-[#1A1917]">이메일: </dt>
              <dd className="inline">
                <a
                  href={`mailto:${siteInfo.contactEmail}`}
                  className="underline decoration-[#D8D0C5] underline-offset-4 hover:text-[#1A1917]"
                >
                  {siteInfo.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 border-t border-[#D8D0C5] pt-5 text-xs text-[#5C564F] flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteInfo.organizationName}. All rights
            reserved.
          </p>
          <p>
            후원회원 가입 및 회비 안내는 1:1 문의를 통해 개별적으로 진행됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
