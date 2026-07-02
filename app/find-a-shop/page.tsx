import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import MarketplaceNav from "../components/marketplace/MarketplaceNav";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";
import AnimateIn from "../components/AnimateIn";
import MarketplaceSearch from "../components/marketplace/MarketplaceSearch";
import { SHOPS, CITIES, getAllShops, getCityCentroids } from "@/lib/marketplace/data";

export const metadata: Metadata = {
  title: "Find a Shop",
  description:
    "Explore the ChairFill barbershop network — 100+ real shops across Tampa, Miami, Orlando, and Atlanta. Search by location, compare booth plans, and inquire directly.",
  alternates: { canonical: "/find-a-shop" },
};

/**
 * "Find a Shop" — the full booth-rental marketplace experience, linked from
 * the main header: location + radius search, the synced shop list + map, and
 * click-through to every shop's detail page (inquiry form included).
 */
export default function FindAShopPage() {
  const cityNames = CITIES.map((c) => c.name).join(", ");
  const allShops = getAllShops();
  const cityCentroids = getCityCentroids();

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <MarketplaceNav />

      {/* Hero — copy approved by TMac (from the original homepage map section) */}
      <section className="pt-12 pb-10 sm:pt-16">
        <div className="section-inner">
          <AnimateIn>
            <div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#D4AF37] sm:text-xs">
              <MapPin className="h-4 w-4" />
              The network
            </div>
            <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl [font-family:var(--font-satoshi)]">
              Barbershops on the map.
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-[#a3a3a3]">
              {SHOPS.length}+ real shops across {cityNames} — the network
              ChairFill is building for barbers. Explore who&apos;s already out
              there.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Full marketplace search: location + radius, synced list + map,
          click through to shop pages + inquiry */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <MarketplaceSearch allShops={allShops} cityCentroids={cityCentroids} />
      </section>

      {/* CTA — same close as the approved section */}
      <section className="pb-20">
        <div className="section-inner text-center">
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
      </section>

      <MarketplaceFooter />
    </div>
  );
}
