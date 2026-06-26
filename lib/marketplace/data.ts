/**
 * Marketplace data layer.
 * SHOPS are ingested from OpenStreetMap (see scripts/ingest) into
 * shops.generated.json. Swap these functions for the backend API when ready.
 * All data-access goes through these functions — nothing else imports raw CITIES/SHOPS.
 */

import generatedShops from "./shops.generated.json";

export interface BoothPlan {
  name: string;
  price: number | null; // null = hidePricing
  period: "week" | "month";
  description: string;
}

export interface Shop {
  slug: string;
  city: string;           // matches CITIES key
  state: string;
  name: string;
  address: string;
  phone: string | null;
  claimed: boolean;
  description: string;
  amenities: string[];
  gallery: string[];      // placeholder image URLs
  boothPlans: BoothPlan[];
  hidePricing: boolean;
  lat: number;
  lng: number;
  website?: string | null;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  headline: string;
}

// ── Seed data ──────────────────────────────────────────────────────────────

export const CITIES: City[] = [
  { slug: "tampa-fl",        name: "Tampa",         state: "FL", headline: "Find barber booth rentals in Tampa, FL" },
  { slug: "miami-fl",        name: "Miami",         state: "FL", headline: "Find barber booth rentals in Miami, FL" },
  { slug: "orlando-fl",      name: "Orlando",       state: "FL", headline: "Find barber booth rentals in Orlando, FL" },
  { slug: "atlanta-ga",      name: "Atlanta",       state: "GA", headline: "Find barber booth rentals in Atlanta, GA" },
];

export const SHOPS: Shop[] = generatedShops as unknown as Shop[];

// ── Data access functions ──────────────────────────────────────────────────
// Swap these for API calls (e.g. api.get('/marketplace/cities/:slug')) when ready.

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getShop(citySlug: string, shopSlug: string): Shop | undefined {
  return SHOPS.find((s) => s.city === citySlug && s.slug === shopSlug);
}

export function getShopsByCity(citySlug: string): Shop[] {
  return SHOPS.filter((s) => s.city === citySlug);
}

/** All shops across every city (for the location + radius search). */
export function getAllShops(): Shop[] {
  return SHOPS;
}

/**
 * Approx centroid per known city (lat/lng of its first shop), used for
 * offline city-name geocoding in the location search.
 */
export function getCityCentroids(): {
  name: string;
  state: string;
  lat: number;
  lng: number;
}[] {
  return CITIES.map((c) => {
    const shop = SHOPS.find((s) => s.city === c.slug);
    return shop
      ? { name: c.name, state: c.state, lat: shop.lat, lng: shop.lng }
      : null;
  }).filter((x): x is { name: string; state: string; lat: number; lng: number } => x !== null);
}

export function countLookingBarbersForCity(_citySlug: string): number | null {
  // TODO: replace with GET /marketplace/barbers/looking?city=citySlug count
  // Returns null until the backend exists. Callers should fall back to an
  // empty state ("No barbers signed up yet — be the first") rather than show
  // a fabricated number to users.
  return null;
}
