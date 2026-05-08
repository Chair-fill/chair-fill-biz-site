import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece3]">
      <Navbar />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
          404
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
          That page went quiet.
        </h1>
        <p className="mb-10 max-w-md text-base leading-relaxed text-[#888880]">
          The URL you followed doesn&apos;t exist (or moved). Head back home or
          check out the blog for tactical reads on filling chairs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="cta-primary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/blog"
            className="cta-secondary inline-flex items-center justify-center"
          >
            Browse the blog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
