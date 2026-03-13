import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const WAITLIST_STORE = "chairfill-waitlist";

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

  if (req.method !== "PATCH") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { email, isAccepted, isPaid } = body as { email: string; isAccepted?: boolean; isPaid?: boolean };

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400, headers: corsHeaders });
    }

    const store = getStore({ name: WAITLIST_STORE, consistency: "strong" });
    const key = email.replace(/[^a-z0-9@._-]/gi, "_");
    
    const entry = await store.get(key, { type: "json" }) as any;
    
    if (!entry) {
      return new Response(JSON.stringify({ error: "Entry not found" }), { status: 404, headers: corsHeaders });
    }

    if (isAccepted !== undefined) entry.isAccepted = isAccepted;
    if (isPaid !== undefined) entry.isPaid = isPaid;

    await store.setJSON(key, entry);

    return new Response(JSON.stringify({ message: "Updated successfully", entry }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("update-waitlist-status error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
