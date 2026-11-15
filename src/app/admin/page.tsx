import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/security/auth";
import { connectToDatabase } from "@/lib/db/mongodb";
import { PerformanceRequest } from "@/lib/db/models/PerformanceRequest";
import { MemberApplication } from "@/lib/db/models/MemberApplication";
import { SupporterInquiry } from "@/lib/db/models/SupporterInquiry";
import { AdminDashboardClient } from "@/app/admin/AdminDashboardClient";

export const metadata: Metadata = {
  title: "운영자 접수 관리 | 연희단 결",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await connectToDatabase();
  const [performances, members, supporters] = await Promise.all([
    PerformanceRequest.find().sort({ createdAt: -1 }).limit(100).lean(),
    MemberApplication.find().sort({ createdAt: -1 }).limit(100).lean(),
    SupporterInquiry.find().sort({ createdAt: -1 }).limit(100).lean(),
  ]);

  return (
    <AdminDashboardClient
      username={session.username}
      initialPerformances={performances.map((p) => ({
        _id: String(p._id),
        organization: p.organization,
        contactName: p.contactName,
        contactPhone: p.contactPhone,
        preferredDatePlace: p.preferredDatePlace,
        eventType: p.eventType,
        notes: p.notes,
        status: p.status,
        createdAt: p.createdAt.toISOString(),
      }))}
      initialMembers={members.map((m) => ({
        _id: String(m._id),
        applicantName: m.applicantName,
        phone: m.phone,
        region: m.region,
        specialties: m.specialties,
        experienceAndIntro: m.experienceAndIntro,
        status: m.status,
        createdAt: m.createdAt.toISOString(),
      }))}
      initialSupporters={supporters.map((s) => ({
        _id: String(s._id),
        supporterNameOrOrg: s.supporterNameOrOrg,
        phone: s.phone,
        preferredContactMethod: s.preferredContactMethod,
        supportType: s.supportType,
        cheeringMessage: s.cheeringMessage,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
