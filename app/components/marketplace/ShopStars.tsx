"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  getShopReviewSummary,
  ShopReviewSummary,
} from "@/lib/marketplace/reviews";

/**
 * Live star rating for a claimed shop, fetched client-side from the
 * ChairFill reviews API. Renders nothing while loading, when the shop has
 * no linked barber, or when no reviews exist yet — so unclaimed OSM shops
 * never show a rating.
 */
export default function ShopStars({
  barberId,
  size = 12,
}: {
  barberId?: string | null;
  size?: number;
}) {
  const [summary, setSummary] = useState<ShopReviewSummary | null>(null);

  useEffect(() => {
    if (!barberId) return;
    let cancelled = false;
    getShopReviewSummary(barberId).then((data) => {
      if (!cancelled) setSummary(data);
    });
    return () => {
      cancelled = true;
    };
  }, [barberId]);

  if (!barberId || !summary) return null;

  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`Rated ${summary.average} out of 5 from ${summary.count} reviews`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          style={{ width: size, height: size }}
          className={
            n <= Math.round(summary.average)
              ? "fill-[#D4AF37] text-[#D4AF37]"
              : "text-foreground/20"
          }
        />
      ))}
      <span className="text-[11px] font-semibold text-foreground/70">
        {summary.average.toFixed(1)}
      </span>
      <span className="text-[11px] text-foreground/40">({summary.count})</span>
    </span>
  );
}
