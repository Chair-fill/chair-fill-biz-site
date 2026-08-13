import { NextResponse } from "next/server";

// Proxy to the backend book-a-call availability endpoint (demo-text pattern).
const API_BASE = process.env.CHAIRFILL_API_URL || "https://api.chairfill.co";

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date") || "";
  try {
    const res = await fetch(
      `${API_BASE}/api/v1/sales-call/availability?date=${encodeURIComponent(date)}`,
      { cache: "no-store" },
    );
    const json = (await res.json().catch(() => ({}))) as {
      data?: { date?: string; timeZone?: string; slots?: string[] };
    };
    return NextResponse.json(json?.data ?? { date, timeZone: "", slots: [] });
  } catch (err) {
    console.error("book availability proxy error:", err);
    return NextResponse.json({ date, timeZone: "", slots: [] });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
