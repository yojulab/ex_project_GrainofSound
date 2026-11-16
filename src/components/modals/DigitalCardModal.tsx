"use client";

import { useEffect, useState } from "react";
import { X, Download, Share2, Check } from "lucide-react";
import type { FooterSiteInfo } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DigitalCardModalProps {
  open: boolean;
  onClose: () => void;
  siteInfo: FooterSiteInfo;
}

export function DigitalCardModal({
  open,
  onClose,
  siteInfo,
}: DigitalCardModalProps) {
  const { language, t } = useLanguage();
  const m = t.modals.digitalCard;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleCopyLink = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? window.location.href
          : "https://gyeol.or.kr";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const displayOrgName =
    language === "fr" ? t.common.siteTitle : siteInfo.organizationName;
  const displayRepName =
    language === "fr" ? "Yeon-hee Kim" : siteInfo.representativeName;
  const displayLocation =
    language === "fr" ? "Bucheon-si, Gyeonggi-do" : siteInfo.location;
  const displayLegalDesignation =
    language === "fr"
      ? "Association à but non lucratif enregistrée"
      : siteInfo.legalDesignation;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={m.modalLabel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#262523]/80 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md border border-[#D8D0C5] bg-[#F9F7F2] p-6 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={m.closeLabel}
          className="absolute top-3.5 right-3.5 z-10 inline-flex h-9 w-9 items-center justify-center border border-[#D8D0C5] bg-[#F9F7F2] text-[#262523] transition-colors hover:border-[#4A3525] hover:bg-[#EFECE4]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 에디토리얼 명함 비주얼 카드 */}
        <div className="border border-[#D8D0C5] bg-[#EFECE4]/60 p-6 relative">
          <div className="flex items-center justify-between border-b border-[#D8D0C5] pb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center border border-[#A63A2B] text-xs font-bold text-[#A63A2B]">
                結
              </span>
              <div>
                <p className="font-serif-kr text-sm font-semibold text-[#262523]">
                  {displayOrgName}
                </p>
                <p className="font-serif-en text-[11px] tracking-[0.14em] text-[#5C564F] uppercase">
                  THE GRAIN OF SOUND
                </p>
              </div>
            </div>
            <span className="font-serif-en text-xs italic text-[#4A3525]">
              {m.badge}
            </span>
          </div>

          <div className="py-5">
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif-kr text-xl font-bold text-[#262523]">
                {displayRepName}
              </h3>
              <span className="text-xs font-medium text-[#A63A2B]">
                {m.repTitle}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#5C564F]">
              {displayLegalDesignation}
            </p>

            <dl className="mt-4 space-y-1.5 text-xs text-[#5C564F]">
              <div className="flex items-center gap-2">
                <dt className="font-medium text-[#262523] w-20 shrink-0">
                  {m.regLabel}
                </dt>
                <dd>{siteInfo.registrationNumber}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="font-medium text-[#262523] w-20 shrink-0">
                  {m.locLabel}
                </dt>
                <dd>{displayLocation}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="font-medium text-[#262523] w-20 shrink-0">
                  {m.phoneLabel}
                </dt>
                <dd>{siteInfo.contactPhone}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="font-medium text-[#262523] w-20 shrink-0">
                  {m.emailLabel}
                </dt>
                <dd>{siteInfo.contactEmail}</dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-[#D8D0C5] pt-3 text-[11px] text-[#5C564F] flex items-center justify-between">
            <span>{m.footerTag}</span>
            <span className="font-serif-en">gyeol.or.kr</span>
          </div>
        </div>

        {/* 액션 버튼 2종: vCard 다운로드 & 링크 복사 */}
        <div className="mt-5 space-y-2.5">
          <a
            href="/api/vcard"
            download="GYEOL_Digital_Card.vcf"
            data-serial-id="G00-CRD-BTN-VCF"
            data-serial-label="디지털 명함 - vCard 3.0 다운로드"
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-sm bg-[#4A3525] px-4 py-2.5 text-sm font-semibold text-[#F9F7F2] transition-colors hover:bg-[#38271B]"
          >
            <Download className="h-4 w-4" />
            <span>{m.downloadVcard}</span>
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            data-serial-id="G00-CRD-BTN-COPY"
            data-serial-label="디지털 명함 - 페이지 링크 복사"
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-sm border border-[#D8D0C5] bg-[#F9F7F2] px-4 py-2.5 text-sm font-semibold text-[#262523] transition-colors hover:bg-[#EFECE4]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#A63A2B]" />
                <span className="text-[#A63A2B]">{m.copiedLink}</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>{m.copyLink}</span>
              </>
            )}
          </button>
        </div>

        {copied && (
          <div
            role="status"
            className="mt-3 rounded-xs border border-[#A63A2B] bg-[#A63A2B]/10 p-2 text-center text-xs font-medium text-[#A63A2B] animate-fade-in"
          >
            {m.copiedToast}
          </div>
        )}
      </div>
    </div>
  );
}
