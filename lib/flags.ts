/**
 * Lightweight feature flags for the marketing site.
 *
 * Env override (set in Netlify env): NEXT_PUBLIC_<FLAG>=true|false
 * Defaults live here so the site works without any env config.
 */

/**
 * MARKETPLACE_MAP — Airbnb-style interactive map + list on the booth-rental
 * marketplace. Default ON. Set NEXT_PUBLIC_MARKETPLACE_MAP=false to fall back
 * to the plain directory list.
 */
export function marketplaceMapEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MARKETPLACE_MAP !== "false";
}

/**
 * MARKETPLACE — master gate for the whole booth-rental marketplace
 * (/barber-booth-rental/* and /shops/*).
 *
 * The marketplace is staging-only until real shops + backend wiring ship.
 * It renders in development and staging, and is HIDDEN (404) in production,
 * so we can demo it to prospects on staging without exposing it on the live
 * chairfill.co site.
 *
 * Environment is read from NEXT_PUBLIC_APP_ENV (set per Netlify deploy
 * context), falling back to NODE_ENV. Override explicitly with
 * NEXT_PUBLIC_MARKETPLACE=true|false to force on/off in any environment.
 */
export function marketplaceEnabled(): boolean {
  const override = process.env.NEXT_PUBLIC_MARKETPLACE;
  if (override === "true") return true;
  if (override === "false") return false;

  const env =
    process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || "development";
  return env !== "production";
}
