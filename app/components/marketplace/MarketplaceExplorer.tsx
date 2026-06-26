"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Map as MapIcon, List as ListIcon } from "lucide-react";
import type { Shop } from "@/lib/marketplace/data";

// Leaflet touches `window`, so the map is client-only (no SSR).
const MapPanel = dynamic(() => import("./MapPanel"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center bg-card text-foreground/40 text-[13px]">
      Loading map…
    </div>
  ),
});

interface MarketplaceExplorerProps {
  shops: Shop[];
  citySlug: string;
  cityName: string;
}

type MobileView = "list" | "map";

function ShopCard({
  shop,
  citySlug,
  active,
  onHover,
}: {
  shop: Shop;
  citySlug: string;
  active: boolean;
  onHover: (slug: string | null) => void;
}) {
  return (
    <Link
      href={`/shops/${citySlug}/${shop.slug}`}
      onMouseEnter={() => onHover(shop.slug)}
      onMouseLeave={() => onHover(null)}
      className={`block bg-card border rounded-xl p-6 transition-all group ${
        active ? "border-primary" : "border-border hover:border-primary/40"
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
          <p className="text-[13px] text-foreground/50 mb-3">{shop.address}</p>
          <p className="text-[13px] text-foreground/70 line-clamp-2">
            {shop.description}
          </p>
          {shop.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {shop.amenities.slice(0, 4).map((a) => (
                <span
                  key={a}
                  className="text-[11px] px-2 py-0.5 rounded-full border border-border text-foreground/50"
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          {shop.hidePricing ? (
            <p className="text-[13px] text-foreground/40">Contact for pricing</p>
          ) : shop.boothPlans[0] ? (
            <>
              <p className="font-black text-[20px] text-primary">
                ${shop.boothPlans[0].price}
              </p>
              <p className="text-[11px] text-foreground/40">
                /{shop.boothPlans[0].period}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default function MarketplaceExplorer({
  shops,
  citySlug,
  cityName,
}: MarketplaceExplorerProps) {
  const [mobileView, setMobileView] = useState<MobileView>("list");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  if (shops.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <p className="text-foreground/50 text-[14px]">
          No listings yet for {cityName}.
        </p>
        <Link
          href="/claim"
          className="mt-4 inline-block text-primary text-[13px] hover:underline"
        >
          Own a shop here? Claim it free →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile view toggle (hidden on desktop split) */}
      <div className="flex lg:hidden gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMobileView("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            mobileView === "list"
              ? "bg-primary text-black"
              : "bg-card border border-border text-foreground/70"
          }`}
        >
          <ListIcon className="w-4 h-4" /> List
        </button>
        <button
          type="button"
          onClick={() => setMobileView("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            mobileView === "map"
              ? "bg-primary text-black"
              : "bg-card border border-border text-foreground/70"
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
          {shops.map((shop) => (
            <ShopCard
              key={shop.slug}
              shop={shop}
              citySlug={citySlug}
              active={selectedSlug === shop.slug}
              onHover={setSelectedSlug}
            />
          ))}
        </div>

        {/* Map */}
        <div
          className={`lg:w-[48%] shrink-0 ${
            mobileView === "list" ? "hidden lg:block" : ""
          }`}
        >
          <div className="rounded-xl overflow-hidden border border-border h-[70vh] lg:h-[78vh] lg:sticky lg:top-6">
            <MapPanel
              shops={shops}
              citySlug={citySlug}
              selectedSlug={selectedSlug}
              onSelect={setSelectedSlug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
