"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { Shop } from "@/lib/marketplace/data";

interface MapPanelProps {
  shops: Shop[];
  citySlug: string;
  /** Currently highlighted shop (from list hover / selection). */
  selectedSlug?: string | null;
  /** Notify parent when a marker is clicked (for list<->map sync, task #12). */
  onSelect?: (slug: string) => void;
}

function priceLabel(shop: Shop): string {
  if (shop.hidePricing) return "Inquire";
  const p = shop.boothPlans[0]?.price;
  return p != null ? `$${p}` : "Inquire";
}

/** Price-pill marker, Airbnb style. Inline styles so Leaflet's detached DOM renders correctly. */
function priceIcon(shop: Shop, active: boolean): L.DivIcon {
  const bg = active ? "#16a34a" : "#111111";
  const color = active ? "#ffffff" : "#ffffff";
  const border = active ? "#16a34a" : "rgba(255,255,255,0.25)";
  return L.divIcon({
    className: "cf-price-pin",
    html: `<div style="
      background:${bg};color:${color};border:1px solid ${border};
      font:700 12px/1 ui-sans-serif,system-ui,sans-serif;
      padding:6px 10px;border-radius:9999px;white-space:nowrap;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);transform:translate(-50%,-50%);
      cursor:pointer;">${priceLabel(shop)}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

/** Fit the map to all shop markers whenever the set changes. */
function FitBounds({ shops }: { shops: Shop[] }) {
  const map = useMap();
  useEffect(() => {
    const pts = shops
      .filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng))
      .map((s) => [s.lat, s.lng] as [number, number]);
    if (pts.length === 0) return;
    if (pts.length === 1) {
      map.setView(pts[0], 13);
      return;
    }
    map.fitBounds(L.latLngBounds(pts), { padding: [48, 48], maxZoom: 14 });
  }, [shops, map]);
  return null;
}

export default function MapPanel({
  shops,
  citySlug,
  selectedSlug,
  onSelect,
}: MapPanelProps) {
  const located = useMemo(
    () => shops.filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng)),
    [shops],
  );

  const center = useMemo<[number, number]>(() => {
    if (located.length > 0) return [located[0].lat, located[0].lng];
    return [39.8283, -98.5795]; // US center fallback
  }, [located]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds shops={located} />
      {located.map((shop) => (
        <Marker
          key={shop.slug}
          position={[shop.lat, shop.lng]}
          icon={priceIcon(shop, selectedSlug === shop.slug)}
          eventHandlers={{ click: () => onSelect?.(shop.slug) }}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <p style={{ fontWeight: 700, margin: "0 0 2px" }}>{shop.name}</p>
              <p style={{ fontSize: 12, color: "#555", margin: "0 0 6px" }}>
                {shop.address}
              </p>
              <p style={{ fontSize: 13, margin: "0 0 8px" }}>
                {shop.hidePricing
                  ? "Contact for pricing"
                  : shop.boothPlans[0]
                    ? `$${shop.boothPlans[0].price}/${shop.boothPlans[0].period}`
                    : ""}
              </p>
              <Link
                href={`/shops/${citySlug}/${shop.slug}`}
                style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}
              >
                View shop →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
