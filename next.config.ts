import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://gameistan.com.pk https://777gameapk.com.pk https://s3.cdnpk688.com https://apkgame.com.pk https://naya.com.pk https://77pakgame.org https://apkmarkhor.net https://slotspk.io",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "777gameapk.com.pk" },
      { protocol: "https", hostname: "gameistan.com.pk" },
      { protocol: "https", hostname: "s3.cdnpk688.com" },
      { protocol: "https", hostname: "apkgame.com.pk" },
      { protocol: "https", hostname: "naya.com.pk" },
      { protocol: "https", hostname: "77pakgame.org" },
      { protocol: "https", hostname: "apkmarkhor.net" },
      { protocol: "https", hostname: "slotspk.io" },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
