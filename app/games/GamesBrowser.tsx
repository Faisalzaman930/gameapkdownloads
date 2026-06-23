"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface GameCard {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  rating: number;
  bonus: string;
  version: string;
  size: string;
  image?: string;
  emoji: string;
  isNew: boolean;
  q: string;
}

export default function GamesBrowser({ games }: { games: GameCard[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return games;
    return games.filter((g) => tokens.every((t) => g.q.includes(t)));
  }, [query, games]);

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games by name or category…"
            aria-label="Search games"
            autoComplete="off"
            className="w-full rounded-xl border border-gray-800 bg-gray-900 py-3 pl-11 pr-10 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-violet-500/60"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500" aria-live="polite">
          {query
            ? `${filtered.length} result${filtered.length === 1 ? "" : "s"} for “${query}”`
            : `${games.length} games listed. Community reviewed and updated regularly.`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 py-16 text-center">
          <p className="text-gray-400">No games match “{query}”.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-3 text-sm font-semibold text-violet-400 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((game) => (
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
                {!query && game.isNew && (
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
      )}
    </>
  );
}
