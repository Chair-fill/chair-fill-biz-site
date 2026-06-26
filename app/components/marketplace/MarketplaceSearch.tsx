"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Crosshair, Loader2, Search, List as ListIcon, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import type { Shop } from "@/lib/marketplace/data";
import { milesBetween, geocodeLocation } from "@/lib/geo";

const MapPanel = dynamic(() => import("./MapPanel"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center bg-card text-foreground/40 text-[13px]">
      Loading map…
    </div>
  ),
});

interface CityCentroid {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

interface MarketplaceSearchProps {
  allShops: Shop[];
  cityCentroids: CityCentroid[];
}

const RADIUS_OPTIONS = [25, 50, 100];

export default function MarketplaceSearch({
  allShops,
  cityCentroids,
}: MarketplaceSearchProps) {
  const [center, setCenter] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [radius, setRadius] = useState(50);
  const [query, setQuery] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState<"distance" | "price-asc" | "price-desc">("distance");
  const [pickedAmenities, setPickedAmenities] = useState<string[]>([]);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  // Show "Search this area" once the user pans the map away from the active center.
  const showSearchArea =
    !!mapCenter && (!center || milesBetween(center, mapCenter) > 3);

  const amenityOptions = useMemo(() => {
    const set = new Set<string>();
    allShops.forEach((s) => s.amenities.forEach((a) => set.add(a)));
    return [...set].sort();
  }, [allShops]);

  const priceOf = (s: Shop): number | null =>
    s.hidePricing ? null : (s.boothPlans[0]?.price ?? null);

  const activeFilterCount =
    pickedAmenities.length + (claimedOnly ? 1 : 0);

  // Pipeline: radius filter (if located) -> amenity/availability filters -> sort.
  const shops = useMemo(() => {
    let rows = allShops.map((s) => ({
      shop: s,
      dist: center ? milesBetween(center, { lat: s.lat, lng: s.lng }) : null,
    }));
    if (center) rows = rows.filter((x) => (x.dist as number) <= radius);
    if (claimedOnly) rows = rows.filter((x) => x.shop.claimed);
    if (pickedAmenities.length > 0) {
      rows = rows.filter((x) =>
        pickedAmenities.every((a) => x.shop.amenities.includes(a)),
      );
    }
    rows.sort((a, b) => {
      if (sort === "distance" && center) return (a.dist as number) - (b.dist as number);
      const pa = priceOf(a.shop);
      const pb = priceOf(b.shop);
      if (sort === "price-asc") return (pa ?? Infinity) - (pb ?? Infinity);
      if (sort === "price-desc") return (pb ?? -Infinity) - (pa ?? -Infinity);
      return 0;
    });
    return rows.map(
      (x) => ({ ...x.shop, _dist: x.dist ?? undefined }) as Shop & { _dist?: number },
    );
  }, [center, radius, allShops, claimedOnly, pickedAmenities, sort]);

  const toggleAmenity = (a: string) =>
    setPickedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );

  const selectedShop = selectedSlug
    ? shops.find((s) => s.slug === selectedSlug)
    : undefined;

