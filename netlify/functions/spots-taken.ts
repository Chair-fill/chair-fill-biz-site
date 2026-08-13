import type { Context } from "@netlify/functions";

// Production proxy to the backend's public founding-spots counter, which counts
// genuinely active barbers (subscription_status in {subscribed, trialing}, not
// expired) — payment amount is irrelevant, so 100%-comped founding barbers
// count. Replaces the old Netlify-Blobs waitlist count.
const API_BASE = process.env.CHAIRFILL_API_URL || "https://api.chairfill.co";
const TOTAL_SPOTS = 5;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  try {
    const res = await fetch(`${API_BASE}/api/v1/founding/spots`);
    const json = (await res.json().catch(() => ({}))) as { data?: { taken?: number; total?: number } };
    const d = json?.data ?? {};
    const totalSpots = typeof d.total === "number" ? d.total : TOTAL_SPOTS;
    const spotsTaken = typeof d.taken === "number" ? d.taken : 0;
    return new Response(JSON.stringify({ spotsTaken, totalSpots }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("spots-taken proxy error:", err);
    // Never break the UI — fall back to a full board.
    return new Response(JSON.stringify({ spotsTaken: 0, totalSpots: TOTAL_SPOTS }), { status: 200, headers: corsHeaders });
  }
};
