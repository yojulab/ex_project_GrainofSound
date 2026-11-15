/**
 * 환경변수 중앙화 무폴백(No-Fallback) 검증 모듈
 *
 * 절대 원칙:
 * - 코드 내 `process.env.XXX || 'default'` 형태의 하드코딩 폴백을 금지한다.
 * - 필수 환경변수가 누락된 경우 즉시 `CRITICAL CONFIG ERROR` 예외를 발생시킨다.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `[CRITICAL CONFIG ERROR] 필수 환경변수 '${key}'가 설정되지 않았습니다. .env 파일을 확인하세요.`
    );
  }
  return value.trim();
}

function requirePortEnv(key: string): number {
  const raw = requireEnv(key);
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(
      `[CRITICAL CONFIG ERROR] 환경변수 '${key}'의 포트 번호가 올바르지 않습니다: ${raw}`
    );
  }
  return parsed;
}

export interface ServerEnv {
  mongodbUri: string;
  sessionSecret: string;
  initialAdminUsername: string;
  initialAdminEmail: string;
  initialAdminPassword: string;
  port: number;
  appUrl: string;
  baseUrl: string;
  kakaoOpenChatUrl: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  contactMailTo: string;
  contactMailFrom: string;
}

export function getServerEnv(): ServerEnv {
  const mongodbUri = requireEnv("MONGODB_URI");
  if (!mongodbUri.includes("grain_of_sound")) {
    throw new Error(
      "[CRITICAL CONFIG ERROR] MONGODB_URI는 반드시 'grain_of_sound' 데이터베이스를 대상으로 해야 합니다."
    );
  }

  const sessionSecret = requireEnv("SESSION_SECRET");
  if (sessionSecret.length < 32) {
    throw new Error(
      "[CRITICAL CONFIG ERROR] SESSION_SECRET은 최소 32자 이상이어야 합니다."
    );
  }

  return {
    mongodbUri,
    sessionSecret,
    initialAdminUsername: requireEnv("INITIAL_ADMIN_USERNAME"),
    initialAdminEmail: requireEnv("INITIAL_ADMIN_EMAIL"),
    initialAdminPassword: requireEnv("INITIAL_ADMIN_PASSWORD"),
    port: requirePortEnv("PORT"),
    appUrl: requireEnv("NEXT_PUBLIC_APP_URL"),
    baseUrl: requireEnv("BASE_URL"),
    kakaoOpenChatUrl: requireEnv("NEXT_PUBLIC_KAKAO_OPENCHAT_URL"),
    smtpHost: requireEnv("SMTP_HOST"),
    smtpPort: requirePortEnv("SMTP_PORT"),
    smtpUser: requireEnv("SMTP_USER"),
    smtpPass: requireEnv("SMTP_PASS"),
    contactMailTo: requireEnv("CONTACT_MAIL_TO"),
    contactMailFrom: requireEnv("CONTACT_MAIL_FROM"),
  };
}

export function getPublicEnv() {
  return {
    appUrl: requireEnv("NEXT_PUBLIC_APP_URL"),
    kakaoOpenChatUrl: requireEnv("NEXT_PUBLIC_KAKAO_OPENCHAT_URL"),
  };
}