  const useMyLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Location isn't available in this browser. Enter a ZIP instead.");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Your location",
        });
        setGeoLoading(false);
      },
      () => {
        setError("Couldn't get your location. Enter a ZIP or city instead.");
        setGeoLoading(false);
      },
      { timeout: 8000 },
    );
  };

  const submitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await geocodeLocation(query, cityCentroids);
    if (result) {
      setCenter(result);
    } else {
      setError("Couldn't find that location. Try a 5-digit ZIP or a city name.");
    }
  };

  return (
    <div>
      {/* Location control bar */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <form onSubmit={submitQuery} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ZIP code or city"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-background border border-border text-[14px] focus:border-primary/50 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-primary text-black font-semibold text-[13px] hover:brightness-110 transition-all"
            >
              Search
            </button>
          </form>

          <button
            type="button"
            onClick={useMyLocation}
            disabled={geoLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-[13px] font-semibold hover:border-primary/40 hover:text-primary transition-all disabled:opacity-50"
          >
            {geoLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Crosshair className="w-4 h-4" />
            )}
            Use my location
          </button>

          {/* Radius */}
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-foreground/50">Within</span>
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="py-2.5 px-2 rounded-lg bg-background border border-border text-[13px] outline-none focus:border-primary/50"
            >
              {RADIUS_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r} mi
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active location / status */}
        <div className="mt-3 flex items-center gap-2 text-[13px]">
          {center ? (
            <>
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground/70">
                {shops.length} shop{shops.length !== 1 ? "s" : ""} within {radius} mi of{" "}
                <span className="font-semibold text-foreground">{center.label}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setCenter(null);
                  setQuery("");
                }}
                className="text-primary hover:underline ml-1"
              >
                Change
              </button>
            </>
          ) : (
            <span className="text-foreground/50">
              Showing {shops.length} shop{shops.length !== 1 ? "s" : ""} nationwide. Set your location to find chairs near you.
            </span>
          )}
        </div>
        {error && <p className="mt-2 text-[13px] text-red-500">{error}</p>}
      </div>

      {/* Filters + sort */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-[13px] font-semibold transition-all ${
            activeFilterCount > 0 || showFilters
              ? "border-primary text-primary"
              : "border-border text-foreground/70 hover:border-primary/40"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-primary text-black text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="py-2 px-2.5 rounded-lg bg-background border border-border text-[13px] outline-none focus:border-primary/50"
        >
          <option value="distance">Sort: Nearest</option>
          <option value="price-asc">Sort: Price (low to high)</option>
          <option value="price-desc">Sort: Price (high to low)</option>
        </select>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={() => {
              setPickedAmenities([]);
              setClaimedOnly(false);
            }}
            className="text-[12px] text-foreground/50 hover:text-foreground ml-1"
          >
            Clear filters
          </button>
        )}
      </div>

      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-4">
          <div>
            <p className="text-[12px] font-semibold text-foreground/60 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((a) => {
                const on = pickedAmenities.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`text-[12px] px-3 py-1.5 rounded-full border transition-all ${
                      on
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground/60 hover:border-primary/40"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="flex items-center gap-2 text-[13px] text-foreground/70 cursor-pointer">
            <input
              type="checkbox"
              checked={claimedOnly}
              onChange={(e) => setClaimedOnly(e.target.checked)}
              className="accent-primary"
            />
            Claimed shops only
          </label>
        </div>
      )}

      {/* Mobile view toggle */}
      <div className="flex lg:hidden gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMobileView("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            mobileView === "list" ? "bg-primary text-black" : "bg-card border border-border text-foreground/70"
          }`}
        >
          <ListIcon className="w-4 h-4" /> List
        </button>
        <button
          type="button"
          onClick={() => setMobileView("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            mobileView === "map" ? "bg-primary text-black" : "bg-card border border-border text-foreground/70"
          }`}
        >
          <MapIcon className="w-4 h-4" /> Map
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* List */}
        <div
          className={`flex-1 space-y-4 lg:max-h-[78vh] lg:overflow-y-auto lg:pr-1 ${
            mobileView === "map" ? "hidden lg:block" : ""
          }`}
        >
          {shops.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-foreground/50 text-[14px]">
                No shops within {radius} mi. Try a wider radius or another location.
              </p>
            </div>
          ) : (
            shops.map((shop) => {
              const dist = (shop as Shop & { _dist?: number })._dist;
              return (
                <Link
                  key={`${shop.city}-${shop.slug}`}
                  href={`/shops/${shop.city}/${shop.slug}`}
                  onMouseEnter={() => setSelectedSlug(shop.slug)}
                  onMouseLeave={() => setSelectedSlug(null)}
                  className={`block bg-card border rounded-xl p-6 transition-all group ${
                    selectedSlug === shop.slug ? "border-primary" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h2 className="font-bold text-[16px] text-foreground group-hover:text-primary transition-colors">
                          {shop.name}
                        </h2>
                        {shop.claimed ? (
                          <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                            ✓ Claimed
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-border text-foreground/40">
                            Unclaimed
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-foreground/50 mb-1">{shop.address}</p>
                      {dist != null && (
                        <p className="text-[12px] text-primary mb-2">{dist.toFixed(1)} mi away</p>
                      )}
                      <p className="text-[13px] text-foreground/70 line-clamp-2">{shop.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      {shop.hidePricing ? (
                        <p className="text-[13px] text-foreground/40">Contact</p>
                      ) : shop.boothPlans[0] ? (
                        <>
                          <p className="font-black text-[20px] text-primary">${shop.boothPlans[0].price}</p>
                          <p className="text-[11px] text-foreground/40">/{shop.boothPlans[0].period}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Map */}
        <div className={`lg:w-[52%] shrink-0 ${mobileView === "list" ? "hidden lg:block" : ""}`}>
          <div className="relative rounded-xl overflow-hidden border border-border h-[70vh] lg:h-[78vh] lg:sticky lg:top-6">
            <MapPanel
              shops={shops}
              selectedSlug={selectedSlug}
              onSelect={setSelectedSlug}
              center={center}
              radiusMiles={radius}
              onMapMove={setMapCenter}
            />
            {showSearchArea && (
              <button
                type="button"
                onClick={() => {
                  if (mapCenter) {
                    setCenter({ ...mapCenter, label: "this area" });
                    setQuery("");
                  }
                }}
                className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-primary text-primary text-[13px] font-semibold shadow-lg hover:bg-primary hover:text-black transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                Search this area
              </button>
            )}

            {/* Mobile: bottom card for the tapped shop */}
            {selectedShop && (
              <Link
                href={`/shops/${selectedShop.city}/${selectedShop.slug}`}
                className="lg:hidden absolute bottom-3 left-3 right-3 z-[1000] bg-background border border-border rounded-xl p-4 shadow-xl flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate">{selectedShop.name}</p>
                  <p className="text-[12px] text-foreground/50 truncate">{selectedShop.address}</p>
                </div>
                <div className="shrink-0 text-right">
                  {selectedShop.hidePricing ? (
                    <p className="text-[12px] text-foreground/40">Contact</p>
                  ) : selectedShop.boothPlans[0] ? (
                    <p className="font-black text-[16px] text-primary">
                      ${selectedShop.boothPlans[0].price}
                    </p>
                  ) : null}
                  <p className="text-[11px] text-primary">View →</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
