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
