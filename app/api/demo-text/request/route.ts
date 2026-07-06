import { NextResponse } from "next/server";

/**
 * Proxy for the "text yourself a demo" step 1. Forwards to the ChairFill
 * backend, which owns the OTP + anti-abuse logic (Turnstile, rate limits,
 * iMessage validation, code send).
 *
 * We pass the REAL client IP through as x-forwarded-for. Without it the backend
 * would see Netlify's shared egress IP for every visitor, collapsing the
 * per-IP rate limit into a single global bucket.
 */
const API = process.env.CHAIRFILL_API_URL || "https://api.chairfill.co";

function clientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-nf-client-connection-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  try {
    const res = await fetch(`${API}/api/v1/demo/request-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": clientIp(req),
      },
      body,
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("demo request-code proxy error:", err);
    return NextResponse.json(
      { error: "Could not reach the demo service. Try again shortly." },
      { status: 502 },
    );
  }
}
