import { connectToDatabase } from "@/lib/db/mongodb";
import { ArchiveItem } from "@/lib/db/models/ArchiveItem";
import { SiteConfig } from "@/lib/db/models/SiteConfig";
import { getPublicEnv } from "@/lib/config/env";
import { GyeolOnePageClient } from "@/components/GyeolOnePageClient";
import type { ArchiveItemView } from "@/components/modals/ArchiveLightboxModal";
import type { FooterSiteInfo } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { kakaoOpenChatUrl } = getPublicEnv();
  await connectToDatabase();

  const [siteConfig, rawArchives] = await Promise.all([
    SiteConfig.findOne({ key: "main" }).lean(),
    ArchiveItem.find({ isPublic: true }).sort({ sortOrder: 1 }).lean(),
  ]);

  if (!siteConfig) {
    throw new Error(
      "[CRITICAL DATA ERROR] SiteConfig('main')가 grain_of_sound DB에 시드되지 않았습니다. 'npm run seed'를 먼저 실행하세요."
    );
  }

  const siteInfo: FooterSiteInfo = {
    organizationName: siteConfig.organizationName,
    legalDesignation: siteConfig.legalDesignation,
    location: siteConfig.location,
    representativeName: siteConfig.representativeName,
    registrationNumber: siteConfig.registrationNumber,
    contactPhone: siteConfig.contactPhone,
    contactEmail: siteConfig.contactEmail,
  };

  const archiveItems: ArchiveItemView[] = rawArchives.map((item) => ({
    id: String(item._id),
    category: item.category,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    aspectRatio: item.aspectRatio,
  }));

  return (
    <GyeolOnePageClient
      siteInfo={siteInfo}
      kakaoOpenChatUrl={siteConfig.kakaoOpenChatUrl || kakaoOpenChatUrl}
      archiveItems={archiveItems}
    />
  );
}
