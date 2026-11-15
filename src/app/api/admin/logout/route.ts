import { NextResponse } from "next/server";
import { getClearedSessionCookieOptions } from "@/lib/security/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getClearedSessionCookieOptions());
  return res;
}
