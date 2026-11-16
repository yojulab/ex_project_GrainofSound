import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { SiteConfig } from "@/lib/db/models/SiteConfig";
import { getServerEnv } from "@/lib/config/env";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const env = getServerEnv();
    await connectToDatabase();
    const config = await SiteConfig.findOne({ key: "main" }).lean();

    const orgName = config?.organizationName || "연희단 결 (고유번호증 등록 비영리임의단체)";
    const repName = config?.representativeName || "김연희";
    const phone = config?.contactPhone?.split(" ")[0] || "010-0000-0000";
    const email = config?.contactEmail || env.contactMailTo;
    const location = config?.location || "경기도 부천시 (부천 거점 연습실 및 활동)";
    const appUrl = env.appUrl;

    const vCardLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${repName} (${orgName})`,
      `N:${repName};;;;`,
      `ORG:${orgName};전통연희 예술 공동체`,
      `TITLE:대표`,
      `TEL;TYPE=CELL,VOICE:${phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${email}`,
      `ADR;TYPE=WORK:;;${location};부천시;경기도;;대한민국`,
      `URL:${appUrl}`,
      "NOTE;CHARSET=UTF-8:연희단 결(GYEOL : The Grain of Sound) — 나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결. 고유번호: 123-82-45678 (비영리임의단체).",
      "REV:" + new Date().toISOString(),
      "END:VCARD",
    ];

    const vCardContent = vCardLines.join("\r\n") + "\r\n";

    return new NextResponse(vCardContent, {
      status: 200,
      headers: {
        "Content-Type": "text/vcard; charset=utf-8",
        "Content-Disposition": 'attachment; filename="GYEOL_Digital_Card.vcf"',
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("[vCard API Error]", err);
    return new NextResponse("Error generating vCard", { status: 500 });
  }
}
