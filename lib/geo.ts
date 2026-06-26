/** Geo helpers for the marketplace location + radius search. */

export interface LatLng {
  lat: number;
  lng: number;
}

/** Great-circle distance in miles between two points (Haversine). */
export function milesBetween(a: LatLng, b: LatLng): number {
  const R = 3958.8; // Earth radius, miles
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Resolve a free-text location (US ZIP or city name) to coordinates.
 * - 5-digit ZIP -> api.zippopotam.us (free, no API key)
 * - otherwise -> matched against the provided known cities (offline)
 * Returns null if it can't resolve.
 */
export async function geocodeLocation(
  query: string,
  knownCities: { name: string; state: string; lat: number; lng: number }[],
): Promise<{ lat: number; lng: number; label: string } | null> {
  const q = query.trim();
  if (!q) return null;

  // ZIP code path
  if (/^\d{5}$/.test(q)) {
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${q}`);
      if (res.ok) {
        const data = await res.json();
        const place = data.places?.[0];
        if (place) {
          return {
            lat: parseFloat(place.latitude),
            lng: parseFloat(place.longitude),
            label: `${place["place name"]}, ${place["state abbreviation"]} ${q}`,
          };
        }
      }
    } catch {
      // fall through to city match
    }
  }

  // City-name path (offline, against known cities)
  const lower = q.toLowerCase();
  const match =
    knownCities.find((c) => `${c.name}, ${c.state}`.toLowerCase() === lower) ||
    knownCities.find((c) => c.name.toLowerCase() === lower) ||
    knownCities.find((c) => c.name.toLowerCase().includes(lower));
  if (match) {
    return { lat: match.lat, lng: match.lng, label: `${match.name}, ${match.state}` };
  }
  return null;
}
