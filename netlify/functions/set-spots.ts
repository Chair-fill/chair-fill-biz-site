import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Manual control for the founding-spots counter. Reached at /api/admin/spots.
// Auth: same WAITLIST_ADMIN_SECRET Bearer / x-api-key as the waitlist admin.
//
//   Set taken:      POST /api/admin/spots            { "taken": 1 }
//   Set taken+total:POST /api/admin/spots            { "taken": 1, "total": 5 }
//   Read current:   GET  /api/admin/spots
//   Clear override: DELETE /api/admin/spots          (reverts to backend auto-count)
const SPOTS_STORE = "chairfill-spots";
const OVERRIDE_KEY = "override";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
  "Content-Type": "application/json",
};

function getAuthToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return req.headers.get("x-api-key");
}

function isAuthorized(req: Request): boolean {
  const secret = process.env.WAITLIST_ADMIN_SECRET;
  if (!secret) return false;
  const token = getAuthToken(req);
  return token !== null && token === secret;
}

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }

  const store = getStore({ name: SPOTS_STORE, consistency: "strong" });

  try {
    if (req.method === "GET") {
      const current = await store.get(OVERRIDE_KEY, { type: "json" });
      return new Response(JSON.stringify({ override: current ?? null }), { status: 200, headers: corsHeaders });
    }

    if (req.method === "DELETE") {
      await store.delete(OVERRIDE_KEY);
      return new Response(JSON.stringify({ message: "Override cleared — counter reverts to auto." }), { status: 200, headers: corsHeaders });
    }

    if (req.method === "POST" || req.method === "PUT") {
      const body = (await req.json().catch(() => ({}))) as { taken?: unknown; total?: unknown };
      const taken = Number(body.taken);
      if (!Number.isFinite(taken) || taken < 0) {
        return new Response(JSON.stringify({ error: "Provide a non-negative number 'taken'." }), { status: 400, headers: corsHeaders });
      }
      const entry: { taken: number; total?: number } = { taken: Math.round(taken) };
      const total = Number(body.total);
      if (Number.isFinite(total) && total > 0) entry.total = Math.round(total);

      await store.setJSON(OVERRIDE_KEY, entry);
      return new Response(JSON.stringify({ message: "Override set.", override: entry }), { status: 200, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  } catch (err) {
    console.error("set-spots error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500, headers: corsHeaders });
  }
};
