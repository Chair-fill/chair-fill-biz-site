import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE = "https://chairfill.co";

/**
 * Sitemap. Marketplace routes (/barber-booth-rental, /shops, /claim,
 * /barbers/looking) are intentionally OMITTED until real shops exist +
 * backend wiring is in place. All marketplace pages also export
 * `metadata: { robots: { index: false } }` so even if a crawler finds
 * them they will not be indexed.
 *
 * When the backend ships, re-enable by adding cityPages + shopPages back.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/waitlist`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/founding-member`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
