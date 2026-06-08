import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

// Email-only lead capture for the marketing promo popup ("Get 30 Days Free").
// Writes into the SAME store the named-waitlist flow uses (.data/waitlist.json)
// so promo leads show up in the existing /api/admin/waitlist view. The popup
// only collects an email, so the name is derived from the email local-part.
const WAITLIST_PATH = path.join(process.cwd(), ".data", "waitlist.json");

type WaitlistEntry = {
  email: string;
  name: string;
  createdAt: string;
  source: string;
  isAccepted?: boolean;
  isPaid?: boolean;
};

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

    const entry: WaitlistEntry = {
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString(),
      source: body.source ?? "promo-popup",
      isAccepted: false,
      isPaid: false,
    };

    try {
      await mkdir(path.dirname(WAITLIST_PATH), { recursive: true });
      let list: WaitlistEntry[] = [];
      try {
        const raw = await readFile(WAITLIST_PATH, "utf-8");
        list = JSON.parse(raw);
      } catch {
        // file missing or invalid
      }
      const exists = list.some((e) => e.email.toLowerCase() === email);
      if (!exists) {
        list.push(entry);
        await writeFile(WAITLIST_PATH, JSON.stringify(list, null, 2), "utf-8");
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
