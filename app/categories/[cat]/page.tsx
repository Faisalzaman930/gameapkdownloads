import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/lib/games";

interface Props {
  params: Promise<{ cat: string }>;
}

const categoryMap: Record<string, { label: string; icon: string; keywords: string[] }> = {
  casino: { label: "Casino Games", icon: "🎰", keywords: ["casino", "Casino"] },
  slots: { label: "Slots", icon: "🎲", keywords: ["Slot", "slot", "777"] },
  sports: { label: "Sports Prediction", icon: "⚽", keywords: ["Sport", "sport", "Cricket", "cricket"] },
  fishing: { label: "Fishing Games", icon: "🎣", keywords: ["Fishing", "fishing"] },
  card: { label: "Card Games", icon: "🃏", keywords: ["Card", "card", "Rummy", "rummy", "Teen Patti"] },
  "fast-play": { label: "Fast-Play Games", icon: "⚡", keywords: ["Fast", "fast", "Crash", "crash", "Color", "color"] },
};

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const cat_info = categoryMap[cat];
  if (!cat_info) return {};
  return {
    title: `Best ${cat_info.label} APK Downloads Pakistan — Free 2026`,
    description: `Download the top ${cat_info.label.toLowerCase()} earning apps in Pakistan — free APKs, verified payouts, EasyPaisa & JazzCash. Get your welcome bonus now.`,
    alternates: { canonical: `https://gameapkdownloads.pk/categories/${cat}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const cat_info = categoryMap[cat];

  const filtered = cat_info
    ? games.filter((g) =>
        cat_info.keywords.some(
          (kw) => g.category.includes(kw) || g.name.includes(kw) || g.description.includes(kw)
        )
      )
    : games;

  const label = cat_info?.label ?? "All Games";
  const icon = cat_info?.icon ?? "🎮";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-violet-400">Home</Link>
        <span>›</span>
        <Link href="/games" className="hover:text-violet-400">Games</Link>
        <span>›</span>
        <span className="text-gray-300">{label}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold text-white">{label} — Pakistan 2026</h1>
          <p className="text-gray-500 text-sm">{filtered.length} games found · All APKs verified</p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🎮</p>
          <p className="text-gray-400">No games found in this category yet. Check back soon!</p>
          <Link href="/games" className="mt-4 inline-block text-violet-400 hover:underline">Browse all games →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`}
              className="group bg-gray-900 border border-gray-800 hover:border-violet-500/50 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/5">
              <div className="h-0.5 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-4 flex gap-3 items-start">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden border border-gray-700 flex-shrink-0 flex items-center justify-center">
                  {game.image ? (
                    <Image src={game.image} alt={`${game.name} APK download icon`} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <span className="text-3xl">{game.emoji}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-white text-sm group-hover:text-violet-400 transition-colors">{game.name}</h2>
                  <p className="text-xs text-gray-500 mb-1">{game.category}</p>
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <span className="text-yellow-400">{"★".repeat(Math.round(game.rating))}</span>
                    <span className="text-gray-400">{game.rating}</span>
                    <span className="text-gray-600 ml-1">{game.installs ?? `${game.reviews.toLocaleString()} reviews`}</span>
                  </div>
                  <span className="text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded-md">{game.bonus}</span>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between bg-orange-500 group-hover:bg-orange-400 rounded-xl px-4 py-2.5 transition-colors">
                  <span className="text-xs font-bold text-gray-950">⬇️ Download APK</span>
                  <span className="text-xs text-gray-800 font-medium">Free</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
