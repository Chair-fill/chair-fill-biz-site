import { NextResponse } from "next/server";

/**
 * Proxy for the "text yourself a demo" step 2. Forwards the requestId + code to
 * the backend, which verifies and (on success) registers the lead and fires
 * McArthur's live opener. Real client IP forwarded for parity with step 1.
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
    const res = await fetch(`${API}/api/v1/demo/verify`, {
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
    console.error("demo verify proxy error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach the demo service. Try again shortly." },
      { status: 502 },
    );
  }
}
