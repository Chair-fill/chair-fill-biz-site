import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Durable production store for onboarding intake submissions. Mirrors
// join-waitlist.ts (Netlify Blobs). The Next.js route app/api/intake/route.ts is
// the local-dev fallback; in production netlify.toml redirects /api/intake here so
// submissions survive deploys (the .data/*.json path is ephemeral on Netlify).
const INTAKE_STORE = "chairfill-intake";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const REQUIRED = [
  "fullName",
  "preferredName",
  "email",
  "cell",
  "city",
  "businessName",
  "yearsCutting",
  "shopAddress",
  "bookingPlatform",
  "totalClients",
  "dormantCount",
  "listLocation",
  "daysWorking",
  "hours",
  "hardestSlots",
  "voiceGreet",
  "voiceOffer",
  "successVision",
  "signature",
  "sigDate",
] as const;

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
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    for (const key of REQUIRED) {
      const value = (body[key] ?? "") as string;
      if (!value || !value.toString().trim()) {
        return new Response(JSON.stringify({ error: `Missing required field: ${key}` }), { status: 400, headers: corsHeaders });
      }
    }

    if (body.confirmAccurate !== true || body.confirmLaunch !== true) {
      return new Response(JSON.stringify({ error: "Please confirm both checkboxes" }), { status: 400, headers: corsHeaders });
    }

    const email = (body.email as string).trim().toLowerCase();
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400, headers: corsHeaders });
    }

    const str = (k: string) => (body[k] as string)?.trim() || undefined;
    const req_ = (k: string) => (body[k] as string).trim();

    const entry = {
      fullName: req_("fullName"),
      preferredName: req_("preferredName"),
      email,
      cell: req_("cell"),
      instagram: str("instagram"),
      city: req_("city"),
      businessName: req_("businessName"),
      yearsCutting: req_("yearsCutting"),
      shopAddress: req_("shopAddress"),
      bookingLink: str("bookingLink"),
      bookingPlatform: req_("bookingPlatform"),
      bookingPlatformOther: str("bookingPlatformOther"),
      totalClients: req_("totalClients"),
      dormantCount: req_("dormantCount"),
      listLocation: req_("listLocation"),
      daysWorking: req_("daysWorking"),
      hours: req_("hours"),
      hardestSlots: req_("hardestSlots"),
      voiceGreet: req_("voiceGreet"),
      voiceOffer: req_("voiceOffer"),
      voicePhrases: str("voicePhrases"),
      successVision: req_("successVision"),
      signature: req_("signature"),
      sigDate: req_("sigDate"),
      source: (body.source as string) || "intake-page",
      createdAt: new Date().toISOString(),
    };

    const store = getStore({ name: INTAKE_STORE, consistency: "strong" });
    // Key by email: a re-submitted intake updates the latest rather than duplicating.
    const key = email.replace(/[^a-z0-9@._-]/gi, "_");
    await store.setJSON(key, entry);

    return new Response(
      JSON.stringify({ message: "Setup received. Texting you within the hour." }),
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("intake error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
