"use client";

import { useState } from "react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RepertoireSection } from "@/components/sections/RepertoireSection";
import { JoinUsSection } from "@/components/sections/JoinUsSection";
import { ActionCenterSection } from "@/components/sections/ActionCenterSection";
import { Footer, type FooterSiteInfo } from "@/components/layout/Footer";
import {
  StickyBottomCta,
  type ActionModalType,
} from "@/components/layout/StickyBottomCta";
import { PerformanceModal } from "@/components/modals/PerformanceModal";
import { MemberModal } from "@/components/modals/MemberModal";
import { SupporterModal } from "@/components/modals/SupporterModal";
import type { ArchiveItemView } from "@/components/modals/ArchiveLightboxModal";

interface GyeolOnePageClientProps {
  siteInfo: FooterSiteInfo;
  kakaoOpenChatUrl: string;
  archiveItems: ArchiveItemView[];
}

export function GyeolOnePageClient({
  siteInfo,
  kakaoOpenChatUrl,
  archiveItems,
}: GyeolOnePageClientProps) {
  const [activeModal, setActiveModal] = useState<ActionModalType>(null);

  return (
    <div className="min-h-[100dvh] bg-[#F6F3EC] text-[#1A1917]">
      <MinimalHeader />

      <main>
        <HeroSection />
        <AboutSection />
        <RepertoireSection
          archiveItems={archiveItems}
          onRequestPerformance={() => setActiveModal("performance")}
        />
        <JoinUsSection
          onOpenMemberModal={() => setActiveModal("member")}
          onOpenSupporterModal={() => setActiveModal("supporter")}
        />
        <ActionCenterSection
          kakaoOpenChatUrl={kakaoOpenChatUrl}
          onOpenModal={(type) => setActiveModal(type)}
        />
      </main>

      <Footer siteInfo={siteInfo} />

      <StickyBottomCta onOpenModal={(type) => setActiveModal(type)} />

      <PerformanceModal
        open={activeModal === "performance"}
        onClose={() => setActiveModal(null)}
        kakaoOpenChatUrl={kakaoOpenChatUrl}
      />
      <MemberModal
        open={activeModal === "member"}
        onClose={() => setActiveModal(null)}
        kakaoOpenChatUrl={kakaoOpenChatUrl}
      />
      <SupporterModal
        open={activeModal === "supporter"}
        onClose={() => setActiveModal(null)}
        kakaoOpenChatUrl={kakaoOpenChatUrl}
      />
    </div>
  );
}
