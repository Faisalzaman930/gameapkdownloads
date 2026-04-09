import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/lib/games";

export const metadata: Metadata = {
  title: "All Earning Game APKs Pakistan — Free Download 2026",
  description:
    "30+ earning app APKs for Pakistan. All free, verified safe. Casino, slots, sports & more. EasyPaisa & JazzCash payouts. Download your app now.",
  alternates: { canonical: "https://gameapkdownloads.pk/games" },
};

export default function GamesPage() {
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
        <p className="text-gray-400">
          {games.length} games listed. All APKs verified, safe, and updated regularly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game, i) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="group bg-gray-900 border border-gray-800 hover:border-violet-500/60 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/5"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-700 flex-shrink-0 flex items-center justify-center bg-gray-800">
                {game.image ? (
                  <Image src={game.image} alt={`${game.name} APK icon — download free`} width={48} height={48} sizes="48px" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{game.emoji}</span>
                )}
              </div>
              <div>
                <h2 className="font-bold text-white group-hover:text-violet-400 transition-colors">
                  {game.name}
                </h2>
                <p className="text-xs text-gray-500">{game.category}</p>
              </div>
              {i < 3 && (
                <span className="ml-auto text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{game.tagline}</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">{"★".repeat(Math.round(game.rating))}</span>
                <span className="text-gray-500">{game.rating}</span>
              </div>
              <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded-full">
                {game.bonus}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-600">
              <span>{game.version} · {game.size}</span>
              <span className="text-violet-400 font-semibold group-hover:underline">Download →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
