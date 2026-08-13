import { NextResponse } from "next/server";

// Proxy to the backend book-a-call booking endpoint.
const API_BASE = process.env.CHAIRFILL_API_URL || "https://api.chairfill.co";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  try {
    const res = await fetch(`${API_BASE}/api/v1/sales-call/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as {
      data?: unknown;
      message?: string;
      error?: string;
    };
    if (!res.ok) {
      return NextResponse.json(
        { error: json?.message || json?.error || "Booking failed" },
        { status: res.status },
      );
    }
    return NextResponse.json(json?.data ?? { ok: true });
  } catch (err) {
    console.error("book create proxy error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
