"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface AdminPerformanceItem {
  _id: string;
  organization: string;
  contactName: string;
  contactPhone: string;
  preferredDatePlace: string;
  eventType: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export interface AdminMemberItem {
  _id: string;
  applicantName: string;
  phone: string;
  region: string;
  specialties: string[];
  experienceAndIntro: string;
  status: string;
  createdAt: string;
}

export interface AdminSupporterItem {
  _id: string;
  supporterNameOrOrg: string;
  phone: string;
  preferredContactMethod: string;
  supportType: string;
  cheeringMessage?: string;
  status: string;
  createdAt: string;
}

interface AdminDashboardClientProps {
  username: string;
  initialPerformances: AdminPerformanceItem[];
  initialMembers: AdminMemberItem[];
  initialSupporters: AdminSupporterItem[];
}

export function AdminDashboardClient({
  username,
  initialPerformances,
  initialMembers,
  initialSupporters,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"performance" | "member" | "supporter">(
    "performance"
  );
  const [performances, setPerformances] = useState(initialPerformances);
  const [members, setMembers] = useState(initialMembers);
  const [supporters, setSupporters] = useState(initialSupporters);

  const handleStatusChange = async (
    kind: "performance" | "member" | "supporter",
    id: string,
    status: string
  ) => {
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id, status }),
    });
    if (!res.ok) return;

    if (kind === "performance") {
      setPerformances((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } else if (kind === "member") {
      setMembers((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status } : m))
      );
    } else {
      setSupporters((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status } : s))
      );
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-[100dvh] bg-[#F6F3EC] px-5 py-8 text-[#1A1917]">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8D0C5] pb-5">
          <div>
            <p className="font-serif-en text-xs tracking-[0.18em] text-[#A63A2B] uppercase">
              GYEOL · ADMIN CONSOLE
            </p>
            <h1 className="font-serif-kr mt-1 text-2xl font-semibold">
              연희단 결 접수 내역 관리 ({username})
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="border border-[#D8D0C5] bg-[#EAE4D7]/50 px-3.5 py-2 text-xs font-medium hover:border-[#4A3525]"
            >
              공식 페이지 보기
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-[#4A3525] bg-[#4A3525] px-3.5 py-2 text-xs font-medium text-[#F6F3EC]"
            >
              로그아웃
            </button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTab("performance")}
            className={`border p-3 text-left text-sm font-semibold ${
              tab === "performance"
                ? "border-[#4A3525] bg-[#4A3525] text-[#F6F3EC]"
                : "border-[#D8D0C5] bg-[#EAE4D7]/55"
            }`}
          >
            공연 신청 ({performances.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("member")}
            className={`border p-3 text-left text-sm font-semibold ${
              tab === "member"
                ? "border-[#4A3525] bg-[#4A3525] text-[#F6F3EC]"
                : "border-[#D8D0C5] bg-[#EAE4D7]/55"
            }`}
          >
            단원 지원 ({members.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("supporter")}
            className={`border p-3 text-left text-sm font-semibold ${
              tab === "supporter"
                ? "border-[#A63A2B] bg-[#A63A2B] text-[#F6F3EC]"
                : "border-[#D8D0C5] bg-[#EAE4D7]/55"
            }`}
          >
            후원 문의 ({supporters.length})
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {tab === "performance" &&
            performances.map((item) => (
              <div
                key={item._id}
                className="border border-[#D8D0C5] bg-[#EAE4D7]/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold">
                      {item.organization} — {item.contactName} (
                      {item.contactPhone})
                    </p>
                    <p className="mt-1 text-sm text-[#5C564F]">
                      희망 일시/장소: {item.preferredDatePlace} · 성격:{" "}
                      {item.eventType}
                    </p>
                    {item.notes && (
                      <p className="mt-2 text-sm text-[#1A1917]">
                        요청사항: {item.notes}
                      </p>
                    )}
                  </div>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange("performance", item._id, e.target.value)
                    }
                    className="border border-[#D8D0C5] bg-[#F6F3EC] px-2.5 py-1.5 text-xs"
                  >
                    <option value="received">접수됨</option>
                    <option value="contacted">연락완료</option>
                    <option value="confirmed">공연확정</option>
                    <option value="archived">보관</option>
                  </select>
                </div>
              </div>
            ))}

          {tab === "member" &&
            members.map((item) => (
              <div
                key={item._id}
                className="border border-[#D8D0C5] bg-[#EAE4D7]/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold">
                      {item.applicantName} ({item.phone}) · {item.region}
                    </p>
                    <p className="mt-1 text-sm text-[#5C564F]">
                      분야: {item.specialties.join(", ")}
                    </p>
                    <p className="mt-2 text-sm text-[#1A1917]">
                      {item.experienceAndIntro}
                    </p>
                  </div>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange("member", item._id, e.target.value)
                    }
                    className="border border-[#D8D0C5] bg-[#F6F3EC] px-2.5 py-1.5 text-xs"
                  >
                    <option value="received">접수됨</option>
                    <option value="contacted">참관안내완료</option>
                    <option value="joined">입단완료</option>
                    <option value="archived">보관</option>
                  </select>
                </div>
              </div>
            ))}

          {tab === "supporter" &&
            supporters.map((item) => (
              <div
                key={item._id}
                className="border border-[#D8D0C5] bg-[#EAE4D7]/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold">
                      {item.supporterNameOrOrg} ({item.phone})
                    </p>
                    <p className="mt-1 text-sm text-[#5C564F]">
                      안내방식: {item.preferredContactMethod} · 참여형태:{" "}
                      {item.supportType}
                    </p>
                    {item.cheeringMessage && (
                      <p className="mt-2 text-sm text-[#1A1917]">
                        응원: {item.cheeringMessage}
                      </p>
                    )}
                  </div>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange("supporter", item._id, e.target.value)
                    }
                    className="border border-[#D8D0C5] bg-[#F6F3EC] px-2.5 py-1.5 text-xs"
                  >
                    <option value="received">접수됨</option>
                    <option value="guided_1to1">1:1 안내완료</option>
                    <option value="completed">가입완료</option>
                    <option value="archived">보관</option>
                  </select>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
