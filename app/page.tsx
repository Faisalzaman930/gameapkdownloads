import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestGames } from "@/lib/games";

export const metadata: Metadata = {
  title: "Game APK Downloads Pakistan — Real Money Earning Apps 2026",
  description:
    "Download free earning app APKs in Pakistan. Verified safe, instant EasyPaisa & JazzCash payouts. Get your welcome bonus today — updated daily.",
  alternates: { canonical: "https://gameapkdownloads.pk" },
  openGraph: {
    title: "Game APK Downloads Pakistan — Real Money Earning Apps 2026",
    description:
      "Download free earning app APKs in Pakistan. Verified safe, instant EasyPaisa & JazzCash payouts. Get your welcome bonus today.",
    url: "https://gameapkdownloads.pk",
    type: "website",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GameAPKDownloads.pk",
  url: "https://gameapkdownloads.pk",
  description:
    "Pakistan's most trusted source for game APK downloads and earning app reviews.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://gameapkdownloads.pk/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Top 10 Latest Earning Game APKs Pakistan 2026",
  description:
    "Curated list of the best real money earning apps available for download in Pakistan in 2026.",
  url: "https://gameapkdownloads.pk",
  mainEntity: {
    "@type": "ItemList",
    name: "Top 10 Latest Games",
    numberOfItems: 10,
  },
};

const stats = [
  { label: "Games Listed", value: "110+" },
  { label: "Daily Downloads", value: "25K+" },
  { label: "Verified Payouts", value: "50K+" },
  { label: "Avg. Rating", value: "4.5 ★" },
];

const categories = [
  { label: "Casino Games", icon: "🎰", href: "/categories/casino", count: 40 },
  { label: "Slots", icon: "🎲", href: "/categories/slots", count: 25 },
  { label: "Sports Prediction", icon: "⚽", href: "/categories/sports", count: 18 },
  { label: "Fishing Games", icon: "🎣", href: "/categories/fishing", count: 12 },
  { label: "Card Games", icon: "🃏", href: "/categories/card", count: 15 },
  { label: "Fast-Play", icon: "⚡", href: "/categories/fast-play", count: 20 },
];

export default function HomePage() {
  const games = getLatestGames(10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 border-b border-gray-800">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Updated Daily — Latest Games April 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Pakistan&apos;s #1 Source for
            <br />
            <span className="text-violet-400">Game APK Downloads</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Download the latest real money earning apps in Pakistan. Honest reviews, verified
            payouts, and step-by-step guides for EasyPaisa &amp; JazzCash withdrawals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/games"
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all hover:scale-105 shadow-lg shadow-violet-500/25"
            >
              Browse All Games →
            </Link>
            <Link
              href="#latest"
              className="border border-gray-700 hover:border-violet-500 text-gray-300 hover:text-violet-400 font-semibold px-8 py-3.5 rounded-full text-base transition-all"
            >
              Top 10 Latest ↓
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
                <p className="text-2xl font-extrabold text-violet-400">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex flex-col items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-violet-500/50 rounded-xl p-4 transition-all group"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-semibold text-gray-200 group-hover:text-violet-400 text-center leading-tight">
                {c.label}
              </span>
              <span className="text-xs text-gray-600">{c.count} games</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP 10 LATEST GAMES */}
      <section id="latest" className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              🔥 Top 10 Latest Games — April 2026
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Sorted by most recently updated. All APKs verified and safe.
            </p>
          </div>
          <Link href="/games" className="text-violet-400 text-sm hover:underline hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game, i) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="group bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/5"
            >
              {/* Card top accent */}
              <div className="h-0.5 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-4 flex gap-3 items-start">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden border border-gray-700 group-hover:border-violet-500/40 transition-colors flex items-center justify-center">
                    {game.image ? (
                      <Image src={game.image} alt={`${game.name} APK download — earning app Pakistan`} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <span className="text-3xl">{game.emoji}</span>
                    )}
                  </div>
                  {i < 3 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      NEW
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <h3 className="font-bold text-white text-sm group-hover:text-violet-400 transition-colors leading-tight">
                      {game.name}
                    </h3>
                    <span className="text-xs text-gray-600 flex-shrink-0">#{i + 1}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{game.category}</p>
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <span className="text-yellow-400">{"★".repeat(Math.round(game.rating))}</span>
                    <span className="text-gray-400">{game.rating}</span>
                    <span className="text-gray-600 ml-1">{game.installs ?? `${game.reviews.toLocaleString()} reviews`}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-md">{game.size}</span>
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded-md">{game.bonus}</span>
                  </div>
                </div>
              </div>

              {/* Download button at bottom */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between bg-orange-500 group-hover:bg-orange-400 rounded-xl px-4 py-2.5 transition-colors">
                  <span className="text-xs font-bold text-gray-950">⬇️ Download APK</span>
                  <span className="text-xs text-gray-800 font-medium">Free</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-extrabold text-white text-center mb-10">
            Why Choose GameAPKDownloads.pk?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Verified & Safe APKs",
                desc: "Every APK is scanned for malware before listing. We only publish apps with verified withdrawal proofs.",
              },
              {
                icon: "⚡",
                title: "Updated Daily",
                desc: "Our team reviews and updates game listings every day so you always get the latest version with newest bonuses.",
              },
              {
                icon: "💸",
                title: "Withdrawal Guides Included",
                desc: "Every game page includes step-by-step EasyPaisa & JazzCash withdrawal guides with screenshots.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-400 text-sm leading-loose">
        <h2 className="text-xl font-bold text-white mb-4">
          Best Real Money Earning Games in Pakistan 2026
        </h2>
        <p className="mb-4">
          Looking for the latest game APK downloads in Pakistan? GameAPKDownloads.pk is your
          one-stop destination for safe, verified, and up-to-date earning apps. Whether you&apos;re
          into casino mini-games, fishing games, Rummy, or sports prediction — we cover them all
          with honest reviews and real withdrawal proofs.
        </p>
        <p className="mb-4">
          All apps listed on this site support{" "}
          <strong className="text-gray-300">EasyPaisa and JazzCash withdrawals</strong>,
          Pakistan&apos;s two most popular payment methods. Each game page includes a step-by-step
          download guide, complete feature breakdown, pros &amp; cons, and frequently asked
          questions.
        </p>
        <p>
          Our editorial team tests every app before publishing. We verify that withdrawals work,
          bonuses are as advertised, and the APK is free of malware. Bookmark this page and check
          back daily — we add new games every week.
        </p>
      </section>
    </>
  );
}
