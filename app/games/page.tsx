import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { games } from "@/lib/games";
import GamesBrowser, { type GameCard } from "./GamesBrowser";

export const metadata: Metadata = {
  title: "All Earning Game APKs Pakistan — Free Download 2026",
  description:
    "Earning app APKs for Pakistan. Casino, slots, sports & more. EasyPaisa & JazzCash payment guides. Community reviewed. Download free.",
  alternates: { canonical: "https://gameapkdownloads.pk/games" },
};

export default function GamesPage() {
  const cards: GameCard[] = games.map((game, i) => ({
    slug: game.slug,
    name: game.name,
    category: game.category,
    tagline: game.tagline,
    rating: game.rating,
    bonus: game.bonus,
    version: game.version,
    size: game.size,
    image: game.image,
    emoji: game.emoji,
    isNew: i < 3,
    q: [game.name, game.category, game.tagline, ...(game.keywords ?? [])]
      .join(" ")
      .toLowerCase(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-violet-400">Home</Link>
        <span>/</span>
        <span className="text-gray-300">All Games</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          All Game APK Downloads — Pakistan 2026
        </h1>
      </div>

      <Suspense fallback={null}>
        <GamesBrowser games={cards} />
      </Suspense>
    </div>
  );
}
