import type { Config } from "@netlify/functions";
import { runNudge } from "../../lib/nudge-core";

// Scheduled abandoned-capture drip. Runs daily; sends one nudge to cold leads
// and marks them so they're never nudged twice. Scheduled functions can't be
// invoked over public HTTP — use nudge-run.ts (admin-authed) to test.
export default async (): Promise<Response> => {
  const result = await runNudge({ dryRun: false, limit: 50 });
  console.log("nudge-abandoned:", JSON.stringify(result));
  return new Response(JSON.stringify(result), { status: 200 });
};

export const config: Config = {
  schedule: "0 15 * * *", // daily at 15:00 UTC (11:00 AM ET)
};
