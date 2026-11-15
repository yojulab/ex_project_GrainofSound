"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { ModalShell } from "@/components/modals/ModalShell";
import { formatKoreanPhone } from "@/lib/validations/actions";

interface SupporterModalProps {
  open: boolean;
  onClose: () => void;
  kakaoOpenChatUrl: string;
}

/**
 * M03: [후원회원 가입 문의] 모달
 * [법적 가드레일] 후원 계좌번호 및 직접 결제창을 일체 노출하지 않고 1:1 안내 프로세스로만 동작한다.
 */
export function SupporterModal({
  open,
  onClose,
  kakaoOpenChatUrl,
}: SupporterModalProps) {
  const [supporterNameOrOrg, setSupporterNameOrOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    "message_kakao" | "phone_call"
  >("message_kakao");
  const [supportType, setSupportType] = useState<"regular" | "onetime">(
    "regular"
  );
  const [cheeringMessage, setCheeringMessage] = useState("");
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
      const res = await fetch("/api/actions/supporter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supporterNameOrOrg,
          phone,
          preferredContactMethod,
          supportType,
          cheeringMessage,
          _hp: honeypot,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(
          data.error ||
            "문의 접수 중 오류가 발생했습니다. 카카오톡 오픈채팅으로 문의해 주세요."
        );
      } else {
        setSuccessMsg(
          data.message ||
            "후원회원 가입 문의가 접수되었습니다. 담당자가 확인 후 선택하신 방식으로 1:1 개별 연락을 드리겠습니다."
        );
        setSupporterNameOrOrg("");
        setPhone("");
        setCheeringMessage("");
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
      title="후원회원 가입 문의"
      subtitle="M03 · Supporter Inquiry"
      serialId="M03-FRM-MOD01"
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
          {/* 모달 상단 법적 필수 안내 문구 */}
          <div
            data-serial-id="M03-FRM-LGL01"
            data-serial-label="후원 문의 - 비영리임의단체 1:1 안내 필수 법적 고지문"
            className="border-l-2 border-[#A63A2B] bg-[#EAE4D7]/70 p-4 text-sm leading-relaxed text-[#1A1917]"
          >
            연희단 결은 전통문화 나눔과 청소년 예술 활동의 뜻에 공감하는
            후원회원(서포터즈) 분들의 회비로 운영됩니다. 비영리임의단체 운영
            규정에 따라, 아래에 연락처를 남겨주시면 담당자가 1:1로 연락드려
            후원회원 가입 및 회비 납부 절차를 상세히 안내해 드립니다.
          </div>

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
              성함 (또는 단체/기업명) <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={supporterNameOrOrg}
              onChange={(e) => setSupporterNameOrOrg(e.target.value)}
              data-serial-id="M03-FRM-INP01"
              data-serial-label="후원 문의 - 성함 또는 단체명 입력"
              placeholder="성함 또는 단체명을 입력해 주세요"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              연락받으실 휴대전화 번호 <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
              data-serial-id="M03-FRM-INP02"
              data-serial-label="후원 문의 - 휴대전화 번호 입력"
              placeholder="010-1234-5678"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EAE4D7]/45 px-3.5 py-2.5 text-base text-[#1A1917] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <fieldset data-serial-id="M03-FRM-RDO01" data-serial-label="후원 문의 - 선호 안내 방식 라디오">
            <legend className="mb-2 block text-sm font-medium text-[#1A1917]">
              선호하는 안내 방식 <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  preferredContactMethod === "message_kakao"
                    ? "border-[#4A3525] bg-[#EAE4D7] font-semibold text-[#1A1917]"
                    : "border-[#D8D0C5] bg-[#F6F3EC] text-[#5C564F]"
                }`}
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="message_kakao"
                  checked={preferredContactMethod === "message_kakao"}
                  onChange={() => setPreferredContactMethod("message_kakao")}
                  className="accent-[#A63A2B]"
                />
                <span>문자/카카오톡 안내 희망</span>
              </label>

              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  preferredContactMethod === "phone_call"
                    ? "border-[#4A3525] bg-[#EAE4D7] font-semibold text-[#1A1917]"
                    : "border-[#D8D0C5] bg-[#F6F3EC] text-[#5C564F]"
                }`}
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="phone_call"
                  checked={preferredContactMethod === "phone_call"}
                  onChange={() => setPreferredContactMethod("phone_call")}
                  className="accent-[#A63A2B]"
                />
                <span>전화 통화 희망</span>
              </label>
            </div>
          </fieldset>

          <fieldset data-serial-id="M03-FRM-RDO02" data-serial-label="후원 문의 - 참여 희망 형태 라디오">
            <legend className="mb-2 block text-sm font-medium text-[#1A1917]">
              참여 희망 형태 <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  supportType === "regular"
                    ? "border-[#4A3525] bg-[#EAE4D7] font-semibold text-[#1A1917]"
                    : "border-[#D8D0C5] bg-[#F6F3EC] text-[#5C564F]"
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
                <span>정기 후원회원 가입 문의</span>
              </label>

              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  supportType === "onetime"
                    ? "border-[#4A3525] bg-[#EAE4D7] font-semibold text-[#1A1917]"
                    : "border-[#D8D0C5] bg-[#F6F3EC] text-[#5C564F]"
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
                <span>일시 회비 납부 문의</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1917]">
              연희단 결에 전하는 응원 한마디 (선택)
            </label>
            <textarea
              rows={2}
              value={cheeringMessage}
              onChange={(e) => setCheeringMessage(e.target.value)}
              data-serial-id="M03-FRM-TXT01"
              data-serial-label="후원 문의 - 응원 한마디 입력"
              placeholder="따뜻한 응원의 말씀을 남겨주세요."
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
              data-serial-id="M03-FRM-SUB01"
              data-serial-label="후원 문의 - 제출 버튼"
              className="min-h-[48px] w-full rounded-sm bg-[#A63A2B] px-5 py-3 text-sm font-semibold text-[#F6F3EC] transition-colors hover:bg-[#8E3023] disabled:opacity-60"
            >
              {submitting ? "문의 접수 중..." : "1:1 후원회원 안내 요청하기"}
            </button>

            <a
              href={kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-serial-id="M03-FRM-KAKAO01"
              data-serial-label="후원 문의 - 카카오톡 1:1 문의 버튼"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm border border-[#1A1917] bg-[#F6F3EC] px-5 py-3 text-sm font-semibold text-[#1A1917] transition-colors hover:bg-[#EAE4D7]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>카카오톡으로 1:1 후원 문의하기</span>
            </a>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
