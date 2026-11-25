"use client";

import { LETTRE_PLACEHOLDERS } from "@/components/parcours/parcoursData";

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
  void siteInfo;

  return (
    <footer
      data-serial-id="G00-FTR-SEC01"
      data-serial-label="최하단 비영리 예술단체 한 줄 푸터"
      className="border-t border-[#D8D0C5] bg-[#F9F7F2] px-5 py-3 text-center text-[11px] tracking-[0.06em] text-[#5C564F]"
    >
      <p className="mx-auto max-w-5xl truncate">
        Association artistique à but non lucratif · Yeonheedan Gyeol (The Grain of
        Sound) · N° d’enregistrement : {LETTRE_PLACEHOLDERS.registrationNumber} ·{" "}
        {LETTRE_PLACEHOLDERS.representativeName}
      </p>
    </footer>
  );
}
