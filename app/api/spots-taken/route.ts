import { NextResponse } from "next/server";

// Proxy to the backend's public founding-spots counter, which counts genuinely
// active barbers (subscription_status in {subscribed, trialing}, not expired) —
// payment amount is irrelevant, so 100%-comped founding barbers count. This
// replaces the old waitlist-file count + hardcoded floor. In production
// netlify.toml redirects /api/spots-taken to the Netlify function; this Next
// route is the local-dev fallback.
const API_BASE = process.env.CHAIRFILL_API_URL || "https://api.chairfill.co";
const TOTAL_SPOTS = 5;

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/founding/spots`, { cache: "no-store" });
    const json = (await res.json().catch(() => ({}))) as { data?: { taken?: number; total?: number } };
    const d = json?.data ?? {};
    const totalSpots = typeof d.total === "number" ? d.total : TOTAL_SPOTS;
    const spotsTaken = typeof d.taken === "number" ? d.taken : 0;
    return NextResponse.json({ spotsTaken, totalSpots });
  } catch (err) {
    console.error("spots-taken proxy error:", err);
    // Never break the UI — fall back to a full board.
    return NextResponse.json({ spotsTaken: 0, totalSpots: TOTAL_SPOTS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
