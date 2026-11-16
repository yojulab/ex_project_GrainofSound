import { z } from "zod";

/**
 * XSS 방지용 HTML 태그 제거 및 공백 정제
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * 한국 전화번호 자동 하이픈 포맷터 (입력 UX 보조용)
 */
export function formatKoreanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.startsWith("02")) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const phoneSchema = z
  .string()
  .transform(sanitizeText)
  .refine(
    (val) => /^[0-9+\-\s()]{8,20}$/.test(val),
    "올바른 연락처(전화번호)를 입력해 주세요."
  );

/**
 * M01: [공연 신청하기] 스키마
 */
export const performanceRequestSchema = z.object({
  organization: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(1, "기관 또는 단체명을 입력해 주세요.")
        .max(120, "기관/단체명은 120자 이내로 입력해 주세요.")
    ),
  contactName: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(1, "담당자 성함을 입력해 주세요.")
        .max(60, "성함은 60자 이내로 입력해 주세요.")
    ),
  contactPhone: phoneSchema,
  preferredDatePlace: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(2, "공연 희망 일시 및 장소를 입력해 주세요.")
        .max(200, "희망 일시 및 장소는 200자 이내로 입력해 주세요.")
    ),
  eventType: z.enum(["welfare", "festival", "diplomatic", "other"], {
    message: "행사 성격 및 대상을 선택해 주세요.",
  }),
  notes: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(1000, "기타 요청사항은 1000자 이내로 입력해 주세요."))
    .optional()
    .default(""),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집 및 이용에 동의해 주세요.",
  }),
  _hp: z.string().optional().default(""),
});

/**
 * M02: [일반회원(단원) 지원] 스키마
 */
export const memberApplicationSchema = z.object({
  applicantName: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(1, "성함을 입력해 주세요.")
        .max(60, "성함은 60자 이내로 입력해 주세요.")
    ),
  phone: phoneSchema,
  region: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(2, "거주 지역을 입력해 주세요.")
        .max(100, "거주 지역은 100자 이내로 입력해 주세요.")
    ),
  specialties: z
    .array(z.enum(["janggu", "sogo", "minyo", "other"]))
    .min(1, "주요 분야를 최소 1개 이상 선택해 주세요."),
  experienceAndIntro: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(5, "연주 경력 및 간단한 소개를 입력해 주세요.")
        .max(1500, "소개는 1500자 이내로 입력해 주세요.")
    ),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집 및 이용에 동의해 주세요.",
  }),
  _hp: z.string().optional().default(""),
});

/**
 * M03: [후원회원 가입 문의] 스키마 (계좌번호/결제 필드 일체 없음)
 */
export const supporterInquirySchema = z.object({
  supporterNameOrOrg: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(1, "성함 또는 단체/기업명을 입력해 주세요.")
        .max(100, "성함/단체명은 100자 이내로 입력해 주세요.")
    ),
  phone: phoneSchema,
  preferredContactMethod: z.enum(["message_kakao", "phone_call"], {
    message: "선호하시는 안내 방식을 선택해 주세요.",
  }),
  supportType: z.enum(["regular", "onetime"], {
    message: "참여 희망 형태를 선택해 주세요.",
  }),
  cheeringMessage: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().max(1000, "응원 한마디는 1000자 이내로 입력해 주세요."))
    .optional()
    .default(""),
  disclaimerAcknowledged: z.boolean().refine((val) => val === true, {
    message: "소득공제용 기부금 영수증 미발행 고지 사항을 확인하고 동의해 주세요.",
  }),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집 및 이용에 동의해 주세요.",
  }),
  _hp: z.string().optional().default(""),
});

export type PerformanceRequestInput = z.infer<typeof performanceRequestSchema>;
export type MemberApplicationInput = z.infer<typeof memberApplicationSchema>;
export type SupporterInquiryInput = z.infer<typeof supporterInquirySchema>;
