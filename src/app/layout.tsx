import type { Metadata, Viewport } from "next";
import "./globals.css";
import { UiInspector } from "@/components/inspect/UiInspector";
import { getPublicEnv } from "@/lib/config/env";

const { appUrl } = getPublicEnv();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F9F7F2",
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Yeonheedan Gyeol — Le Grain du Son | Parcours d’exposition",
  description:
    "Le grain du bois, du cuir et du souffle humain. Ensemble artistique à but non lucratif Yeonheedan Gyeol : partage, dialogue culturel Corée–France et transmission des arts traditionnels.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yeonheedan Gyeol",
  },
  openGraph: {
    title: "Yeonheedan Gyeol — The Grain of Sound",
    description:
      "Le grain du bois, du cuir et du souffle humain — Association artistique à but non lucratif dédiée aux arts traditionnels coréens.",
    url: appUrl,
    siteName: "Yeonheedan Gyeol (The Grain of Sound)",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${appUrl}/og-gyeol-hanji.png`,
        width: 1200,
        height: 630,
        alt: "Yeonheedan Gyeol — Esthétique Hanji et encre",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeonheedan Gyeol — The Grain of Sound",
    description:
      "Le grain du bois, du cuir et du souffle humain — Association artistique à but non lucratif.",
    images: [`${appUrl}/og-gyeol-hanji.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
      <body className="antialiased bg-[#F9F7F2] text-[#262523]">
        <div className="hanji-grain-overlay" aria-hidden="true" />
        {children}
        <UiInspector />
      </body>
    </html>
  );
}
