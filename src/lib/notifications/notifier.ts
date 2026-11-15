import nodemailer from "nodemailer";
import { getServerEnv } from "@/lib/config/env";

interface NotificationPayload {
  subject: string;
  text: string;
}

/**
 * 3대 액션 폼 접수 시 운영자 이메일(SMTP) 즉시 알림 발송
 * DB 적재 이후 비동기/안전하게 호출되며, SMTP 실패가 DB 저장 성공을 무효화하지 않도록 예외를 포착해 boolean 반환.
 */
export async function sendAdminNotification(
  payload: NotificationPayload
): Promise<boolean> {
  try {
    const env = getServerEnv();

    // 플레이스홀더 SMTP 설정인 경우 실제 네트워크 오류 없이 false 반환
    if (
      env.smtpHost.includes("example.com") ||
      env.smtpPass === "placeholder"
    ) {
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
    });

    await transporter.sendMail({
      from: env.contactMailFrom,
      to: env.contactMailTo,
      subject: payload.subject,
      text: payload.text,
    });

    return true;
  } catch (err) {
    console.error("[GYEOL NOTIFIER] SMTP 알림 발송 실패:", err);
    return false;
  }
}
