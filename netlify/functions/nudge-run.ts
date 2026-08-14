import type { Context } from "@netlify/functions";
import { runNudge } from "../../lib/nudge-core";

// Admin-authed manual runner for the abandoned-capture drip (for testing +
// on-demand runs). Same WAITLIST_ADMIN_SECRET as the other admin endpoints.
// Reached at /api/admin/nudge-run. Supports ?dryRun=1 (report only, no sends)
// and ?limit=N.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
  "Content-Type": "application/json",
};

function isAuthorized(req: Request): boolean {
  const secret = process.env.WAITLIST_ADMIN_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : req.headers.get("x-api-key");
  return token !== null && token === secret;
}

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }
  const url = new URL(req.url);
  const dryRun = url.searchParams.get("dryRun") === "1" || url.searchParams.get("dryRun") === "true";
  const limit = Number(url.searchParams.get("limit")) || undefined;
  try {
    const result = await runNudge({ dryRun, limit });
    return new Response(JSON.stringify(result), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("nudge-run error:", err);
    return new Response(JSON.stringify({ error: "Run failed" }), { status: 500, headers: corsHeaders });
  }
};
