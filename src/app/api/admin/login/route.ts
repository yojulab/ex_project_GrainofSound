import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db/mongodb";
import { AdminUser } from "@/lib/db/models/AdminUser";
import { AuditLog } from "@/lib/db/models/AuditLog";
import {
  createSessionToken,
  getSessionCookieOptions,
} from "@/lib/security/auth";
import { getClientIp } from "@/lib/security/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      username?: string;
      password?: string;
    };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호를 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await AdminUser.findOne({ username });
    const ip = getClientIp(req);

    if (!user) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
      return NextResponse.json(
        {
          error:
            "로그인 시도 횟수를 초과하여 계정이 일시 잠금되었습니다. 15분 후 다시 시도해 주세요.",
        },
        { status: 423 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await user.save();

      await AuditLog.create({
        actorUsername: username,
        action: "ADMIN_LOGIN_FAILED",
        targetType: "AdminUser",
        targetId: String(user._id),
        detail: `실패 횟수: ${user.failedAttempts}`,
        ipAddress: ip,
      });

      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    user.failedAttempts = 0;
    user.lockUntil = null;
    user.lastLoginAt = new Date();
    await user.save();

    await AuditLog.create({
      actorUsername: user.username,
      action: "ADMIN_LOGIN_SUCCESS",
      targetType: "AdminUser",
      targetId: String(user._id),
      ipAddress: ip,
    });

    const token = createSessionToken(user.username);
    const res = NextResponse.json({ ok: true, username: user.username });
    res.cookies.set(getSessionCookieOptions(token));
    return res;
  } catch (error) {
    console.error("[API admin login] 오류:", error);
    return NextResponse.json(
      { error: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
