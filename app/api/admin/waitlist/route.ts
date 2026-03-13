import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), ".data", "waitlist.json");

type WaitlistEntry = { 
  email: string; 
  name: string; 
  createdAt: string; 
  source: string;
  isAccepted?: boolean;
  isPaid?: boolean;
};

function getAuthToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return req.headers.get("x-api-key");
}

function isAuthorized(req: Request): boolean {
  const secret = process.env.WAITLIST_ADMIN_SECRET;
  if (!secret) return false;
  const token = getAuthToken(req);
  return token !== null && token === secret;
}

function parseDateFilters(url: URL): { from: Date; to: Date } | null {
  const daysParam = url.searchParams.get("days");
  const fromParam = url.searchParams.get("from");
  const toParam = url.searchParams.get("to");

  const now = new Date();
  let from: Date;
  let to: Date;

  if (daysParam !== null) {
    const days = parseInt(daysParam, 10);
    if (Number.isNaN(days) || days < 1) return null;
    to = new Date(now);
    from = new Date(now);
    from.setDate(from.getDate() - days);
    return { from, to };
  }

  if (fromParam && toParam) {
    from = new Date(fromParam);
    to = new Date(toParam);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
    return { from, to };
  }

  if (fromParam) {
    from = new Date(fromParam);
    if (Number.isNaN(from.getTime())) return null;
    to = new Date(now);
    return { from, to };
  }

  if (toParam) {
    to = new Date(toParam);
    if (Number.isNaN(to.getTime())) return null;
    from = new Date(0); // epoch = no lower bound
    return { from, to };
  }

  return null; // no filters = return all
}

function filterByDate(entries: WaitlistEntry[], range: { from: Date; to: Date } | null): WaitlistEntry[] {
  if (!range) return entries;
  return entries.filter((e) => {
    const t = new Date(e.createdAt).getTime();
    return t >= range.from.getTime() && t <= range.to.getTime();
  });
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const range = parseDateFilters(url);
    const hasFilterParams = url.searchParams.has("days") || url.searchParams.has("from") || url.searchParams.has("to");
    if (hasFilterParams && range === null) {
      return NextResponse.json(
        { error: "Invalid date filters. Use query: days=<number> or from=<ISO date>&to=<ISO date>" },
        { status: 400 }
      );
    }

    let list: WaitlistEntry[] = [];
    try {
      const raw = await readFile(WAITLIST_PATH, "utf-8");
      list = JSON.parse(raw);
    } catch {
      // file missing or invalid → empty list
    }

    const filtered = filterByDate(list, range);
    return NextResponse.json({
      total: filtered.length,
      entries: filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    });
  } catch (err) {
    console.error("admin waitlist GET error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, isAccepted, isPaid } = body as { email: string; isAccepted?: boolean; isPaid?: boolean };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let list: WaitlistEntry[] = [];
    try {
      const raw = await readFile(WAITLIST_PATH, "utf-8");
      list = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "No waitlist found" }, { status: 404 });
    }

    const index = list.findIndex((e) => e.email.toLowerCase() === email.toLowerCase());
    if (index === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    if (isAccepted !== undefined) list[index].isAccepted = isAccepted;
    if (isPaid !== undefined) list[index].isPaid = isPaid;

    await writeFile(WAITLIST_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json({ message: "Updated successfully", entry: list[index] });
  } catch (err) {
    console.error("admin waitlist PATCH error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
