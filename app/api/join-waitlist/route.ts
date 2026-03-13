import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), ".data", "waitlist.json");

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { email?: string; name?: string; source?: string };
    const email = normalizeEmail(body.email ?? "");
    const name = (body.name ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const entry = {
      email,
      name,
      createdAt: new Date().toISOString(),
      source: body.source ?? "marketing-site",
      isAccepted: false,
      isPaid: false,
    };

    try {
      await mkdir(path.dirname(WAITLIST_PATH), { recursive: true });
      let list: { email: string; name: string; createdAt: string; source: string }[] = [];
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
      console.error("Local waitlist write error:", fsErr);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're on the list!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("join-waitlist API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
