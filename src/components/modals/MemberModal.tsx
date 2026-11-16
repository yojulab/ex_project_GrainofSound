"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { ModalShell } from "@/components/modals/ModalShell";
import { formatKoreanPhone } from "@/lib/validations/actions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface MemberModalProps {
  open: boolean;
  onClose: () => void;
  kakaoOpenChatUrl: string;
}

export function MemberModal({
  open,
  onClose,
  kakaoOpenChatUrl,
}: MemberModalProps) {
  const { t } = useLanguage();
  const m = t.modals.member;

  const SPECIALTIES = [
    { value: "janggu", label: m.specialtyOptions.janggu },
    { value: "sogo", label: m.specialtyOptions.sogo },
    { value: "minyo", label: m.specialtyOptions.minyo },
    { value: "other", label: m.specialtyOptions.other },
  ];

  const [applicantName, setApplicantName] = useState("");
  const [phone, setPhone] = useState("");
  const [residentialArea, setResidentialArea] = useState("");
  const [specialties, setSpecialties] = useState<string[]>(["janggu"]);
  const [experienceAndIntro, setExperienceAndIntro] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const toggleSpecialty = (value: string) => {
    setSpecialties((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const resetAndClose = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (specialties.length === 0) {
      setErrorMsg(m.specialtyError);
      return;
    }

    if (!privacyAgreed) {
      setErrorMsg(m.privacyError);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/actions/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName,
          phone,
          residentialArea,
          specialties,
          experienceAndIntro,
          privacyAgreed,
          _hp: honeypot,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || m.errorMessage);
      } else {
        setSuccessMsg(data.message || m.successMessage);
        setApplicantName("");
        setPhone("");
        setResidentialArea("");
        setSpecialties(["janggu"]);
        setExperienceAndIntro("");
        setPrivacyAgreed(false);
      }
    } catch {
      setErrorMsg(m.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell
      open={open}
      onClose={resetAndClose}
      title={m.title}
      subtitle={m.subtitle}
      serialId="M02-FRM-MOD01"
    >
      {successMsg ? (
        <div className="space-y-5 py-4 text-center">
          <p className="border border-[#D8D0C5] bg-[#EFECE4]/60 p-5 text-base leading-relaxed text-[#262523]">
            {successMsg}
          </p>
          <button
            type="button"
            onClick={resetAndClose}
            className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-5 py-3 text-sm font-semibold text-[#F9F7F2]"
          >
            {t.common.confirm}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#262523]">
                {m.applicantNameLabel} <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                data-serial-id="M02-FRM-INP01"
                data-serial-label="단원 지원 - 지원자 성명 입력"
                placeholder={m.applicantNamePlaceholder}
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#262523]">
                {m.applicantPhoneLabel} <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
                data-serial-id="M02-FRM-INP02"
                data-serial-label="단원 지원 - 연락처 입력"
                placeholder={m.applicantPhonePlaceholder}
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#262523]">
              {m.residentialAreaLabel} <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={residentialArea}
              onChange={(e) => setResidentialArea(e.target.value)}
              data-serial-id="M02-FRM-INP03"
              data-serial-label="단원 지원 - 거주 지역 입력"
              placeholder={m.residentialAreaPlaceholder}
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <fieldset data-serial-id="M02-FRM-CHK01" data-serial-label="단원 지원 - 주요 분야 복수 선택">
            <legend className="mb-2 block text-sm font-medium text-[#262523]">
              {m.specialtiesLabel} <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {SPECIALTIES.map((opt) => {
                const checked = specialties.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                      checked
                        ? "border-[#4A3525] bg-[#EFECE4] font-semibold text-[#262523]"
                        : "border-[#D8D0C5] bg-[#F9F7F2] text-[#5C564F]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSpecialty(opt.value)}
                      className="accent-[#A63A2B]"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#262523]">
              {m.experienceLabel} <span className="text-[#A63A2B]">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={experienceAndIntro}
              onChange={(e) => setExperienceAndIntro(e.target.value)}
              data-serial-id="M02-FRM-TXT01"
              data-serial-label="단원 지원 - 연주 경력 및 소개 입력"
              placeholder={m.experiencePlaceholder}
              className="w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          {/* 개인정보 수집 및 이용 동의 필수 체크박스 */}
          <div
            data-serial-id="M02-FRM-PRV01"
            data-serial-label="단원 지원 - 개인정보 수집 및 이용 동의"
            className="rounded-xs border border-[#D8D0C5] bg-[#EFECE4]/40 p-3.5"
          >
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5C564F]">
              <input
                type="checkbox"
                required
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                className="mt-0.5 accent-[#A63A2B]"
              />
              <span>
                <strong className="text-[#262523]">
                  {m.privacyAgreedTitle}
                </strong>{" "}
                {m.privacyAgreedText}
              </span>
            </label>
          </div>

          {errorMsg && (
            <p className="border border-[#A63A2B] bg-[#A63A2B]/10 p-3 text-sm text-[#A63A2B]">
              {errorMsg}
            </p>
          )}

          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              disabled={submitting || !privacyAgreed}
              data-serial-id="M02-FRM-SUB01"
              data-serial-label="단원 지원 - 제출 버튼"
              className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-5 py-3 text-sm font-semibold text-[#F9F7F2] transition-colors hover:bg-[#38271B] disabled:opacity-60"
            >
              {submitting ? t.common.submitPending : m.submitButton}
            </button>

            <a
              href={kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-serial-id="M02-FRM-KAKAO01"
              data-serial-label="단원 지원 - 카카오톡 오픈채팅 문의 버튼"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm border border-[#262523] bg-[#F9F7F2] px-5 py-3 text-sm font-semibold text-[#262523] transition-colors hover:bg-[#EFECE4]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{m.kakaoButton}</span>
            </a>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
