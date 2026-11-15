import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { PerformanceRequest } from "@/lib/db/models/PerformanceRequest";
import { MemberApplication } from "@/lib/db/models/MemberApplication";
import { SupporterInquiry } from "@/lib/db/models/SupporterInquiry";
import { AuditLog } from "@/lib/db/models/AuditLog";
import { getAdminSession } from "@/lib/security/auth";
import { getClientIp } from "@/lib/security/rate-limit";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  await connectToDatabase();
  const [performances, members, supporters] = await Promise.all([
    PerformanceRequest.find().sort({ createdAt: -1 }).limit(100).lean(),
    MemberApplication.find().sort({ createdAt: -1 }).limit(100).lean(),
    SupporterInquiry.find().sort({ createdAt: -1 }).limit(100).lean(),
  ]);

  return NextResponse.json({
    performances: performances.map((p) => ({ ...p, _id: String(p._id) })),
    members: members.map((m) => ({ ...m, _id: String(m._id) })),
    supporters: supporters.map((s) => ({ ...s, _id: String(s._id) })),
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = (await req.json()) as {
    kind?: "performance" | "member" | "supporter";
    id?: string;
    status?: string;
  };

  if (!body.kind || !body.id || !body.status) {
    return NextResponse.json(
      { error: "kind, id, status 값이 필요합니다." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  if (body.kind === "performance") {
    await PerformanceRequest.findByIdAndUpdate(body.id, {
      status: body.status,
    });
  } else if (body.kind === "member") {
    await MemberApplication.findByIdAndUpdate(body.id, { status: body.status });
  } else if (body.kind === "supporter") {
    await SupporterInquiry.findByIdAndUpdate(body.id, { status: body.status });
  } else {
    return NextResponse.json({ error: "잘못된 kind 값입니다." }, { status: 400 });
  }

  await AuditLog.create({
    actorUsername: session.username,
    action: "UPDATE_INQUIRY_STATUS",
    targetType: body.kind,
    targetId: body.id,
    detail: `status -> ${body.status}`,
    ipAddress: getClientIp(req),
  });

  return NextResponse.json({ ok: true });
}
