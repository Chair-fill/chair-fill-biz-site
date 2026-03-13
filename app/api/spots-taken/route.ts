import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), ".data", "waitlist.json");

export async function GET() {
  try {
    let list: any[] = [];
    try {
      const raw = await readFile(WAITLIST_PATH, "utf-8");
      list = JSON.parse(raw);
    } catch {
      // file missing or invalid
    }

    const acceptedAndPaid = list.filter((e) => e.isAccepted === true && e.isPaid === true).length;

    return NextResponse.json({ 
      spotsTaken: acceptedAndPaid,
      totalSpots: 10
    });
  } catch (err) {
    console.error("spots-taken GET error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
