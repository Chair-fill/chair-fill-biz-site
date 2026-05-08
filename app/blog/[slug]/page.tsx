import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  const url = `https://chairfill.co/blog/${post.slug}`;
  return {
    title: post.seoTitle ?? `${post.title} | ChairFill`,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== post.slug);
  const related = allPosts
    .filter((p) => p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = related.length === 3 ? related : allPosts.slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "ChairFill" },
    publisher: {
      "@type": "Organization",
      name: "ChairFill",
      logo: {
        "@type": "ImageObject",
        url: "https://chairfill.co/logo-new.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://chairfill.co/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece3]">
        <Navbar />

        <article className="mx-auto max-w-3xl px-6 pb-16 pt-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#888880] transition-colors hover:text-[#C9A84C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All posts
          </Link>

          {/* Header */}
          <header className="mb-10 border-b border-[#1e1e1e] pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
              <span className="rounded-full border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] px-3 py-1 text-[#C9A84C]">
                {post.category}
              </span>
              <span className="text-[#5a5650]">•</span>
              <span className="text-[#888880]">{post.readingTime}</span>
              <span className="text-[#5a5650]">•</span>
              <time className="text-[#888880]" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl [font-family:var(--font-satoshi)]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#888880]">
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div className="prose-blog">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-14 overflow-hidden rounded-2xl border border-[#C9A84C]/25 bg-gradient-to-br from-[#161616] via-[#111111] to-[#0a0a0a] p-8 text-center md:p-12">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
              Ready to fill your chair?
            </div>
            <h3 className="mx-auto mb-4 max-w-md text-xl font-bold text-white md:text-2xl [font-family:var(--font-satoshi)]">
              ChairFill brings your lapsed clients back automatically.
            </h3>
            <Link
              href="/waitlist"
              className="cta-primary inline-flex items-center gap-2"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {/* Related */}
        {fallbackRelated.length > 0 && (
          <section className="mx-auto max-w-[1100px] border-t border-[#1e1e1e] px-6 pb-20 pt-14">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white [font-family:var(--font-satoshi)]">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A84C] hover:underline"
              >
                All posts →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {fallbackRelated.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-xl border border-[#1e1e1e] bg-[#111111] p-6 transition-all hover:border-[#C9A84C]/40 hover:bg-[#161616]"
                >
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C9A84C]">
                    {p.category}
                  </div>
                  <h3 className="mb-3 text-base font-bold leading-tight text-white [font-family:var(--font-satoshi)]">
                    {p.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-[#888880]">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#C9A84C] transition-transform group-hover:translate-x-1">
                    Read
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
