import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { MemberApplication } from "@/lib/db/models/MemberApplication";
import { memberApplicationSchema } from "@/lib/validations/actions";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { sendAdminNotification } from "@/lib/notifications/notifier";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(ip, "member", 5, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `요청이 너무 많습니다. ${rate.retryAfterSec}초 후 다시 시도해 주세요.`,
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as unknown;
    const parsed = memberApplicationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "입력값을 다시 확인해 주세요.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    if (parsed.data._hp && parsed.data._hp.length > 0) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    await connectToDatabase();

    const doc = await MemberApplication.create({
      applicantName: parsed.data.applicantName,
      phone: parsed.data.phone,
      region: parsed.data.region,
      specialties: parsed.data.specialties,
      experienceAndIntro: parsed.data.experienceAndIntro,
      status: "received",
      notificationSent: false,
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") ?? "unknown",
    });

    const notified = await sendAdminNotification({
      subject: `[연희단 결] 새 일반회원(단원) 지원 — ${parsed.data.applicantName}`,
      text: [
        `성함: ${parsed.data.applicantName} (${parsed.data.phone})`,
        `거주 지역: ${parsed.data.region}`,
        `주요 분야: ${parsed.data.specialties.join(", ")}`,
        `경력 및 소개:\n${parsed.data.experienceAndIntro}`,
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
          "지원해 주셔서 감사합니다. 담당 단원이 확인 후 기재해 주신 연락처로 연습 일정 및 참관 안내를 드리겠습니다.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API member] 접수 오류:", error);
    return NextResponse.json(
      { error: "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
