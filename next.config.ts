import os from "node:os";
import type { NextConfig } from "next";

function getLocalNetworkIps(): string[] {
  const ips: string[] = [];
  const interfaces = os.networkInterfaces();
  for (const entries of Object.values(interfaces)) {
    if (!entries) continue;
    for (const entry of entries) {
      if (entry.family === "IPv4" && entry.address) {
        ips.push(entry.address);
      }
    }
  }
  return ips;
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    unoptimized: false,
  },
  poweredByHeader: false,
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "neptune.axfoundly.com",
    "*.axfoundly.com",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    ...getLocalNetworkIps(),
  ],
};

export default nextConfig;
