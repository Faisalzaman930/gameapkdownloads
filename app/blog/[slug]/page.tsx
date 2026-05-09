import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blogs";
import { getGame } from "@/lib/games";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `https://gameapkdownloads.pk/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://gameapkdownloads.pk/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedGameData = post.relatedGames
    .map((s) => getGame(s))
    .filter(Boolean);

  const relatedPostData = post.relatedPosts
    .map((s) => getBlogPost(s))
    .filter(Boolean);

  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.headline,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.split("—")[0].trim(),
      jobTitle: post.author.split("—")[1]?.trim() ?? "Reviewer",
    },
    publisher: {
      "@type": "Organization",
      name: "GameAPKDownloads.pk",
      url: "https://gameapkdownloads.pk",
      logo: {
        "@type": "ImageObject",
        url: "https://gameapkdownloads.pk/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gameapkdownloads.pk/blog/${slug}`,
    },
    url: `https://gameapkdownloads.pk/blog/${slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-PK",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gameapkdownloads.pk" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://gameapkdownloads.pk/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://gameapkdownloads.pk/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-gray-900/60 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-2 text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-violet-400">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-violet-400">Blog</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-[200px]">{post.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* MAIN CONTENT */}
          <article className="lg:col-span-2 space-y-0">

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest bg-violet-500 text-gray-950 px-2.5 py-0.5 rounded-full">
                  {post.isPillar ? "Pillar Guide" : post.category}
                </span>
                {post.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
                {post.title}
              </h1>

              <p className="text-gray-400 leading-relaxed mb-5">{post.description}</p>

              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-800 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">
                    {post.author[0]}
                  </div>
                  <span>{post.author.split("—")[0].trim()}</span>
                </div>
                <span>·</span>
                <span>Published {new Date(post.publishedAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>·</span>
                <span>Updated {new Date(post.updatedAt).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </header>

            {/* Body sections */}
            <div className="space-y-8">
              {post.body.map((section, i) => (
                <section key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
                    <span className="text-violet-400 flex-shrink-0 text-sm font-black">#{i + 1}</span>
                    {section.heading}
                  </h2>
                  <div className="text-gray-400 text-sm leading-relaxed space-y-3">
                    {section.content.split("\n\n").map((para, j) => {
                      // Table detection
                      if (para.includes("|---|")) {
                        const rows = para.trim().split("\n").filter((r) => !r.match(/^\|[-| ]+\|$/));
                        return (
                          <div key={j} className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse">
                              {rows.map((row, ri) => {
                                const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                                return (
                                  <tr key={ri} className={ri === 0 ? "border-b border-gray-700" : "border-b border-gray-800/50"}>
                                    {cells.map((cell, ci) => ri === 0
                                      ? <th key={ci} className="text-left py-2 pr-4 text-gray-300 font-bold">{cell}</th>
                                      : <td key={ci} className="py-2 pr-4 text-gray-400">{cell}</td>
                                    )}
                                  </tr>
                                );
                              })}
                            </table>
                          </div>
                        );
                      }
                      // Bold inline markdown
                      const rendered = para.replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-gray-200\">$1</strong>");
                      return <p key={j} dangerouslySetInnerHTML={{ __html: rendered }} />;
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Related pillar link */}
            {!post.isPillar && (
              <div className="mt-8 bg-violet-500/5 border border-violet-500/20 rounded-2xl p-5">
                <p className="text-xs text-violet-400 font-bold uppercase tracking-widest mb-2">Part of our Pillar Guide</p>
                <Link href="/blog/best-earning-apps-pakistan-2026"
                  className="font-extrabold text-white hover:text-violet-400 transition-colors text-base">
                  Best Earning Apps in Pakistan 2026 — Complete Guide →
                </Link>
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-5">

            {/* Related games */}
            {relatedGameData.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Apps Mentioned in This Guide</h3>
                <div className="space-y-2">
                  {relatedGameData.map((g) => g && (
                    <Link key={g.slug} href={`/games/${g.slug}`}
                      className="flex items-center gap-3 group hover:bg-gray-800 rounded-xl p-2 -mx-2 transition-colors">
                      <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                        {g.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-200 group-hover:text-violet-400 transition-colors truncate">{g.name}</p>
                        <p className="text-xs text-gray-500">{g.bonus}</p>
                      </div>
                      <span className="text-violet-400 text-xs flex-shrink-0">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related posts */}
            {relatedPostData.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Related Guides</h3>
                <div className="space-y-3">
                  {relatedPostData.map((p) => p && (
                    <Link key={p.slug} href={`/blog/${p.slug}`}
                      className="block group hover:bg-gray-800 rounded-xl p-2 -mx-2 transition-colors">
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-violet-400 transition-colors leading-snug">{p.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{p.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5 text-center">
              <p className="text-violet-400 font-bold text-sm mb-1">Browse All Games</p>
              <p className="text-gray-500 text-xs mb-3">111+ verified earning apps for Pakistan</p>
              <Link href="/games"
                className="inline-block bg-violet-500 hover:bg-violet-400 text-gray-950 font-extrabold text-xs px-4 py-2 rounded-xl transition-colors uppercase tracking-widest">
                View All Games →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
