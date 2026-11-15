import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getServerEnv } from "@/lib/config/env";

const SESSION_COOKIE_NAME = "gyeol_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8시간

export interface AdminSessionPayload {
  username: string;
  role: "admin";
  exp: number;
}

function signPayload(data: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

export function createSessionToken(username: string): string {
  const { sessionSecret } = getServerEnv();
  const payload: AdminSessionPayload = {
    username,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  );
  const sig = signPayload(encoded, sessionSecret);
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string): AdminSessionPayload | null {
  try {
    const { sessionSecret } = getServerEnv();
    const [encoded, sig] = token.split(".");
    if (!encoded || !sig) return null;

    const expectedSig = signPayload(encoded, sessionSecret);
    const sigBuf = Buffer.from(sig);
    const expectedBuf = Buffer.from(expectedSig);
    if (
      sigBuf.length !== expectedBuf.length ||
      !crypto.timingSafeEqual(sigBuf, expectedBuf)
    ) {
      return null;
    }

    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as AdminSessionPayload;

    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) return null;
  return verifySessionToken(raw);
}

export function getSessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function getClearedSessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}
