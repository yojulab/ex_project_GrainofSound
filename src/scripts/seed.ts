import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db/mongodb";
import { getServerEnv } from "@/lib/config/env";
import { ArchiveItem } from "@/lib/db/models/ArchiveItem";
import { SiteConfig } from "@/lib/db/models/SiteConfig";
import { AdminUser } from "@/lib/db/models/AdminUser";
import mongoose from "mongoose";

async function runSeed() {
  const isReset = process.argv.includes("--reset");
  const env = getServerEnv();
  await connectToDatabase();

  if (isReset) {
    await Promise.all([
      ArchiveItem.deleteMany({}),
      SiteConfig.deleteMany({}),
    ]);
    console.log("[GYEOL SEED] 기존 아카이브 및 사이트 설정 초기화 완료.");
  }

  // 1. 단체 기본 정보 시드 (후원 계좌번호 절대 미포함)
  await SiteConfig.findOneAndUpdate(
    { key: "main" },
    {
      key: "main",
      organizationName: "연희단 결 (고유번호증 등록 비영리임의단체)",
      legalDesignation: "비영리임의단체 · 전통연희 예술 공동체",
      location: "경기도 부천시 (부천 거점 연습실 및 활동)",
      representativeName: "연희단 결 대표",
      registrationNumber: "고유번호증 등록 단체 (문의 시 증빙 제공)",
      contactPhone: "010-0000-0000 (공연·단원·후원 1:1 문의)",
      contactEmail: env.contactMailTo,
      kakaoOpenChatUrl: env.kakaoOpenChatUrl,
    },
    { upsert: true, new: true }
  );

  // 2. 공연 아카이브 갤러리 시드 (6건)
  const existingArchives = await ArchiveItem.countDocuments();
  if (existingArchives === 0) {
    await ArchiveItem.insertMany([
      {
        category: "welfare",
        title: "어르신과 함께하는 신명 민요 한마당",
        subtitle: "부천시 OO노인복지관 나눔 공연",
        description:
          "어르신들께서 익숙하게 따라 부르실 수 있는 경기·남도 민요와 장구 장단으로 채운 따뜻한 위문 공연 현장입니다.",
        imageUrl: "/images/archive/welfare-1.webp",
        imageAlt: "부천시 어르신 복지관 나눔 공연에서 민요와 장구 장단을 선보이는 연희단 결",
        aspectRatio: "4:5",
        sortOrder: 1,
        isPublic: true,
      },
      {
        category: "welfare",
        title: "찾아가는 치유의 장구·소고 합주",
        subtitle: "부천 관내 요양원 찾아가는 문화 나눔",
        description:
          "거동이 불편하신 어르신들을 위해 요양원 실내 강당 규모에 맞추어 음량과 동선을 세심하게 조율한 맞춤형 나눔 공연입니다.",
        imageUrl: "/images/archive/welfare-2.webp",
        imageAlt: "요양원 실내에서 장구와 소고 합주를 연주하는 연희단 결 단원들",
        aspectRatio: "1:1",
        sortOrder: 2,
        isPublic: true,
      },
      {
        category: "welfare",
        title: "세대를 잇는 어울림 박수 마당",
        subtitle: "부천시 지역 돌봄 센터 초청 무대",
        description:
          "어르신과 돌봄 종사자분들이 함께 박수를 치며 흥을 나누는 참여형 전통연희 프로그램입니다.",
        imageUrl: "/images/archive/welfare-3.webp",
        imageAlt: "복지센터 방문객들과 함께 흥을 나누는 연희단 결 어울림 마당",
        aspectRatio: "4:5",
        sortOrder: 3,
        isPublic: true,
      },
      {
        category: "festival",
        title: "축제의 서막을 여는 힘찬 길놀이",
        subtitle: "부천시 지역 문화축제 개막 식전 공연",
        description:
          "행사의 성공과 지역 주민의 평안을 기원하며 관객과 함께 행진하는 역동적인 길놀이 무대입니다.",
        imageUrl: "/images/archive/festival-1.webp",
        imageAlt: "지자체 문화축제 개막식에서 길놀이를 선보이는 연희단 결",
        aspectRatio: "4:5",
        sortOrder: 4,
        isPublic: true,
      },
      {
        category: "festival",
        title: "한국 소리의 결을 전하는 공식 갈라",
        subtitle: "외교·기관 초청 한국 전통연희 문화교류",
        description:
          "주한 대사관 및 공식 기관 초청 행사에서 한국 전통 타악과 연희의 미학을 소개하는 의전 맞춤형 갈라 프로그램입니다.",
        imageUrl: "/images/archive/festival-2.webp",
        imageAlt: "기관 초청 문화교류 무대에서 전통연희 갈라 공연을 펼치는 모습",
        aspectRatio: "1:1",
        sortOrder: 5,
        isPublic: true,
      },
      {
        category: "festival",
        title: "사물판굿과 소고놀음의 정수",
        subtitle: "지자체 광장 야외 초청 본공연",
        description:
          "꽹과리, 징, 장구, 북의 웅장한 합주와 화려한 소고놀음이 어우러져 야외 축제의 열기를 최고조로 끌어올립니다.",
        imageUrl: "/images/archive/festival-3.webp",
        imageAlt: "야외 축제 무대에서 사물판굿과 소고놀음을 연주하는 연희단 결",
        aspectRatio: "4:5",
        sortOrder: 6,
        isPublic: true,
      },
    ]);
  }

  // 3. 초기 운영자 계정 시드 (비공개 /admin 접근용)
  const passwordHash = await bcrypt.hash(env.initialAdminPassword, 12);
  await AdminUser.findOneAndUpdate(
    { username: env.initialAdminUsername },
    {
      username: env.initialAdminUsername,
      email: env.initialAdminEmail,
      passwordHash,
      role: "admin",
    },
    { upsert: true, new: true }
  );

  console.log("[GYEOL SEED] grain_of_sound 데이터베이스 시딩 완료.");
  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error("[GYEOL SEED ERROR]", err);
  process.exit(1);
});
