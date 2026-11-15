import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({
      status: "ok",
      database: conn.connection.name,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[GYEOL HEALTH] DB 연결 실패:", error);
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 500 }
    );
  }
}
