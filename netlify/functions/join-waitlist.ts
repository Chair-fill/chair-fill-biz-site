import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const WAITLIST_STORE = "chairfill-waitlist";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json().catch(() => ({})) as { email?: string; name?: string; source?: string };
    const email = normalizeEmail(body.email ?? "");
    const name = (body.name ?? "").trim();

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Full name is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const store = getStore({ name: WAITLIST_STORE, consistency: "strong" });
    const key = email.replace(/[^a-z0-9@._-]/gi, "_");
    const entry = {
      email,
      name,
      createdAt: new Date().toISOString(),
      source: body.source ?? "marketing-site",
    };

    const { modified } = await store.setJSON(key, entry, { onlyIfNew: true });

    if (!modified) {
      return new Response(
        JSON.stringify({ message: "Already on the waitlist" }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ message: "You're on the list!" }),
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("join-waitlist error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
