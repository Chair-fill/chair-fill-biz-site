import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Barber Business Tips & Client Reactivation Strategies | ChairFill Blog",
  description:
    "Real strategies for independent barbers: fill no-shows, reactivate lapsed clients, and stop losing money to empty chairs. No fluff.",
  alternates: { canonical: "https://chairfill.co/blog" },
  openGraph: {
    title: "ChairFill Blog — Barber Business Strategies",
    description:
      "Real tactics for independent barbers. Fill chairs, recover clients, grow revenue.",
    type: "website",
    url: "https://chairfill.co/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ChairFill Blog",
    description:
      "Barber business strategies, client reactivation tactics, and tips for filling empty chairs.",
    url: "https://chairfill.co/blog",
    publisher: {
      "@type": "Organization",
      name: "ChairFill",
      url: "https://chairfill.co",
      logo: {
        "@type": "ImageObject",
        url: "https://chairfill.co/logo-new.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-[#f0ece3]">
        <Navbar />
        <BlogIndexClient posts={posts} />
        <Footer />
      </div>
    </>
  );
}
