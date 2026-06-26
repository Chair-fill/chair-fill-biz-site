import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const STORE_PATH = path.join(process.cwd(), ".data", "intake.json");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type IntakeEntry = {
  fullName: string;
  preferredName: string;
  email: string;
  cell: string;
  instagram?: string;
  city: string;
  businessName: string;
  yearsCutting: string;
  shopAddress: string;
  bookingLink?: string;
  bookingPlatform: string;
  bookingPlatformOther?: string;
  totalClients: string;
  dormantCount: string;
  listLocation: string;
  daysWorking: string;
  hours: string;
  hardestSlots: string;
  voiceGreet: string;
  voiceOffer: string;
  voicePhrases?: string;
  successVision: string;
  signature: string;
  sigDate: string;
  source: string;
  createdAt: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const required = [
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

    for (const key of required) {
      const value = (body[key] ?? "") as string;
      if (!value || !value.toString().trim()) {
        return NextResponse.json({ error: `Missing required field: ${key}` }, { status: 400 });
      }
    }

    if (body.confirmAccurate !== true || body.confirmLaunch !== true) {
      return NextResponse.json({ error: "Please confirm both checkboxes" }, { status: 400 });
    }

    const email = (body.email as string).trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const entry: IntakeEntry = {
      fullName: (body.fullName as string).trim(),
      preferredName: (body.preferredName as string).trim(),
      email,
      cell: (body.cell as string).trim(),
      instagram: (body.instagram as string)?.trim() || undefined,
      city: (body.city as string).trim(),
      businessName: (body.businessName as string).trim(),
      yearsCutting: (body.yearsCutting as string).trim(),
      shopAddress: (body.shopAddress as string).trim(),
      bookingLink: (body.bookingLink as string)?.trim() || undefined,
      bookingPlatform: (body.bookingPlatform as string).trim(),
      bookingPlatformOther: (body.bookingPlatformOther as string)?.trim() || undefined,
      totalClients: (body.totalClients as string).trim(),
      dormantCount: (body.dormantCount as string).trim(),
      listLocation: (body.listLocation as string).trim(),
      daysWorking: (body.daysWorking as string).trim(),
      hours: (body.hours as string).trim(),
      hardestSlots: (body.hardestSlots as string).trim(),
      voiceGreet: (body.voiceGreet as string).trim(),
      voiceOffer: (body.voiceOffer as string).trim(),
      voicePhrases: (body.voicePhrases as string)?.trim() || undefined,
      successVision: (body.successVision as string).trim(),
      signature: (body.signature as string).trim(),
      sigDate: (body.sigDate as string).trim(),
      source: (body.source as string) || "intake-page",
      createdAt: new Date().toISOString(),
    };

    try {
      await mkdir(path.dirname(STORE_PATH), { recursive: true });
      let list: IntakeEntry[] = [];
      try {
        const raw = await readFile(STORE_PATH, "utf-8");
        list = JSON.parse(raw);
      } catch {
        // file missing or invalid — start fresh
      }
      list.push(entry);
      await writeFile(STORE_PATH, JSON.stringify(list, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("Local intake write error:", fsErr);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Setup received. Texting you within the hour." },
      { status: 201 }
    );
  } catch (err) {
    console.error("intake API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
