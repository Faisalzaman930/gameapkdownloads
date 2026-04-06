import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGame, games } from "@/lib/games";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  return {
    title: `${game.name} APK Download — ${game.tagline}`,
    description: game.description,
    keywords: game.keywords,
    alternates: { canonical: `https://gameapkdownloads.pk/games/${slug}` },
    openGraph: {
      title: `${game.name} APK Download Pakistan 2026`,
      description: game.description,
      url: `https://gameapkdownloads.pk/games/${slug}`,
      type: "article",
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const relatedGames = games.filter((g) => g.slug !== slug).slice(0, 6);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: game.name,
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating.toString(),
      reviewCount: game.reviews.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: game.userReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating.toString(), bestRating: "5" },
      reviewBody: r.body,
      datePublished: r.date,
    })),
    description: game.description,
    softwareVersion: game.version,
    fileSize: game.size,
    url: `https://gameapkdownloads.pk/games/${slug}`,
    dateModified: game.updatedAt,
    datePublished: game.publishedAt,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: game.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Download ${game.name} APK on Android`,
    step: game.howToDownload.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameapkdownloads.pk" },
      { "@type": "ListItem", position: 2, name: "Games", item: "https://gameapkdownloads.pk/games" },
      { "@type": "ListItem", position: 3, name: game.name, item: `https://gameapkdownloads.pk/games/${slug}` },
    ],
  };

  const stars = Math.round(game.rating);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* BREADCRUMB */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <span>›</span>
          <Link href="/games" className="hover:text-emerald-400">Games</Link>
          <span>›</span>
          <span className="text-gray-300">{game.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ── MAIN HERO CARD (APK store style) ────────────────────────────── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6">

          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          <div className="p-5 md:p-7">
            <div className="flex gap-5 items-start">
              {/* App Icon */}
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center text-5xl shadow-lg border border-gray-700">
                {game.emoji}
              </div>

              {/* App Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap mb-1">
                  <h1 className="text-xl md:text-2xl font-extrabold text-white leading-tight">{game.name}</h1>
                  <span className="bg-emerald-500 text-gray-950 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">FREE</span>
                  {game.installs && (
                    <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full mt-0.5">{game.installs} installs</span>
                  )}
                </div>

                <p className="text-sm text-emerald-400 font-medium mb-2">{game.category}</p>

                {/* Rating row */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400 text-base leading-none">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
                  <span className="text-white font-bold text-sm">{game.rating}</span>
                  <span className="text-gray-500 text-xs">({game.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                    📦 {game.size}
                  </span>
                  <span className="flex items-center gap-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                    🤖 Android
                  </span>
                  <span className="flex items-center gap-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                    🔄 {game.version}
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full">
                    🛡️ Verified Safe
                  </span>
                </div>
              </div>
            </div>

            {/* Bonus highlight */}
            <div className="mt-5 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="text-xs text-gray-400">Welcome Bonus</p>
                <p className="text-emerald-400 font-bold">{game.bonus}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-400">Min Withdrawal</p>
                <p className="text-white font-bold">{game.minWithdraw}</p>
              </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <a
              href="#download-steps"
              className="mt-4 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-extrabold py-4 rounded-xl text-lg transition-all hover:scale-[1.01] shadow-xl shadow-emerald-500/30"
            >
              <span className="text-2xl">⬇️</span>
              Download {game.name} APK — Free
            </a>

            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-600">
              <span>✅ No virus · No malware</span>
              <span>✅ EasyPaisa &amp; JazzCash supported</span>
              <span>✅ Android 5.0+</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN — main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Overview */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-emerald-400">📋</span> About {game.name}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{game.description}</p>
            </section>

            {/* Features */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">✨</span> Features &amp; Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {game.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Download */}
            <section id="download-steps" className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-emerald-400">📲</span> How to Download &amp; Install {game.name} APK
              </h2>
              <ol className="space-y-3">
                {game.howToDownload.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-gray-950 text-xs font-extrabold flex items-center justify-center shadow">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-300 flex items-start gap-2">
                <span className="text-base mt-0.5">⚠️</span>
                <span>Only download APKs from <strong>gameapkdownloads.pk</strong>. Never share your login PIN or password with anyone.</span>
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">⚖️</span> Pros &amp; Cons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                  <p className="text-emerald-400 font-semibold text-xs mb-2 uppercase tracking-wide">Pros</p>
                  <ul className="space-y-1.5">
                    {game.features.slice(0, 4).map((f) => (
                      <li key={f} className="text-xs text-gray-300 flex gap-2 items-start">
                        <span className="text-emerald-400 flex-shrink-0">+</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                  <p className="text-red-400 font-semibold text-xs mb-2 uppercase tracking-wide">Cons</p>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    <li className="flex gap-2 items-start"><span className="text-red-400 flex-shrink-0">−</span>Android only (no iOS yet)</li>
                    <li className="flex gap-2 items-start"><span className="text-red-400 flex-shrink-0">−</span>Requires stable internet</li>
                    <li className="flex gap-2 items-start"><span className="text-red-400 flex-shrink-0">−</span>Earnings depend on skill &amp; time</li>
                    <li className="flex gap-2 items-start"><span className="text-red-400 flex-shrink-0">−</span>Not on Google Play Store</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">❓</span> Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {game.faqs.map((faq) => (
                  <details key={faq.q} className="group border border-gray-800 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-3.5 cursor-pointer text-sm font-medium text-gray-200 hover:text-emerald-400 hover:bg-gray-800/50 transition-colors list-none">
                      <span>{faq.q}</span>
                      <span className="text-gray-600 text-lg transition-transform group-open:rotate-180 flex-shrink-0 ml-2">↓</span>
                    </summary>
                    <div className="px-4 pb-4 pt-2 text-sm text-gray-400 leading-relaxed border-t border-gray-800">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* User Reviews */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">⭐</span> User Reviews
              </h2>
              {/* Overall score */}
              <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-800">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-white">{game.rating}</p>
                  <p className="text-yellow-400 text-base">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{game.reviews.toLocaleString()} ratings</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 w-2">{n}</span>
                      <span className="text-yellow-400 text-xs">★</span>
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: n === stars ? "65%" : n === stars - 1 ? "25%" : "5%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {game.userReviews.map((r) => (
                  <div key={r.author} className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">
                      {r.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-200">{r.author}</p>
                        <p className="text-xs text-gray-600">{new Date(r.date).toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <p className="text-yellow-400 text-xs mb-1">{"★".repeat(r.rating)}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">
            {/* App info card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">App Information</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Version", value: game.version },
                  { label: "File Size", value: game.size },
                  { label: "Platform", value: "Android 5.0+" },
                  { label: "Category", value: game.category },
                  { label: "Price", value: "Free" },
                  { label: "Min Withdraw", value: game.minWithdraw },
                  { label: "Last Updated", value: new Date(game.updatedAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-gray-800 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="text-gray-200 font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety badge */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <p className="text-emerald-400 font-bold text-sm mb-1">Verified Safe</p>
              <p className="text-gray-500 text-xs leading-relaxed">Scanned for malware. Verified payouts by our team before listing.</p>
            </div>

            {/* Payment methods */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-3">Supported Payments</h3>
              <div className="flex gap-2">
                {["💚 EasyPaisa", "🟠 JazzCash"].map((p) => (
                  <div key={p} className="flex-1 bg-gray-800 rounded-lg py-2 text-center text-xs text-gray-300 font-medium">{p}</div>
                ))}
              </div>
            </div>

            {/* Related games */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Similar Games</h3>
              <div className="space-y-3">
                {relatedGames.map((rg) => (
                  <Link key={rg.slug} href={`/games/${rg.slug}`}
                    className="flex items-center gap-3 group hover:bg-gray-800 rounded-xl p-2 -mx-2 transition-colors">
                    <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-gray-700 transition-colors">
                      {rg.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-emerald-400 transition-colors truncate">{rg.name}</p>
                      <p className="text-xs text-yellow-400">{"★".repeat(Math.round(rg.rating))} <span className="text-gray-500">{rg.rating}</span></p>
                    </div>
                    <span className="text-xs text-emerald-400 flex-shrink-0">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
