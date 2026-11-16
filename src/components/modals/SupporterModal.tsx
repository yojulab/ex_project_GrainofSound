"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, AlertTriangle } from "lucide-react";
import { ModalShell } from "@/components/modals/ModalShell";
import { formatKoreanPhone } from "@/lib/validations/actions";

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
      setErrorMsg("기부금 영수증 미발행 고지 사항을 확인하고 동의해 주세요.");
      return;
    }

    if (!privacyAgreed) {
      setErrorMsg("개인정보 수집 및 이용에 동의해 주세요.");
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
        setDisclaimerAcknowledged(false);
        setPrivacyAgreed(false);
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
          <p className="border border-[#D8D0C5] bg-[#EFECE4]/60 p-5 text-base leading-relaxed text-[#262523]">
            {successMsg}
          </p>
          <button
            type="button"
            onClick={resetAndClose}
            className="min-h-[48px] w-full rounded-sm bg-[#4A3525] px-5 py-3 text-sm font-semibold text-[#F9F7F2]"
          >
            확인
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
              <span>법적 고지 사항 (비영리임의단체)</span>
            </div>
            연희단 결은 부천세무서 고유번호증을 교부받은 <strong>비영리임의단체</strong>입니다. 법인세법 및 소득세법상 지정기부금단체가 아니므로, <strong>세액공제용 기부금 영수증은 발행되지 않습니다.</strong> 납부해 주시는 후원 회비는 정관에 따라 취약계층 나눔공연 및 전통예술 보급 사업에 투명하게 전액 집행됩니다. 본 사이트는 <strong>후원 계좌번호를 공개하지 않으며</strong>, 1:1 개별 상담을 통해서만 가입 안내가 진행됩니다.
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
            <label className="mb-1.5 block text-sm font-medium text-[#262523]">
              성함 (또는 단체/기업명) <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={supporterNameOrOrg}
              onChange={(e) => setSupporterNameOrOrg(e.target.value)}
              data-serial-id="M03-FRM-INP01"
              data-serial-label="후원 문의 - 성함/단체명 입력"
              placeholder="예: 김후원, (주)결문화사랑"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#262523]">
              휴대전화 번호 <span className="text-[#A63A2B]">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
              data-serial-id="M03-FRM-INP02"
              data-serial-label="후원 문의 - 연락처 입력"
              placeholder="010-1234-5678"
              className="min-h-[46px] w-full border border-[#D8D0C5] bg-[#EFECE4]/45 px-3.5 py-2.5 text-base text-[#262523] placeholder:text-[#5C564F]/65 focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          <fieldset data-serial-id="M03-FRM-RDO01" data-serial-label="후원 문의 - 선호 안내 방식 라디오">
            <legend className="mb-2 block text-sm font-medium text-[#262523]">
              선호하시는 1:1 안내 방식 <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label
                className={`flex min-h-[44px] cursor-pointer items-center gap-2 border px-3 py-2 text-sm ${
                  preferredContactMethod === "message_kakao"
                    ? "border-[#4A3525] bg-[#EFECE4] font-semibold text-[#262523]"
                    : "border-[#D8D0C5] bg-[#F9F7F2] text-[#5C564F]"
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
                <span>카카오톡 / 문자 메시지</span>
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
            <legend className="mb-2 block text-sm font-medium text-[#262523]">
              참여 희망 형태 <span className="text-[#A63A2B]">*</span>
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                <span>정기 후원회원 가입 문의</span>
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
                <span>일시 회비 납부 문의</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#262523]">
              연희단 결에 전하는 응원 한마디 (선택)
            </label>
            <textarea
              rows={2}
              value={cheeringMessage}
              onChange={(e) => setCheeringMessage(e.target.value)}
              data-serial-id="M03-FRM-TXT01"
              data-serial-label="후원 문의 - 응원 한마디 입력"
              placeholder="따뜻한 응원의 말씀을 남겨주세요."
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
                <strong className="text-[#262523]">[필수] 기부금 영수증 미발행 고지 확인:</strong>{" "}
                연희단 결은 비영리임의단체로 세액공제용 기부금 영수증이 발행되지 않으며, 회비는 고유목적사업에 사용됨을 확인하였습니다.
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
                <strong className="text-[#262523]">[필수] 개인정보 수집 및 이용 동의:</strong>{" "}
                1:1 후원회원 안내 및 연락을 위해 성함, 연락처를 수집하며 문의 처리 후 1년간 보관됩니다.
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
              {submitting ? "문의 접수 중..." : "1:1 후원회원 안내 요청하기"}
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
              <span>카카오톡으로 1:1 후원 문의하기</span>
            </a>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
