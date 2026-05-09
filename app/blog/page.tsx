import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog — Earning App Guides & News Pakistan 2026 | GameAPKDownloads",
  description:
    "Expert guides, withdrawal tips, and earning app news for Pakistani players. Updated weekly by our review team.",
  alternates: { canonical: "https://gameapkdownloads.pk/blog" },
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();
  const pillar = posts.find((p) => p.isPillar);
  const clusters = posts.filter((p) => !p.isPillar);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Guides & News</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Earning App Blog — Pakistan 2026
        </h1>
        <p className="text-gray-400 text-sm">
          Expert guides, withdrawal tips, and game reviews from the GameAPKDownloads.pk team.
        </p>
      </div>

      {/* Pillar post — featured */}
      {pillar && (
        <Link href={`/blog/${pillar.slug}`} className="block mb-8 group">
          <div className="bg-gradient-to-br from-violet-950 to-gray-900 border border-violet-500/30 rounded-2xl p-6 hover:border-violet-500/60 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest bg-violet-500 text-gray-950 px-2.5 py-0.5 rounded-full">Pillar Guide</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">{pillar.category}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-violet-400 transition-colors mb-2 leading-snug">
              {pillar.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{pillar.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>✍️ {pillar.author.split("—")[0].trim()}</span>
              <span>📅 {new Date(pillar.publishedAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </Link>
      )}

      {/* Cluster posts grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {clusters.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className="h-full bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-violet-500/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="font-extrabold text-white group-hover:text-violet-400 transition-colors mb-2 leading-snug text-base">
                {post.title}
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{post.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span>{new Date(post.publishedAt).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}</span>
                <span>·</span>
                <span className="text-violet-400">Read guide →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
