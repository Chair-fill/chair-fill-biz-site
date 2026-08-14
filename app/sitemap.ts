import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CITIES, SHOPS } from "@/lib/marketplace/data";

const SITE = "https://chairfill.co";

/**
 * Sitemap. The marketplace is live (/find-a-shop + /barber-booth-rental/* +
 * /shops/*), so those routes are indexable and included below. Utility routes
 * like /intake stay out — they keep their own noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/find-a-shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/barber-booth-rental`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/waitlist`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/founding-member`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/tools/reactivation-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // City landing pages: /barber-booth-rental/{city}
  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE}/barber-booth-rental/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Shop detail pages: /shops/{city}/{shop}
  const shopRoutes: MetadataRoute.Sitemap = SHOPS.map((s) => ({
    url: `${SITE}/shops/${s.city}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes, ...shopRoutes, ...postRoutes];
}
