import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Founding-spots counter for the marketing site.
//
// Priority:
//   1. MANUAL OVERRIDE — a value you set via /api/admin/spots (stored in Blobs).
//      This always wins, so you control the number directly. Set it to match
//      reality (e.g. 1 taken for Kentravien), change it anytime, no deploy.
//   2. Backend auto-count — active barbers from api.chairfill.co (fallback when
//      no override is set).
//   3. Full board (0 taken) — if everything else fails, never break the UI.
const SPOTS_STORE = "chairfill-spots";
const OVERRIDE_KEY = "override";
const API_BASE = process.env.CHAIRFILL_API_URL || "https://api.chairfill.co";
const TOTAL_SPOTS = 5;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function clamp(n: number, total: number): number {
  return Math.max(0, Math.min(total, Math.round(n)));
}

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  // 1a. Env-var override — the simple manual knob. Set FOUNDING_SPOTS_TAKEN
  // (and optionally FOUNDING_SPOTS_TOTAL) in Netlify → Environment variables to
  // control the number directly; redeploy to apply. This wins over everything.
  const envTakenRaw = process.env.FOUNDING_SPOTS_TAKEN;
  if (envTakenRaw !== undefined && envTakenRaw !== "") {
    const envTaken = Number(envTakenRaw);
    if (Number.isFinite(envTaken)) {
      const envTotal = Number(process.env.FOUNDING_SPOTS_TOTAL);
      const totalSpots = Number.isFinite(envTotal) && envTotal > 0 ? envTotal : TOTAL_SPOTS;
      return new Response(
        JSON.stringify({ spotsTaken: clamp(envTaken, totalSpots), totalSpots, source: "env" }),
        { status: 200, headers: corsHeaders }
      );
    }
  }

  // 1b. Blobs override (if set via /api/admin/spots)
  try {
    const store = getStore({ name: SPOTS_STORE, consistency: "strong" });
    const override = (await store.get(OVERRIDE_KEY, { type: "json" })) as
      | { taken?: number; total?: number }
      | null;
    if (override && typeof override.taken === "number") {
      const totalSpots = typeof override.total === "number" ? override.total : TOTAL_SPOTS;
      return new Response(
        JSON.stringify({ spotsTaken: clamp(override.taken, totalSpots), totalSpots, source: "manual" }),
        { status: 200, headers: corsHeaders }
      );
    }
  } catch (err) {
    console.error("spots-taken override read error:", err);
  }

  // 2. Backend auto-count
  try {
    const res = await fetch(`${API_BASE}/api/v1/founding/spots`);
    const json = (await res.json().catch(() => ({}))) as { data?: { taken?: number; total?: number } };
    const d = json?.data ?? {};
    const totalSpots = typeof d.total === "number" ? d.total : TOTAL_SPOTS;
    const spotsTaken = typeof d.taken === "number" ? d.taken : 0;
    return new Response(JSON.stringify({ spotsTaken, totalSpots, source: "auto" }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("spots-taken proxy error:", err);
    // 3. Full board
    return new Response(JSON.stringify({ spotsTaken: 0, totalSpots: TOTAL_SPOTS, source: "fallback" }), { status: 200, headers: corsHeaders });
  }
};
