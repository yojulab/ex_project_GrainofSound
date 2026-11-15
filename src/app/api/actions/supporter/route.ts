import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { SupporterInquiry } from "@/lib/db/models/SupporterInquiry";
import { supporterInquirySchema } from "@/lib/validations/actions";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { sendAdminNotification } from "@/lib/notifications/notifier";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(ip, "supporter", 5, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `요청이 너무 많습니다. ${rate.retryAfterSec}초 후 다시 시도해 주세요.`,
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as unknown;
    const parsed = supporterInquirySchema.safeParse(body);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "입력값을 다시 확인해 주세요.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    if (parsed.data._hp && parsed.data._hp.length > 0) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    await connectToDatabase();

    const doc = await SupporterInquiry.create({
      supporterNameOrOrg: parsed.data.supporterNameOrOrg,
      phone: parsed.data.phone,
      preferredContactMethod: parsed.data.preferredContactMethod,
      supportType: parsed.data.supportType,
      cheeringMessage: parsed.data.cheeringMessage,
      status: "received",
      notificationSent: false,
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") ?? "unknown",
    });

    const notified = await sendAdminNotification({
      subject: `[연희단 결] 새 후원회원 가입 문의 — ${parsed.data.supporterNameOrOrg}`,
      text: [
        `성함/단체명: ${parsed.data.supporterNameOrOrg}`,
        `휴대전화: ${parsed.data.phone}`,
        `선호 안내 방식: ${parsed.data.preferredContactMethod}`,
        `참여 희망 형태: ${parsed.data.supportType}`,
        `응원 한마디: ${parsed.data.cheeringMessage || "없음"}`,
      ].join("\n"),
    });

    if (notified) {
      doc.notificationSent = true;
      await doc.save();
    }

    return NextResponse.json(
      {
        id: String(doc._id),
        message:
          "후원회원 가입 문의가 접수되었습니다. 담당자가 확인 후 선택하신 방식으로 1:1 개별 연락을 드려 안내해 드리겠습니다.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API supporter] 접수 오류:", error);
    return NextResponse.json(
      { error: "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
