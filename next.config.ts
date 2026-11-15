import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    unoptimized: false,
  },
  poweredByHeader: false,
};

export default nextConfig;
