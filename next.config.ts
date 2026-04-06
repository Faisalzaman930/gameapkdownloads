import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "777gameapk.com.pk" },
      { protocol: "https", hostname: "gameistan.com.pk" },
    ],
  },
};

export default nextConfig;
