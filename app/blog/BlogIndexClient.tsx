"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

function formatDate(d: string): string {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexClient({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [posts, activeCategory],
  );

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="mx-auto max-w-[1100px] px-6 pb-20 pt-16">
      {/* Header */}
      <header className="mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          The ChairFill Blog
        </div>
        <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl [font-family:var(--font-satoshi)]">
          Real strategies for{" "}
          <span className="text-[#C9A84C]">independent barbers.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#888880]">
          No fluff. No engagement-bait. Tactical breakdowns for filling chairs,
          recovering lapsed clients, and turning a phone full of contacts into
          recurring revenue.
        </p>
      </header>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all ${
                active
                  ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                  : "border-[#1e1e1e] text-[#888880] hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-12 grid gap-0 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111111] transition-all hover:border-[#C9A84C]/50 hover:shadow-[0_8px_40px_rgba(201,168,76,0.07)] md:grid-cols-2"
        >
          <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#161616] via-[#111111] to-[#0a0a0a] p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(201,168,76,0.10)_0%,transparent_70%)]" />
            <div className="relative text-center">
              <div className="mb-3 inline-block rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Featured
              </div>
              <div className="text-[120px] font-black leading-none text-[#C9A84C]/15 [font-family:var(--font-satoshi)]">
                01
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#888880]">
              <span className="text-[#C9A84C]">{featured.category}</span>
              <span>•</span>
              <span>{featured.readingTime}</span>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-white md:text-3xl [font-family:var(--font-satoshi)]">
              {featured.title}
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-[#888880]">
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#5a5650]">
                {formatDate(featured.date)}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] transition-transform group-hover:translate-x-1">
                Read article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-xl border border-[#1e1e1e] bg-[#111111] p-7 transition-all hover:border-[#C9A84C]/40 hover:bg-[#161616]"
          >
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em]">
              <span className="text-[#C9A84C]">{p.category}</span>
              <span className="text-[#5a5650]">•</span>
              <span className="text-[#888880]">{p.readingTime}</span>
            </div>
            <h3 className="mb-3 text-lg font-bold leading-tight text-white [font-family:var(--font-satoshi)]">
              {p.title}
            </h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-[#888880]">
              {p.excerpt}
            </p>
            <div className="flex items-center justify-between border-t border-[#1e1e1e] pt-4">
              <span className="text-[11px] uppercase tracking-wider text-[#5a5650]">
                {formatDate(p.date)}
              </span>
              <ArrowRight className="h-4 w-4 text-[#C9A84C] transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-12 text-center text-[#888880]">
          No posts in this category yet.
        </div>
      )}

      {/* CTA strip */}
      <div className="mt-20 overflow-hidden rounded-2xl border border-[#C9A84C]/25 bg-gradient-to-br from-[#161616] via-[#111111] to-[#0a0a0a] p-10 text-center md:p-14">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
          Stop reading. Start filling.
        </div>
        <h3 className="mx-auto mb-4 max-w-xl text-2xl font-bold text-white md:text-3xl [font-family:var(--font-satoshi)]">
          Your lapsed clients aren&apos;t gone. They just need a text.
        </h3>
        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#888880]">
          ChairFill identifies every quiet client and reaches out automatically
          — through iMessage, in your voice.
        </p>
        <Link
          href="/waitlist"
          className="cta-primary inline-flex items-center gap-2"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
