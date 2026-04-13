import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gameapkdownloads.pk"),
  title: {
    default: "Game APK Downloads Pakistan 2026 — Free & Verified",
    template: "%s | GameAPKDownloads.pk",
  },
  description:
    "Download 30+ real money earning apps in Pakistan. Free APKs, verified payouts, EasyPaisa & JazzCash guides. Updated daily.",
  keywords: [
    "game apk download pakistan",
    "earning app pakistan",
    "real money games pakistan 2026",
    "easypaisa withdrawal games",
    "jazzcash earning app",
  ],
  openGraph: {
    siteName: "GameAPKDownloads.pk",
    locale: "en_PK",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://gameapkdownloads.pk" },
  verification: { google: "0PRzBNFdTiGRyxpj_NlvO_a3YFCBpBdAMX4jorxLBV0" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon-192.png",
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Latest Games" },
  { href: "/categories/casino", label: "Casino" },
  { href: "/categories/slots", label: "Slots" },
  { href: "/categories/sports", label: "Sports" },
  { href: "/about", label: "About" },
];

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GameAPKDownloads.pk",
  url: "https://gameapkdownloads.pk",
  logo: "https://gameapkdownloads.pk/favicon-512.png",
  description: "Pakistan's most trusted source for game APK downloads, earning app reviews, and withdrawal guides.",
  contactPoint: { "@type": "ContactPoint", email: "contact@gameapkdownloads.pk", contactType: "customer support" },
  sameAs: ["https://github.com/Faisalzaman930/gameapkdownloads"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="preconnect" href="https://gameistan.com.pk" />
        <link rel="preconnect" href="https://777gameapk.com.pk" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans">
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        {/* NAV */}
        <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-violet-400">
              <Image src="/favicon-32.png" alt="GameAPKDownloads.pk logo" width={28} height={28} className="rounded-md" />
              <span>GameAPKDownloads<span className="text-gray-400">.pk</span></span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-violet-400 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/games"
                className="text-xs font-semibold bg-orange-500 hover:bg-orange-400 text-white px-3 py-1.5 rounded-full transition-colors"
              >
                Download Now
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
            <div>
              <p className="text-violet-400 font-bold text-base mb-2 flex items-center gap-2"><Image src="/favicon-32.png" alt="GameAPKDownloads.pk logo" width={20} height={20} className="rounded" /> GameAPKDownloads.pk</p>
              <p>Pakistan&apos;s most trusted source for game APK downloads, earning app reviews, and withdrawal guides — updated daily.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200 mb-2">Quick Links</p>
              <ul className="space-y-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-violet-400 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-200 mb-2">Legal</p>
              <ul className="space-y-1">
                <li><Link href="/disclaimer" className="hover:text-violet-400">Disclaimer</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-violet-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-violet-400">Terms & Conditions</Link></li>
              </ul>
              <p className="mt-4 text-xs text-gray-600">
                This site provides information about earning apps for adults 18+. Always play responsibly.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-600">
            © {new Date().getFullYear()} GameAPKDownloads.pk — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
