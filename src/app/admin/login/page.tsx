"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || "로그인에 실패했습니다.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#F6F3EC] px-5">
      <div
        data-serial-id="A01-LGN-BOX01"
        data-serial-label="운영자 비공개 로그인 박스"
        className="w-full max-w-sm border border-[#D8D0C5] bg-[#EAE4D7]/60 p-7"
      >
        <p className="font-serif-en text-xs tracking-[0.18em] text-[#A63A2B] uppercase">
          GYEOL · ADMIN ONLY
        </p>
        <h1 className="font-serif-kr mt-1 text-xl font-semibold text-[#1A1917]">
          연희단 결 운영자 접속
        </h1>
        <p className="mt-1 text-xs text-[#5C564F]">
          공연 섭외, 단원 지원 및 후원 문의 내역 확인용 비공개 화면입니다.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#1A1917]">
              운영자 아이디
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="min-h-[44px] w-full border border-[#D8D0C5] bg-[#F6F3EC] px-3 py-2 text-sm text-[#1A1917] focus:border-[#4A3525] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#1A1917]">
              비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[44px] w-full border border-[#D8D0C5] bg-[#F6F3EC] px-3 py-2 text-sm text-[#1A1917] focus:border-[#4A3525] focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p className="border border-[#A63A2B] bg-[#A63A2B]/10 p-2.5 text-xs text-[#A63A2B]">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-[46px] w-full rounded-sm bg-[#4A3525] px-4 py-2.5 text-sm font-semibold text-[#F6F3EC] hover:bg-[#38271B] disabled:opacity-60"
          >
            {loading ? "확인 중..." : "운영자 로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
