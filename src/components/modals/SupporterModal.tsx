"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, AlertTriangle } from "lucide-react";
import { ModalShell } from "@/components/modals/ModalShell";
import { formatKoreanPhone } from "@/lib/validations/actions";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SupporterModalProps {
  open: boolean;
  onClose: () => void;
  kakaoOpenChatUrl: string;
}

/**
 * M03: [후원회원 가입 문의] 모달
 * [법적 가드레일] 후원 계좌번호 및 직접 결제창을 원천 배제하고 1:1 개별 상담 프로세스로만 동작한다.
 */
export function SupporterModal({
  open,
  onClose,
  kakaoOpenChatUrl,
}: SupporterModalProps) {
  const { t } = useLanguage();
  const m = t.modals.supporter;

  const [supporterNameOrOrg, setSupporterNameOrOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    "message_kakao" | "phone_call"
  >("message_kakao");
  const [supportType, setSupportType] = useState<"regular" | "onetime">(
    "regular"
  );
  const [cheeringMessage, setCheeringMessage] = useState("");
  const [disclaimerAcknowledged, setDisclaimerAcknowledged] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetAndClose = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!disclaimerAcknowledged) {
      setErrorMsg(m.disclaimerError);
      return;
    }

    if (!privacyAgreed) {
      setErrorMsg(m.privacyError);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/actions/supporter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supporterNameOrOrg,
          phone,
          preferredContactMethod,
          supportType,
          cheeringMessage,
          disclaimerAcknowledged,
          privacyAgreed,
          _hp: honeypot,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || m.errorMessage);
      } else {
        setSuccessMsg(data.message || m.successMessage);
        setSupporterNameOrOrg("");
        setPhone("");
        setCheeringMessage("");
        setDisclaimerAcknowledged(false);
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
      serialId="M03-FRM-MOD01"
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
          {/* 모달 상단 법적 필수 안내 고지문 (기부금 영수증 미발행 고지) */}
          <div
            data-serial-id="M03-FRM-LGL01"
            data-serial-label="후원 문의 - 비영리임의단체 1:1 안내 및 영수증 미발행 법적 고지문"
            className="border-l-2 border-[#A63A2B] bg-[#EFECE4]/75 p-4 text-xs leading-relaxed text-[#262523]"
          >
            <div className="flex items-center gap-1.5 text-[#A63A2B] font-semibold mb-1">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{m.legalNoticeBadge}</span>
            </div>
            {m.legalNoticeDesc}
          </div>

          {/* Honeypot */}
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
                {m.supporterNameLabel} <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="text"
                required
                value={supporterNameOrOrg}
                onChange={(e) => setSupporterNameOrOrg(e.target.value)}
                data-serial-id="M03-FRM-INP01"
                data-serial-label="후원 문의 - 성함 또는 단체명 입력"
                placeholder={m.supporterNamePlaceholder}
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#262523]">
                {m.phoneLabel} <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
                data-serial-id="M03-FRM-INP02"
                data-serial-label="후원 문의 - 연락처 입력"
                placeholder={m.phonePlaceholder}
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>
          </div>

          <fieldset data-serial-id="M03-FRM-RAD01" data-serial-label="후원 문의 - 희망 안내 방식 선택">
            <legend className="mb-2 block text-sm font-medium text-[#262523]">
              {m.preferredMethodLabel} <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  preferredContactMethod === "message_kakao"
                    ? "border-[#4A3525] bg-[#EFECE4] font-semibold text-[#262523]"
                    : "border-[#D8D0C5] bg-[#F9F7F2] text-[#5C564F]"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value="message_kakao"
                  checked={preferredContactMethod === "message_kakao"}
                  onChange={() => setPreferredContactMethod("message_kakao")}
                  className="accent-[#A63A2B]"
                />
                <span>{m.methods.kakao}</span>
              </label>

              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  preferredContactMethod === "phone_call"
                    ? "border-[#4A3525] bg-[#EFECE4] font-semibold text-[#262523]"
                    : "border-[#D8D0C5] bg-[#F9F7F2] text-[#5C564F]"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone_call"
                  checked={preferredContactMethod === "phone_call"}
                  onChange={() => setPreferredContactMethod("phone_call")}
                  className="accent-[#A63A2B]"
                />
                <span>{m.methods.phone}</span>
              </label>
            </div>
          </fieldset>

          <fieldset data-serial-id="M03-FRM-RAD02" data-serial-label="후원 문의 - 후원 희망 형태 선택">
            <legend className="mb-2 block text-sm font-medium text-[#262523]">
              {m.supportTypeLabel} <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  supportType === "regular"
                    ? "border-[#4A3525] bg-[#EFECE4] font-semibold text-[#262523]"
                    : "border-[#D8D0C5] bg-[#F9F7F2] text-[#5C564F]"
                }`}
              >
                <input
                  type="radio"
                  name="supportType"
                  value="regular"
                  checked={supportType === "regular"}
                  onChange={() => setSupportType("regular")}
                  className="accent-[#A63A2B]"
                />
                <span>{m.types.regular}</span>
              </label>

              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  supportType === "onetime"
                    ? "border-[#4A3525] bg-[#EFECE4] font-semibold text-[#262523]"
                    : "border-[#D8D0C5] bg-[#F9F7F2] text-[#5C564F]"
                }`}
              >
                <input
                  type="radio"
                  name="supportType"
                  value="onetime"
                  checked={supportType === "onetime"}
                  onChange={() => setSupportType("onetime")}
                  className="accent-[#A63A2B]"
                />
                <span>{m.types.onetime}</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#262523]">
              {m.cheeringLabel}
            </label>
            <textarea
              rows={2}
              value={cheeringMessage}
              onChange={(e) => setCheeringMessage(e.target.value)}
              data-serial-id="M03-FRM-TXT01"
              data-serial-label="후원 문의 - 응원 한마디 입력"
              placeholder={m.cheeringPlaceholder}
              className="w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          {/* 법적 가드레일 필수 동의 체크박스 2종 */}
          <div className="space-y-2 rounded-xs border border-[#D8D0C5] bg-[#EFECE4]/40 p-3.5">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#5C564F]">
              <input
                type="checkbox"
                required
                checked={disclaimerAcknowledged}
                onChange={(e) => setDisclaimerAcknowledged(e.target.checked)}
                className="mt-0.5 accent-[#A63A2B]"
              />
              <span>
                <strong className="text-[#262523]">
                  {m.disclaimerCheckTitle}
                </strong>{" "}
                {m.disclaimerCheckText}
              </span>
            </label>

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
                  {m.privacyCheckTitle}
                </strong>{" "}
                {m.privacyCheckText}
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
              disabled={submitting || !disclaimerAcknowledged || !privacyAgreed}
              data-serial-id="M03-FRM-SUB01"
              data-serial-label="후원 문의 - 제출 버튼"
              className="min-h-[48px] w-full rounded-sm bg-[#A63A2B] px-5 py-3 text-sm font-semibold text-[#F9F7F2] transition-colors hover:bg-[#8E3023] disabled:opacity-60"
            >
              {submitting ? t.common.submitPending : m.submitButton}
            </button>

            <a
              href={kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-serial-id="M03-FRM-KAKAO01"
              data-serial-label="후원 문의 - 카카오톡 1:1 문의 버튼"
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
