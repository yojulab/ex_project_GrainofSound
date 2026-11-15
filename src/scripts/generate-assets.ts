import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const ARCHIVE_DIR = path.join(PUBLIC_DIR, "images", "archive");

async function generateAssets() {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  // 1. 1200x630 한지 톤 Open Graph 대표 썸네일 (og-gyeol-hanji.png)
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#F6F3EC"/>
    <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#D8D0C5" stroke-width="2"/>
    <rect x="540" y="130" width="120" height="36" fill="none" stroke="#A63A2B" stroke-width="1.5"/>
    <text x="600" y="154" text-anchor="middle" font-family="serif" font-size="18" fill="#A63A2B" letter-spacing="4">GYEOL</text>
    <text x="600" y="275" text-anchor="middle" font-family="Georgia, serif" font-size="68" fill="#1A1917">The Grain of Sound, GYEOL</text>
    <text x="600" y="355" text-anchor="middle" font-family="sans-serif" font-size="32" fill="#4A3525">연희단 결 — 나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결</text>
    <line x1="420" y1="420" x2="780" y2="420" stroke="#D8D0C5" stroke-width="2"/>
    <text x="600" y="475" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#5C564F">경기도 부천시 비영리 전통연희 예술 공동체 · 공연 섭외 · 단원 및 후원회원 안내</text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .png({ quality: 92 })
    .toFile(path.join(PUBLIC_DIR, "og-gyeol-hanji.png"));

  // 2. Hero 장구·소고 세피아/먹선 풀폭 비주얼 (hero-janggu-ink.webp)
  const heroSvg = `
  <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sepiaGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#EAE4D7"/>
        <stop offset="100%" stop-color="#D8D0C5"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#sepiaGlow)"/>
    <g stroke="#4A3525" stroke-opacity="0.28" fill="none">
      <circle cx="800" cy="500" r="360" stroke-width="1.5"/>
      <circle cx="800" cy="500" r="280" stroke-width="1"/>
      <path d="M350 350 C520 350, 640 460, 800 500 C960 540, 1080 650, 1250 650" stroke-width="2.5"/>
      <path d="M350 650 C520 650, 640 540, 800 500 C960 460, 1080 350, 1250 350" stroke-width="2.5"/>
      <ellipse cx="350" cy="500" rx="45" ry="150" stroke-width="2.5"/>
      <ellipse cx="1250" cy="500" rx="45" ry="150" stroke-width="2.5"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(heroSvg))
    .webp({ quality: 82 })
    .toFile(path.join(PUBLIC_DIR, "images", "hero-janggu-ink.webp"));

  // 3. 아카이브 갤러리 6종 WebP 생성
  const archiveSpecs = [
    { file: "welfare-1.webp", bg: "#EAE4D7", accent: "#4A3525", label: "나눔의 결 · 요양원 민요 한마당", w: 800, h: 1000 },
    { file: "welfare-2.webp", bg: "#E5DDD0", accent: "#A63A2B", label: "나눔의 결 · 복지관 장구·소고 합주", w: 800, h: 800 },
    { file: "welfare-3.webp", bg: "#EAE4D7", accent: "#1A1917", label: "나눔의 결 · 어르신 어깨춤 마당", w: 800, h: 1000 },
    { file: "festival-1.webp", bg: "#E5DDD0", accent: "#4A3525", label: "교류의 결 · 부천 지자체 축제 길놀이", w: 800, h: 1000 },
    { file: "festival-2.webp", bg: "#EAE4D7", accent: "#A63A2B", label: "교류의 결 · 주한 대사관 전통연희 갈라", w: 800, h: 800 },
    { file: "festival-3.webp", bg: "#E5DDD0", accent: "#1A1917", label: "교류의 결 · 사물판굿 &amp; 소고놀음", w: 800, h: 1000 },
  ];

  for (const spec of archiveSpecs) {
    const svg = `
    <svg width="${spec.w}" height="${spec.h}" viewBox="0 0 ${spec.w} ${spec.h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${spec.w}" height="${spec.h}" fill="${spec.bg}"/>
      <rect x="32" y="32" width="${spec.w - 64}" height="${spec.h - 64}" fill="none" stroke="#D8D0C5" stroke-width="2"/>
      <circle cx="${spec.w / 2}" cy="${spec.h / 2 - 40}" r="140" fill="none" stroke="${spec.accent}" stroke-width="2" stroke-opacity="0.55"/>
      <circle cx="${spec.w / 2}" cy="${spec.h / 2 - 40}" r="96" fill="none" stroke="#4A3525" stroke-width="1.2" stroke-opacity="0.45"/>
      <path d="M${spec.w / 2 - 120} ${spec.h / 2 - 40} Q${spec.w / 2} ${spec.h / 2 - 120} ${spec.w / 2 + 120} ${spec.h / 2 - 40}" fill="none" stroke="${spec.accent}" stroke-width="2.5"/>
      <path d="M${spec.w / 2 - 120} ${spec.h / 2 - 40} Q${spec.w / 2} ${spec.h / 2 + 40} ${spec.w / 2 + 120} ${spec.h / 2 - 40}" fill="none" stroke="${spec.accent}" stroke-width="2.5"/>
      <text x="${spec.w / 2}" y="${spec.h - 120}" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#1A1917">${spec.label}</text>
      <text x="${spec.w / 2}" y="${spec.h - 80}" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#5C564F">GYEOL ARCHIVE</text>
    </svg>`;

    await sharp(Buffer.from(svg))
      .webp({ quality: 82 })
      .toFile(path.join(ARCHIVE_DIR, spec.file));
  }

  console.log("[GYEOL ASSETS] OG PNG 및 WebP 아카이브 이미지 생성 완료.");
}

generateAssets().catch((err) => {
  console.error(err);
  process.exit(1);
});
