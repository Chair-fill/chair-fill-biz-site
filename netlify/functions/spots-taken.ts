import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const WAITLIST_STORE = "chairfill-waitlist";

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
    const store = getStore({ name: WAITLIST_STORE, consistency: "strong" });
    const { blobs } = await store.list();
    let count = 0;

    for (const { key } of blobs) {
      const entry = await store.get(key, { type: "json" }) as any;
      if (entry && entry.isAccepted === true && entry.isPaid === true) {
        count++;
      }
    }

    return new Response(JSON.stringify({ 
      spotsTaken: count,
      totalSpots: 10
    }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("spots-taken error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
