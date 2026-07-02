"use client";

/**
 * Homepage "Find a shop" section — the marketplace map, embedded on the
 * landing page. Shows the real barbershop network (OSM-ingested shops across
 * Tampa, Miami, Orlando, Atlanta) on the Airbnb-style Leaflet map.
 *
 * Popups intentionally do NOT link into /shops/* (linkShops={false}) because
 * the full marketplace is still gated off in production. The section CTA
 * points at the waitlist instead.
 */

import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";
import AnimateIn from "./AnimateIn";
import { SHOPS, CITIES } from "@/lib/marketplace/data";

// Leaflet touches `window`, so the map is client-only (no SSR).
const MapPanel = dynamic(() => import("./marketplace/MapPanel"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-[#161616] text-sm text-[#888880]">
      Loading map…
    </div>
  ),
});

export default function HomeMapSection() {
  const cityNames = CITIES.map((c) => c.name).join(", ");

  return (
    <section id="map" className="bg-[#0a0a0a] py-20 sm:py-32">
      <div className="section-inner">
        <AnimateIn>
          <div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#D4AF37] sm:text-xs">
            <MapPin className="h-4 w-4" />
            The network
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
            Barbershops on the map.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#a3a3a3]">
            {SHOPS.length}+ real shops across {cityNames} — the network
            ChairFill is building for barbers. Explore who&apos;s already out
            there.
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="mt-12 h-[420px] overflow-hidden rounded-3xl border border-[#222] shadow-2xl sm:h-[520px]">
            <MapPanel shops={SHOPS} linkShops={false} />
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-[#888880]">
              Want your shop on the map, or a chair in one of these?
            </p>
            <Link
              href="/waitlist"
              className="cta-primary inline-flex justify-center rounded-full px-8 py-3 text-sm"
            >
              Join the waitlist →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
