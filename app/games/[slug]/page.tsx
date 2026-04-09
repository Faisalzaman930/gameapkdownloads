import type { Metadata } from "next";
import Image from "next/image";
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
    title: `${game.name} APK Download — Free ${game.bonus}`,
    description: `Download ${game.name} APK free in Pakistan. ${game.bonus} for new players. Instant EasyPaisa & JazzCash payouts. Min withdraw ${game.minWithdraw}. Verified safe.`,
    keywords: game.keywords,
    alternates: { canonical: `https://gameapkdownloads.pk/games/${slug}` },
    openGraph: {
      title: `${game.name} APK Download — Free ${game.bonus}`,
      description: `Download ${game.name} APK free in Pakistan. ${game.bonus} for new players. Instant EasyPaisa & JazzCash payouts. Min withdraw ${game.minWithdraw}. Verified safe.`,
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
  const stars = Math.round(game.rating);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* BREADCRUMB */}
      <div className="bg-gray-900/60 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-violet-400">Home</Link>
          <span>/</span>
          <Link href="/games" className="hover:text-violet-400">Game</Link>
          <span>/</span>
          <span className="text-gray-300">{game.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        {/* ── HERO CARD — reference layout ─────────────────────────────────── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500 via-violet-400 to-violet-500" />

          <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-6">

            {/* LEFT — icon + download + rating (matches reference exactly) */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3 sm:w-44">
              {/* Game icon */}
              <div className="w-36 h-36 rounded-2xl overflow-hidden border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                {game.image ? (
                  <Image src={game.image} alt={`${game.name} APK icon`} width={144} height={144} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <span className="text-7xl">{game.emoji}</span>
                )}
              </div>

              {/* DOWNLOAD button */}
              <a href="#download-steps"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-extrabold py-3 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg shadow-violet-500/30">
                ⬇️ DOWNLOAD APK
              </a>

              {/* Rating */}
              <div className="text-center">
                <p className="text-yellow-400 text-lg leading-none">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</p>
                <p className="text-white font-bold text-lg mt-0.5">{game.rating}<span className="text-gray-500 font-normal text-sm">/5</span></p>
                <p className="text-gray-500 text-xs">Votes: {game.reviews.toLocaleString()}</p>
              </div>
            </div>

            {/* RIGHT — all game info */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h1 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-1">
                {game.name} Game Download — {game.tagline}
              </h1>

              {/* Version + category badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-gray-400 text-sm">{game.version}</span>
                <span className="bg-violet-500 text-gray-950 text-xs font-bold px-2.5 py-0.5 rounded-full">{game.category}</span>
                <span className="bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs px-2.5 py-0.5 rounded-full">🛡️ Verified</span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{game.description}</p>

              {/* Bonus banner */}
              <div className="flex items-center gap-3 bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2.5 mb-4">
                <span className="text-xl">🎁</span>
                <div className="flex-1">
                  <span className="text-xs text-gray-400">Welcome Bonus — </span>
                  <span className="text-violet-400 font-bold text-sm">{game.bonus}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Min Withdraw: </span>
                  <span className="text-white text-sm font-bold">{game.minWithdraw}</span>
                </div>
              </div>

              {/* Info grid — exactly like reference */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Size", value: game.size },
                  { label: "Version", value: game.version },
                  { label: "Requirements", value: "Android 5+" },
                  { label: "Downloads", value: game.installs ?? `${game.reviews.toLocaleString()}+` },
                  { label: "Last Updated", value: new Date(game.updatedAt).toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" }) },
                  { label: "Price", value: "Free" },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-800/60 rounded-xl px-3 py-2.5">
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-200">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-600 flex-wrap">
                <span>✅ No malware</span>
                <span>✅ EasyPaisa supported</span>
                <span>✅ JazzCash supported</span>
                <span>✅ Free to download</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-5">

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-violet-400">📸</span> {game.name} — Screenshots
                </h2>
                <div className={`grid gap-3 ${game.screenshots.length === 1 ? "grid-cols-1 max-w-xs" : game.screenshots.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
                  {game.screenshots.map((src, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                      <Image src={src} alt={`${game.name} screenshot ${i + 1}`} width={400} height={700} className="w-full h-auto object-contain" unoptimized />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Expert Verdict */}
            {game.expertVerdict && (
              <section className="bg-gradient-to-br from-violet-950 to-gray-900 border border-violet-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-violet-400 text-lg">🏅</span>
                  <h2 className="font-bold text-white">Expert Verdict</h2>
                  <span className="ml-auto text-xs bg-violet-500/20 border border-violet-500/30 text-violet-400 px-2 py-0.5 rounded-full">Hands-on Tested</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{game.expertVerdict}</p>
                <div className="flex items-center gap-3 border-t border-violet-500/20 pt-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-sm font-bold text-violet-400">
                    {game.reviewedBy?.[0] ?? "R"}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-200">{game.reviewedBy}</p>
                    {game.reviewedAt && (
                      <p className="text-xs text-gray-500">
                        Reviewed: {new Date(game.reviewedAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    )}
                  </div>
                  <Link href="/about" className="ml-auto text-xs text-violet-400 hover:underline">About our review process →</Link>
                </div>
              </section>
            )}

            {/* Features */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-violet-400">✨</span> Features &amp; Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {game.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-violet-400 flex-shrink-0 mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Download */}
            <section id="download-steps" className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-violet-400">📲</span> How to Download &amp; Install {game.name} APK
              </h2>
              <ol className="space-y-3">
                {game.howToDownload.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500 text-gray-950 text-xs font-extrabold flex items-center justify-center shadow">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-300 flex items-start gap-2">
                <span className="text-base mt-0.5 flex-shrink-0">⚠️</span>
                <span>Only download from <strong>gameapkdownloads.pk</strong>. Never share your login PIN with anyone.</span>
              </div>
            </section>

            {/* Tips & Strategies */}
            {game.tips && game.tips.length > 0 && (
              <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-violet-400">💡</span> Tips &amp; Strategies to Win on {game.name}
                </h2>
                <ol className="space-y-3">
                  {game.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Pros & Cons */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-violet-400">⚖️</span> Pros &amp; Cons of {game.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-3">
                  <p className="text-violet-400 font-semibold text-xs mb-2 uppercase tracking-wide">✅ Pros</p>
                  <ul className="space-y-1.5">
                    {(game.pros ?? game.features.slice(0, 4)).map((f) => (
                      <li key={f} className="text-xs text-gray-300 flex gap-2 items-start">
                        <span className="text-violet-400 flex-shrink-0">+</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                  <p className="text-red-400 font-semibold text-xs mb-2 uppercase tracking-wide">❌ Cons</p>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    {(game.cons ?? ["Android only (no iOS)", "Requires internet connection", "Earnings vary by skill & time", "Not on Google Play Store"]).map((c) => (
                      <li key={c} className="flex gap-2"><span className="text-red-400 flex-shrink-0">−</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* System Requirements */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-violet-400">📱</span> System Requirements for {game.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "OS", value: "Android 5.0+" },
                  { label: "RAM", value: "2 GB minimum" },
                  { label: "Storage", value: game.size },
                  { label: "Internet", value: "WiFi / 4G required" },
                  { label: "Processor", value: "Quad-core 1.4GHz+" },
                  { label: "iOS Support", value: "Not available" },
                ].map((r) => (
                  <div key={r.label} className="bg-gray-800/60 rounded-xl px-3 py-2.5">
                    <p className="text-xs text-gray-500 mb-0.5">{r.label}</p>
                    <p className="text-sm font-semibold text-gray-200">{r.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-violet-400">❓</span> Frequently Asked Questions — {game.name}
              </h2>
              <div className="space-y-2">
                {game.faqs.map((faq) => (
                  <details key={faq.q} className="group border border-gray-800 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-3.5 cursor-pointer text-sm font-medium text-gray-200 hover:text-violet-400 hover:bg-gray-800/40 transition-colors list-none">
                      <span>{faq.q}</span>
                      <span className="text-gray-600 transition-transform group-open:rotate-180 flex-shrink-0 ml-2 text-lg">↓</span>
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
              <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-violet-400">⭐</span> User Reviews
              </h2>
              <div className="flex items-center gap-5 mb-5 pb-4 border-b border-gray-800">
                <div className="text-center flex-shrink-0">
                  <p className="text-5xl font-extrabold text-white">{game.rating}</p>
                  <p className="text-yellow-400">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</p>
                  <p className="text-gray-600 text-xs mt-1">{game.reviews.toLocaleString()} ratings</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 w-2">{n}</span>
                      <span className="text-yellow-400 text-xs">★</span>
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full"
                          style={{ width: n === stars ? "65%" : n === stars - 1 ? "25%" : "5%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {game.userReviews.map((r) => (
                  <div key={r.author} className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-sm font-bold text-violet-400">
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

          {/* SIDEBAR */}
          <div className="space-y-5">
            {/* Safety */}
            <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-5 text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <p className="text-violet-400 font-bold text-sm mb-1">Verified Safe</p>
              <p className="text-gray-500 text-xs leading-relaxed">Scanned for malware. Payouts verified before listing.</p>
            </div>

            {/* Payments */}
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
              <div className="space-y-2">
                {relatedGames.map((rg) => (
                  <Link key={rg.slug} href={`/games/${rg.slug}`}
                    className="flex items-center gap-3 group hover:bg-gray-800 rounded-xl p-2 -mx-2 transition-colors">
                    <div className="w-10 h-10 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 group-hover:bg-gray-700 flex items-center justify-center">
                      {rg.image ? (
                        <Image src={rg.image} alt={`${rg.name} APK — related game`} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                      ) : (
                        <span className="text-xl">{rg.emoji}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-violet-400 transition-colors truncate">{rg.name}</p>
                      <p className="text-xs">
                        <span className="text-yellow-400">{"★".repeat(Math.round(rg.rating))}</span>
                        <span className="text-gray-500 ml-1">{rg.rating}</span>
                      </p>
                    </div>
                    <span className="text-violet-400 text-xs flex-shrink-0">↗</span>
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
