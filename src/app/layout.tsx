import type { Metadata, Viewport } from "next";
import "./globals.css";
import { UiInspector } from "@/components/inspect/UiInspector";
import { getPublicEnv } from "@/lib/config/env";

const { appUrl } = getPublicEnv();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F3EC",
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "연희단 결 (GYEOL : The Grain of Sound)",
  description:
    "전통의 결로 이웃과 세계를 잇는 비영리 전통연희단체 연희단 결 공식 페이지입니다. 공연 섭외 및 단원·후원회원 모집 안내",
  openGraph: {
    title: "연희단 결 (GYEOL : The Grain of Sound)",
    description:
      "전통의 결로 이웃과 세계를 잇는 비영리 전통연희단체 연희단 결 공식 페이지입니다. 공연 섭외 및 단원·후원회원 모집 안내",
    url: appUrl,
    siteName: "연희단 결 (GYEOL : The Grain of Sound)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${appUrl}/og-gyeol-hanji.png`,
        width: 1200,
        height: 630,
        alt: "연희단 결 (GYEOL : The Grain of Sound) 한지 에디토리얼 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "연희단 결 (GYEOL : The Grain of Sound)",
    description:
      "나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결 — 비영리 전통연희단체 연희단 결 공식 페이지",
    images: [`${appUrl}/og-gyeol-hanji.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Serif+KR:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <div className="hanji-grain-overlay" aria-hidden="true" />
        {children}
        <UiInspector />
      </body>
    </html>
  );
}
