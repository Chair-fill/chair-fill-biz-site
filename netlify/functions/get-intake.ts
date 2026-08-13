import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Admin reader for the durable intake store. Same auth + date-filter contract as
// get-waitlist.ts. Reached at /api/admin/intake.
const INTAKE_STORE = "chairfill-intake";

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

function parseDateFilters(url: URL): { from: Date; to: Date } | null {
  const daysParam = url.searchParams.get("days");
  const fromParam = url.searchParams.get("from");
  const toParam = url.searchParams.get("to");
  const now = new Date();

  if (daysParam !== null) {
    const days = parseInt(daysParam, 10);
    if (Number.isNaN(days) || days < 1) return null;
    const from = new Date(now);
    from.setDate(from.getDate() - days);
    return { from, to: new Date(now) };
  }
  if (fromParam && toParam) {
    const from = new Date(fromParam);
    const to = new Date(toParam);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
    return { from, to };
  }
  if (fromParam) {
    const from = new Date(fromParam);
    if (Number.isNaN(from.getTime())) return null;
    return { from, to: new Date(now) };
  }
  if (toParam) {
    const to = new Date(toParam);
    if (Number.isNaN(to.getTime())) return null;
    return { from: new Date(0), to };
  }
  return null;
}

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }
  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const range = parseDateFilters(url);
    const hasFilterParams = url.searchParams.has("days") || url.searchParams.has("from") || url.searchParams.has("to");
    if (hasFilterParams && range === null) {
      return new Response(
        JSON.stringify({ error: "Invalid date filters. Use query: days=<number> or from=<ISO date>&to=<ISO date>" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const store = getStore({ name: INTAKE_STORE, consistency: "strong" });
    const { blobs } = await store.list();
    const entries: Array<Record<string, unknown> & { createdAt: string }> = [];

    for (const { key } of blobs) {
      const value = await store.get(key, { type: "json" });
      if (value && typeof value === "object" && value !== null && "createdAt" in value) {
        entries.push(value as Record<string, unknown> & { createdAt: string });
      }
    }

    const filtered = range
      ? entries.filter((e) => {
          const t = new Date(e.createdAt).getTime();
          return t >= range.from.getTime() && t <= range.to.getTime();
        })
      : entries;
    const sorted = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return new Response(JSON.stringify({ total: sorted.length, entries: sorted }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("get-intake error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500, headers: corsHeaders });
  }
};
