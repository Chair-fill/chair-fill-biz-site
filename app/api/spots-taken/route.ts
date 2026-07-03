import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), ".data", "waitlist.json");

/**
 * Founding barbers signed OUTSIDE the site waitlist (manually onboarded).
 * The waitlist file only counts accepted+paid signups from the form, and on
 * Netlify it resets per deploy, so this floor keeps the tracker honest.
 */
const BASE_SPOTS_TAKEN = 1;
const TOTAL_SPOTS = 5;

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
      spotsTaken: Math.min(BASE_SPOTS_TAKEN + acceptedAndPaid, TOTAL_SPOTS),
      totalSpots: TOTAL_SPOTS
    });
  } catch (err) {
    console.error("spots-taken GET error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
