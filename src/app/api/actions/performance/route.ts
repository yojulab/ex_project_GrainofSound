import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { PerformanceRequest } from "@/lib/db/models/PerformanceRequest";
import { performanceRequestSchema } from "@/lib/validations/actions";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { sendAdminNotification } from "@/lib/notifications/notifier";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(ip, "performance", 5, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `요청이 너무 많습니다. ${rate.retryAfterSec}초 후 다시 시도해 주세요.`,
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as unknown;
    const parsed = performanceRequestSchema.safeParse(body);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "입력값을 다시 확인해 주세요.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    if (parsed.data._hp && parsed.data._hp.length > 0) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    await connectToDatabase();

    const doc = await PerformanceRequest.create({
      organization: parsed.data.organization,
      contactName: parsed.data.contactName,
      contactPhone: parsed.data.contactPhone,
      preferredDatePlace: parsed.data.preferredDatePlace,
      eventType: parsed.data.eventType,
      notes: parsed.data.notes,
      privacyAgreed: parsed.data.privacyAgreed,
      status: "received",
      notificationSent: false,
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") ?? "unknown",
    });

    const notified = await sendAdminNotification({
      subject: `[연희단 결] 새 공연 섭외 신청 — ${parsed.data.organization}`,
      text: [
        `기관/단체명: ${parsed.data.organization}`,
        `담당자: ${parsed.data.contactName} (${parsed.data.contactPhone})`,
        `희망 일시/장소: ${parsed.data.preferredDatePlace}`,
        `행사 성격: ${parsed.data.eventType}`,
        `개인정보 수집동의: 동의완료`,
        `기타 요청사항: ${parsed.data.notes || "없음"}`,
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
          "공연 신청이 정상적으로 접수되었습니다. 담당자가 확인 후 기재해 주신 연락처로 빠르게 회신드리겠습니다.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API performance] 접수 오류:", error);
    return NextResponse.json(
      { error: "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
