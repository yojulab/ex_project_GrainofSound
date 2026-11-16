"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { language, t } = useLanguage();

  const displayOrgName =
    language === "fr" ? t.common.siteTitle : siteInfo.organizationName;
  const displayLegalDesignation =
    language === "fr"
      ? "Association à but non lucratif enregistrée sous n° unique"
      : siteInfo.legalDesignation;
  const displayLocation =
    language === "fr" ? "Bucheon-si, Gyeonggi-do, Corée du Sud" : siteInfo.location;
  const displayRepName =
    language === "fr" ? "Yeon-hee Kim" : siteInfo.representativeName;

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
                {displayOrgName}
              </p>
            </div>
            <p className="mt-1.5 text-sm text-[#5C564F]">
              {displayLegalDesignation}
            </p>
            <p className="font-serif-en mt-1 text-sm italic tracking-wider text-[#5C564F]">
              The Grain of Sound, GYEOL
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-2 text-sm text-[#5C564F] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2">
            <div>
              <dt className="inline font-medium text-[#262523]">
                {t.footer.locationLabel}
              </dt>
              <dd className="inline">{displayLocation}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#262523]">
                {t.footer.representativeLabel}
              </dt>
              <dd className="inline">{displayRepName}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#262523]">
                {t.footer.registrationNumberLabel}
              </dt>
              <dd className="inline">{siteInfo.registrationNumber}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-[#262523]">
                {t.footer.phoneLabel}
              </dt>
              <dd className="inline">{siteInfo.contactPhone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="inline font-medium text-[#262523]">
                {t.footer.emailLabel}
              </dt>
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
            {t.footer.legalNoticeTitle}
          </strong>
          {t.footer.legalNoticeDesc}
        </div>

        <div className="mt-6 border-t border-[#D8D0C5] pt-5 text-xs text-[#5C564F] flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {displayOrgName}. {t.footer.rights}
          </p>
          <p>{t.footer.subTagline}</p>
        </div>
      </div>
    </footer>
  );
}
