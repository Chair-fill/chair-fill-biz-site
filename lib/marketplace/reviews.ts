/**
 * Live review data for claimed marketplace shops, read from the public
 * ChairFill reviews API. Only shops with a linked barberId (see Shop in
 * data.ts) have ratings; everything else renders nothing. No fabricated
 * ratings, ever.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_CHAIRFILL_API_URL ?? "https://api.chairfill.co/api/v1";

export interface ShopReviewSummary {
  average: number;
  count: number;
}

/**
 * Fetch a shop's review summary by its linked barber id. Returns null when
 * the shop has no reviews yet or the API is unreachable, so callers can
 * simply skip rendering.
 */
export async function getShopReviewSummary(
  barberId: string,
): Promise<ShopReviewSummary | null> {
  try {
    const res = await fetch(
      `${API_BASE}/reviews/list?technician_id=${encodeURIComponent(barberId)}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const count = typeof data?.count === "number" ? data.count : 0;
    const average = typeof data?.average === "number" ? data.average : 0;
    if (count === 0) return null;
    return { average, count };
  } catch {
    return null;
  }
}
