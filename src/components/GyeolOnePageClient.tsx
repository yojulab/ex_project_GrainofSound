"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer, type FooterSiteInfo } from "@/components/layout/Footer";
import type { ActionModalType } from "@/components/layout/StickyBottomCta";
import { PerformanceModal } from "@/components/modals/PerformanceModal";
import { MemberModal } from "@/components/modals/MemberModal";
import { SupporterModal } from "@/components/modals/SupporterModal";
import { DigitalCardModal } from "@/components/modals/DigitalCardModal";
import {
  ArchiveLightboxModal,
  type ArchiveItemView,
} from "@/components/modals/ArchiveLightboxModal";
import {
  PARCOURS_SCENES,
  type SceneId,
} from "@/components/parcours/parcoursData";
import { SceneSeuil } from "@/components/parcours/SceneSeuil";
import { SceneCour } from "@/components/parcours/SceneCour";
import { SceneEcho } from "@/components/parcours/SceneEcho";
import { SceneLettre } from "@/components/parcours/SceneLettre";

interface GyeolOnePageClientProps {
  siteInfo: FooterSiteInfo;
  kakaoOpenChatUrl: string;
  archiveItems: ArchiveItemView[];
}

function GyeolOnePageInner({
  siteInfo,
  kakaoOpenChatUrl,
  archiveItems,
}: GyeolOnePageClientProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<ActionModalType>(null);
  const [digitalCardOpen, setDigitalCardOpen] = useState(false);
  const [selectedArchive, setSelectedArchive] =
    useState<ArchiveItemView | null>(null);

  const currentScene = PARCOURS_SCENES[sceneIndex];
  const isAnyModalOpen =
    activeModal !== null || digitalCardOpen || selectedArchive !== null;

  const goToSceneById = useCallback((id: SceneId) => {
    const idx = PARCOURS_SCENES.findIndex((s) => s.id === id);
    if (idx !== -1) setSceneIndex(idx);
  }, []);

  const goPrev = useCallback(() => {
    setSceneIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goNext = useCallback(() => {
    setSceneIndex((prev) =>
      prev < PARCOURS_SCENES.length - 1 ? prev + 1 : prev
    );
  }, []);

  // 키보드 방향키(ArrowLeft / ArrowRight)로 장면 전환
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnyModalOpen) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnyModalOpen, goNext, goPrev]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F9F7F2] text-[#262523]">
      <MinimalHeader
        activeSceneId={currentScene.id}
        onSelectScene={goToSceneById}
        onOpenDigitalCard={() => setDigitalCardOpen(true)}
      />

      {/* 중앙 4장면 전환 전시 무대 */}
      <main className="flex flex-1 items-center justify-center py-4">
        <div key={currentScene.id} className="hanji-scene-enter w-full">
          {currentScene.id === "seuil" && (
            <SceneSeuil onNextScene={() => goToSceneById("cour")} />
          )}
          {currentScene.id === "cour" && (
            <SceneCour
              onOpenPerformanceModal={() => setActiveModal("performance")}
            />
          )}
          {currentScene.id === "echo" && (
            <SceneEcho
              archiveItems={archiveItems}
              onSelectArchive={(item) => setSelectedArchive(item)}
            />
          )}
          {currentScene.id === "lettre" && (
            <SceneLettre
              kakaoOpenChatUrl={kakaoOpenChatUrl}
              onOpenModal={(type) => setActiveModal(type)}
            />
          )}
        </div>
      </main>

      {/* 하단 이전/다음 장면 전환 컨트롤 */}
      <div className="border-t border-[#D8D0C5] bg-[#F9F7F2]/95 px-5 py-3 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between text-xs tracking-[0.16em] uppercase">
          <button
            type="button"
            onClick={goPrev}
            disabled={sceneIndex === 0}
            className="inline-flex items-center gap-2 py-1 text-[#262523] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Précédent</span>
          </button>

          <span className="text-[11px] text-[#5C564F]">
            {currentScene.roman} · {currentScene.title} (
            {String(sceneIndex + 1).padStart(2, "0")} /{" "}
            {String(PARCOURS_SCENES.length).padStart(2, "0")})
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={sceneIndex === PARCOURS_SCENES.length - 1}
            className="inline-flex items-center gap-2 py-1 text-[#262523] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span>Suivant</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 최하단 한 줄 푸터 */}
      <Footer siteInfo={siteInfo} />

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
      <DigitalCardModal
        open={digitalCardOpen}
        onClose={() => setDigitalCardOpen(false)}
        siteInfo={siteInfo}
      />
      <ArchiveLightboxModal
        item={selectedArchive}
        onClose={() => setSelectedArchive(null)}
      />
    </div>
  );
}

export function GyeolOnePageClient(props: GyeolOnePageClientProps) {
  return (
    <LanguageProvider>
      <GyeolOnePageInner {...props} />
    </LanguageProvider>
  );
}
