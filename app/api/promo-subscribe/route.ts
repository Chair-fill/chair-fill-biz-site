import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

// Email-only lead capture for the marketing promo popup ("Get 30 Days Free").
// Kept separate from the named-waitlist flow so the popup can capture an email
// without requiring a full name.
const PROMO_LEADS_PATH = path.join(process.cwd(), ".data", "promo-leads.json");

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      source?: string;
    };
    const email = normalizeEmail(body.email ?? "");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const entry = {
      email,
      createdAt: new Date().toISOString(),
      source: body.source ?? "promo-popup",
    };

    try {
      await mkdir(path.dirname(PROMO_LEADS_PATH), { recursive: true });
      let list: { email: string; createdAt: string; source: string }[] = [];
      try {
        const raw = await readFile(PROMO_LEADS_PATH, "utf-8");
        list = JSON.parse(raw);
      } catch {
        // file missing or invalid
      }
      const exists = list.some((e) => e.email.toLowerCase() === email);
      if (!exists) {
        list.push(entry);
        await writeFile(PROMO_LEADS_PATH, JSON.stringify(list, null, 2), "utf-8");
      }
    } catch (fsErr) {
      console.error("Promo lead write error:", fsErr);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're in! Check your inbox." },
      { status: 201 }
    );
  } catch (err) {
    console.error("promo-subscribe API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
