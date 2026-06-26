import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const STORE_PATH = path.join(process.cwd(), ".data", "founding-members.json");

function normalizePhone(phone: string): string {
  return phone.replace(/\D+/g, "");
}

function isValidPhone(phone: string): boolean {
  const digits = normalizePhone(phone);
  return digits.length >= 10 && digits.length <= 15;
}

type Entry = {
  firstName: string;
  shop: string;
  phone: string;
  phoneDigits: string;
  note?: string;
  createdAt: string;
  source: string;
  intakeCompleted: boolean;
};

export async function POST(req: Request) {
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
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }
    if (!shop) {
      return NextResponse.json({ error: "Shop name is required" }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const entry: Entry = {
      firstName,
      shop,
      phone,
      phoneDigits: normalizePhone(phone),
      note: note || undefined,
      createdAt: new Date().toISOString(),
      source: body.source ?? "founding-member-page",
      intakeCompleted: false,
    };

    try {
      await mkdir(path.dirname(STORE_PATH), { recursive: true });
      let list: Entry[] = [];
      try {
        const raw = await readFile(STORE_PATH, "utf-8");
        list = JSON.parse(raw);
      } catch {
        // file missing or invalid — start fresh
      }
      const exists = list.some((e) => e.phoneDigits === entry.phoneDigits);
      if (!exists) {
        list.push(entry);
        await writeFile(STORE_PATH, JSON.stringify(list, null, 2), "utf-8");
      }
    } catch (fsErr) {
      console.error("Local founding-member write error:", fsErr);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Locked in. Check your texts in 60 seconds.",
        firstName: entry.firstName,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("founding-member API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
