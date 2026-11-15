"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { ModalShell } from "@/components/modals/ModalShell";
import { formatKoreanPhone } from "@/lib/validations/actions";

interface MemberModalProps {
  open: boolean;
  onClose: () => void;
  kakaoOpenChatUrl: string;
}

const SPECIALTIES = [
  { value: "janggu", label: "장구" },
  { value: "sogo", label: "소고" },
  { value: "minyo", label: "민요" },
  { value: "other", label: "기타 전통연희" },
] as const;

type SpecialtyValue = (typeof SPECIALTIES)[number]["value"];

export function MemberModal({
  open,
  onClose,
  kakaoOpenChatUrl,
}: MemberModalProps) {
  const [applicantName, setApplicantName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [specialties, setSpecialties] = useState<SpecialtyValue[]>(["janggu"]);
  const [experienceAndIntro, setExperienceAndIntro] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const toggleSpecialty = (val: SpecialtyValue) => {
    setSpecialties((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
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
      setErrorMsg("주요 분야를 최소 1개 이상 선택해 주세요.");
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
          region,
          specialties,
          experienceAndIntro,
          _hp: honeypot,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(
          data.error ||
            "지원서 접수 중 오류가 발생했습니다. 카카오톡 오픈채팅으로 문의해 주세요."
        );
      } else {
        setSuccessMsg(
          data.message ||
            "지원해 주셔서 감사합니다. 담당 단원이 확인 후 기재해 주신 연락처로 연습 일정 및 참관 안내를 드리겠습니다."
        );
        setApplicantName("");
        setPhone("");
        setRegion("");
        setSpecialties(["janggu"]);
        setExperienceAndIntro("");
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
      title="일반회원(단원) 지원"
      subtitle="M02 · Member Application"
      serialId="M02-FRM-MOD01"
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
                성함 <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                data-serial-id="M02-FRM-INP01"
                data-serial-label="단원 지원 - 성함 입력"
                placeholder="김결"
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
                연락처 <span className="text-[#A63A2B]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
                data-serial-id="M02-FRM-INP02"
                data-serial-label="단원 지원 - 연락처 입력"
                placeholder="010-1234-5678"
                className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              거주 지역 <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              data-serial-id="M02-FRM-INP03"
              data-serial-label="단원 지원 - 거주 지역 입력"
              placeholder="예: 부천시 소사구, 원미구, 인근 지역 등"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <fieldset data-serial-id="M02-FRM-CHK01" data-serial-label="단원 지원 - 주요 분야 복수 선택">
            <legend className="mb-2 block text-sm font-medium text-[#1A1917]">
              주요 분야 (복수 선택 가능){" "}
              <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {SPECIALTIES.map((opt) => {
                const checked = specialties.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                      checked
                        ? "border-[#4A3525] bg-[#EAE4D7] font-semibold text-[#1A1917]"
                        : "border-[#D8D0C5] bg-[#F6F3EC] text-[#5C564F]"
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
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              연주 경력 및 간단한 소개 <span className="text-[#A63A2B]">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={experienceAndIntro}
              onChange={(e) => setExperienceAndIntro(e.target.value)}
              data-serial-id="M02-FRM-TXT01"
              data-serial-label="단원 지원 - 연주 경력 및 소개 입력"
              placeholder="동호회 활동, 강습 이력, 함께하고 싶은 마음 등을 자유롭게 적어주세요."
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
              data-serial-id="M02-FRM-SUB01"
              data-serial-label="단원 지원 - 제출 버튼"
              className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-5 py-3 text-sm font-semibold text-[#F6F3EC] transition-colors hover:bg-[#38271B] disabled:opacity-60"
            >
              {submitting ? "지원서 접수 중..." : "단원 지원서 제출하기"}
            </button>

            <a
              href={kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-serial-id="M02-FRM-KAKAO01"
              data-serial-label="단원 지원 - 카카오톡 오픈채팅 문의 버튼"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm border border-[#1A1917] bg-[#F6F3EC] px-5 py-3 text-sm font-semibold text-[#1A1917] transition-colors hover:bg-[#EAE4D7]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>카카오톡 오픈채팅으로 문의하기</span>
            </a>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
