"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import type { ActionModalType } from "@/components/layout/StickyBottomCta";
import { LETTRE_PLACEHOLDERS } from "./parcoursData";

interface SceneLettreProps {
  kakaoOpenChatUrl: string;
  onOpenModal: (type: Exclude<ActionModalType, null>) => void;
}

export function SceneLettre({
  kakaoOpenChatUrl,
  onOpenModal,
}: SceneLettreProps) {
  return (
    <section
      aria-label="IV. La Lettre"
      data-serial-id="G04-PARCOURS-LETTRE"
      className="mx-auto w-full max-w-4xl px-6 py-8 md:py-12"
    >
      <div className="mb-8 border-b border-[#D8D0C5] pb-4">
        <p className="text-[11px] tracking-[0.26em] text-[#A63A2B] uppercase">
          IV · La Lettre
        </p>
        <h2 className="mt-2 text-2xl font-normal text-[#262523] sm:text-3xl">
          Correspondance &amp; Demandes par objet
        </h2>
      </div>

      {/* 목적별 안내 3종 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => onOpenModal("performance")}
          className="flex flex-col justify-between border border-[#4A3525] bg-[#4A3525] p-5 text-left text-[#F9F7F2] transition-colors hover:bg-[#38271B]"
        >
          <span className="text-[11px] tracking-[0.2em] opacity-75 uppercase">
            01 · Scène
          </span>
          <div className="mt-4">
            <p className="text-lg font-medium">Invitation &amp; Spectacle</p>
            <p className="mt-1 text-xs leading-relaxed text-[#EFECE4]/90">
              Scènes solidaires, festivals, échanges franco-coréens et ateliers.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal("member")}
          className="flex flex-col justify-between border border-[#D8D0C5] bg-[#EFECE4]/60 p-5 text-left text-[#262523] transition-colors hover:border-[#4A3525]"
        >
          <span className="text-[11px] tracking-[0.2em] text-[#5C564F] uppercase">
            02 · Ensemble
          </span>
          <div className="mt-4">
            <p className="text-lg font-medium">Rejoindre les artistes</p>
            <p className="mt-1 text-xs leading-relaxed text-[#5C564F]">
              Candidature pour interprètes et praticiens du yeonhee traditionnel.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal("supporter")}
          className="flex flex-col justify-between border border-[#A63A2B]/60 bg-[#F9F7F2] p-5 text-left text-[#262523] transition-colors hover:border-[#A63A2B] hover:bg-[#EFECE4]/40"
        >
          <span className="text-[11px] tracking-[0.2em] text-[#A63A2B] uppercase">
            03 · Soutien
          </span>
          <div className="mt-4">
            <p className="text-lg font-medium text-[#A63A2B]">
              Mécénat &amp; Partenariat
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5C564F]">
              Accompagner les créations et la diffusion culturelle de l’ensemble.
            </p>
          </div>
        </button>
      </div>

      {/* 연락처 및 Placeholder 정보 */}
      <div className="mt-8 border border-[#D8D0C5] bg-[#EFECE4]/35 p-6 sm:p-7">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3 text-sm text-[#262523]">
            <p className="text-[11px] tracking-[0.22em] text-[#5C564F] uppercase">
              Contacts directs
            </p>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#4A3525]" />
              <span>
                Téléphone / KakaoTalk :{" "}
                <strong className="font-medium">
                  {LETTRE_PLACEHOLDERS.phoneAndKakao}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#4A3525]" />
              <span>
                E-mail :{" "}
                <span className="font-medium">{LETTRE_PLACEHOLDERS.email}</span>
              </span>
            </div>
            <p className="pt-1 text-xs leading-relaxed text-[#5C564F]">
              {LETTRE_PLACEHOLDERS.koreanNotice}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-[#D8D0C5] pt-4 text-sm text-[#5C564F] md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <div className="space-y-1.5 text-xs">
              <p>
                Représentant(e) :{" "}
                <span className="text-[#262523]">
                  {LETTRE_PLACEHOLDERS.representativeName}
                </span>
              </p>
              <p>
                N° d’enregistrement :{" "}
                <span className="text-[#262523]">
                  {LETTRE_PLACEHOLDERS.registrationNumber}
                </span>
              </p>
              <p>Siège : {LETTRE_PLACEHOLDERS.location}</p>
            </div>

            <a
              href={kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 border border-[#262523] bg-[#262523] px-4 py-2 text-xs tracking-[0.14em] text-[#F9F7F2] uppercase transition-colors hover:bg-[#4A3525]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Ouvrir KakaoTalk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
