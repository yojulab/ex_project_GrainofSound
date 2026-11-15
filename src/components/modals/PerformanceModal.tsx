"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { ModalShell } from "@/components/modals/ModalShell";
import { formatKoreanPhone } from "@/lib/validations/actions";

interface PerformanceModalProps {
  open: boolean;
  onClose: () => void;
  kakaoOpenChatUrl: string;
}

const EVENT_TYPES = [
  { value: "welfare", label: "복지·나눔 공연" },
  { value: "festival", label: "지역 축제·문화행사" },
  { value: "diplomatic", label: "외교·기관 초청" },
  { value: "other", label: "기타" },
] as const;

export function PerformanceModal({
  open,
  onClose,
  kakaoOpenChatUrl,
}: PerformanceModalProps) {
  const [organization, setOrganization] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [preferredDatePlace, setPreferredDatePlace] = useState("");
  const [eventType, setEventType] =
    useState<(typeof EVENT_TYPES)[number]["value"]>("welfare");
  const [notes, setNotes] = useState("");
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
    setSubmitting(true);

    try {
      const res = await fetch("/api/actions/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization,
          contactName,
          contactPhone,
          preferredDatePlace,
          eventType,
          notes,
          _hp: honeypot,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(
          data.error ||
            "접수 중 오류가 발생했습니다. 아래 카카오톡 오픈채팅으로 문의해 주세요."
        );
      } else {
        setSuccessMsg(
          data.message ||
            "공연 신청이 정상적으로 접수되었습니다. 담당자가 확인 후 빠르게 연락드리겠습니다."
        );
        setOrganization("");
        setContactName("");
        setContactPhone("");
        setPreferredDatePlace("");
        setNotes("");
      }
    } catch {
      setErrorMsg(
        "네트워크 오류가 발생했습니다. 카카오톡 오픈채팅으로 바로 문의해 주세요."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell
      open={open}
      onClose={resetAndClose}
      title="공연 신청하기"
      subtitle="M01 · Performance Booking"
      serialId="M01-FRM-MOD01"
    >
      {successMsg ? (
        <div className="space-y-5 py-4 text-center">
          <p className="border border-[#D8D0C5] bg-[#EAE4D7]/60 p-5 text-base leading-relaxed text-[#1A1917]">
            {successMsg}
          </p>
          <button
            type="button"
            onClick={resetAndClose}
            className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-5 py-3 text-sm font-semibold text-[#F6F3EC]"
          >
            확인
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              기관/단체명 <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              data-serial-id="M01-FRM-INP01"
              data-serial-label="공연 신청 - 기관/단체명 입력"
              placeholder="예: 부천시 OO요양원, 종로구청, 주한 OO대사관"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
                담당자 성함 <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                data-serial-id="M01-FRM-INP02"
                data-serial-label="공연 신청 - 담당자 성함 입력"
                placeholder="홍길동"
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
                담당자 연락처 <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) =>
                  setContactPhone(formatKoreanPhone(e.target.value))
                }
                data-serial-id="M01-FRM-INP03"
                data-serial-label="공연 신청 - 담당자 연락처 입력"
                placeholder="010-1234-5678"
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              공연 희망 일시 및 장소 <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={preferredDatePlace}
              onChange={(e) => setPreferredDatePlace(e.target.value)}
              data-serial-id="M01-FRM-INP04"
              data-serial-label="공연 신청 - 희망 일시 및 장소 입력"
              placeholder="예: 2026년 12월 중 오후 2시 / 부천시 원미구 강당"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <fieldset data-serial-id="M01-FRM-RDO01" data-serial-label="공연 신청 - 행사 성격 라디오">
            <legend className="mb-2 block text-sm font-medium text-[#1A1917]">
              행사 성격 및 대상 <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_TYPES.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                    eventType === opt.value
                      ? "border-[#4A3525] bg-[#EAE4D7] font-semibold text-[#1A1917]"
                      : "border-[#D8D0C5] bg-[#F6F3EC] text-[#5C564F]"
                  }`}
                >
                  <input
                    type="radio"
                    name="eventType"
                    value={opt.value}
                    checked={eventType === opt.value}
                    onChange={() => setEventType(opt.value)}
                    className="accent-[#A63A2B]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              기타 요청사항 (선택)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              data-serial-id="M01-FRM-TXT01"
              data-serial-label="공연 신청 - 기타 요청사항 입력"
              placeholder="예산 범위, 희망 소요 시간, 음향 환경 등 참고하실 내용을 남겨주세요."
              className="w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p className="border border-[#A63A2B] bg-[#A63A2B]/10 p-3 text-sm text-[#A63A2B]">
              {errorMsg}
            </p>
          )}

          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              disabled={submitting}
              data-serial-id="M01-FRM-SUB01"
              data-serial-label="공연 신청 - 제출 버튼"
              className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-5 py-3 text-sm font-semibold text-[#F6F3EC] transition-colors hover:bg-[#38271B] disabled:opacity-60"
            >
              {submitting ? "접수 중..." : "공연 섭외 문의 접수하기"}
            </button>

            <a
              href={kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-serial-id="M01-FRM-KAKAO01"
              data-serial-label="공연 신청 - [카카오톡으로 바로 섭외 문의하기]"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm border border-[#1A1917] bg-[#F6F3EC] px-5 py-3 text-sm font-semibold text-[#1A1917] transition-colors hover:bg-[#EAE4D7]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>카카오톡으로 바로 섭외 문의하기</span>
            </a>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
