import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Durable production store for founding-member signups. Mirrors join-waitlist.ts
// (Netlify Blobs). The Next.js route app/api/founding-member/route.ts is the
// local-dev fallback; in production netlify.toml redirects /api/founding-member
// here so signups survive deploys (the .data/*.json path is ephemeral on Netlify).
const FOUNDING_STORE = "chairfill-founding-members";

function normalizePhone(phone: string): string {
  return phone.replace(/\D+/g, "");
}

function isValidPhone(phone: string): boolean {
  const digits = normalizePhone(phone);
  return digits.length >= 10 && digits.length <= 15;
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
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as {
      firstName?: string;
      shop?: string;
      phone?: string;
      note?: string;
      source?: string;
    };

    const firstName = (body.firstName ?? "").trim();
    const shop = (body.shop ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const note = (body.note ?? "").trim();

    if (!firstName) {
      return new Response(JSON.stringify({ error: "First name is required" }), { status: 400, headers: corsHeaders });
    }
    if (!shop) {
      return new Response(JSON.stringify({ error: "Shop name is required" }), { status: 400, headers: corsHeaders });
    }
    if (!phone) {
      return new Response(JSON.stringify({ error: "Phone number is required" }), { status: 400, headers: corsHeaders });
    }
    if (!isValidPhone(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), { status: 400, headers: corsHeaders });
    }

    const phoneDigits = normalizePhone(phone);
    const entry = {
      firstName,
      shop,
      phone,
      phoneDigits,
      note: note || undefined,
      createdAt: new Date().toISOString(),
      source: body.source ?? "founding-member-page",
      intakeCompleted: false,
    };

    const store = getStore({ name: FOUNDING_STORE, consistency: "strong" });
    const key = phoneDigits;
    // onlyIfNew mirrors the original "don't add if this phone already exists" dedupe.
    await store.setJSON(key, entry, { onlyIfNew: true });

    return new Response(
      JSON.stringify({ message: "Locked in. Check your texts in 60 seconds.", firstName: entry.firstName }),
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("founding-member error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
