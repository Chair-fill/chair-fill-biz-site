"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import type { Shop } from "@/lib/marketplace/data";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

interface MapPanelProps {
  shops: Shop[];
  citySlug?: string;
  /** Currently highlighted shop (from list hover / selection). */
  selectedSlug?: string | null;
  /** Notify parent when a marker is clicked (for list<->map sync, task #12). */
  onSelect?: (slug: string) => void;
  /** When set, center the map here (location search) instead of fitting to shops. */
  center?: { lat: number; lng: number } | null;
  /** Radius circle (miles) drawn around `center`. */
  radiusMiles?: number;
  /** Fires on user pan/zoom end with the new map center (for "search this area"). */
  onMapMove?: (c: { lat: number; lng: number }) => void;
}

/** Reports map center after the user pans/zooms. */
function MoveWatcher({ onMapMove }: { onMapMove: (c: { lat: number; lng: number }) => void }) {
  useMapEvents({
    moveend: (e) => {
      const c = e.target.getCenter();
      onMapMove({ lat: c.lat, lng: c.lng });
    },
  });
  return null;
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

/** Recenter the map on the searched location + frame the radius. */
function CenterView({
  center,
  radiusMiles,
}: {
  center: { lat: number; lng: number };
  radiusMiles: number;
}) {
  const map = useMap();
  useEffect(() => {
    const meters = radiusMiles * 1609.34;
    const b = L.latLng(center.lat, center.lng).toBounds(meters * 2);
    map.fitBounds(b, { padding: [24, 24] });
  }, [center.lat, center.lng, radiusMiles, map]);
  return null;
}

/** Clustered price-pill markers (leaflet.markercluster). */
function ClusterLayer({
  shops,
  selectedSlug,
  onSelect,
}: {
  shops: Shop[];
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
}) {
  const map = useMap();
  const markersRef = useRef<globalThis.Map<string, L.Marker>>(new globalThis.Map());

  useEffect(() => {
    const group = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) =>
        L.divIcon({
          className: "cf-cluster",
          html: `<div style="
            background:#111111;color:#D4AF37;border:1px solid #D4AF37;
            width:40px;height:40px;border-radius:9999px;display:flex;
            align-items:center;justify-content:center;font:700 13px/1 ui-sans-serif,system-ui,sans-serif;
            box-shadow:0 2px 8px rgba(0,0,0,0.45);">${cluster.getChildCount()}</div>`,
          iconSize: L.point(40, 40),
        }),
    });
    const markers = new globalThis.Map<string, L.Marker>();
    shops.forEach((shop) => {
      const m = L.marker([shop.lat, shop.lng], {
        icon: priceIcon(shop, shop.slug === selectedSlug),
      });
      const price = shop.hidePricing
        ? "Contact for pricing"
        : shop.boothPlans[0]
          ? `$${shop.boothPlans[0].price}/${shop.boothPlans[0].period}`
          : "";
      m.bindPopup(
        `<div style="min-width:180px">
          <p style="font-weight:700;margin:0 0 2px">${escapeHtml(shop.name)}</p>
          <p style="font-size:12px;color:#555;margin:0 0 6px">${escapeHtml(shop.address)}</p>
          <p style="font-size:13px;margin:0 0 8px">${price}</p>
          <a href="/shops/${shop.city}/${shop.slug}" style="font-size:13px;font-weight:600;color:#16a34a">View shop &rarr;</a>
        </div>`,
      );
      m.on("click", () => onSelect?.(shop.slug));
      markers.set(shop.slug, m);
      group.addLayer(m);
    });
    map.addLayer(group);
    markersRef.current = markers;
    return () => {
      map.removeLayer(group);
    };
  }, [shops, map, onSelect, selectedSlug]);

  // Update highlight without rebuilding the cluster group.
  useEffect(() => {
    markersRef.current.forEach((m, slug) => {
      const shop = shops.find((s) => s.slug === slug);
      if (shop) m.setIcon(priceIcon(shop, slug === selectedSlug));
    });
  }, [selectedSlug, shops]);

  return null;
}

export default function MapPanel({
  shops,
  selectedSlug,
  onSelect,
  center,
  radiusMiles = 50,
  onMapMove,
}: MapPanelProps) {
  const located = useMemo(
    () => shops.filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng)),
    [shops],
  );

  const initialCenter = useMemo<[number, number]>(() => {
    if (center) return [center.lat, center.lng];
    if (located.length > 0) return [located[0].lat, located[0].lng];
    return [39.8283, -98.5795]; // US center fallback
  }, [center, located]);

  return (
    <MapContainer
      center={initialCenter}
      zoom={center ? 11 : 4}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {onMapMove && <MoveWatcher onMapMove={onMapMove} />}
      {center ? (
        <>
          <CenterView center={center} radiusMiles={radiusMiles} />
          <Circle
            center={[center.lat, center.lng]}
            radius={radiusMiles * 1609.34}
            pathOptions={{
              color: "#16a34a",
              fillColor: "#16a34a",
              fillOpacity: 0.06,
              weight: 1,
            }}
          />
        </>
      ) : (
        <FitBounds shops={located} />
      )}
      <ClusterLayer shops={located} selectedSlug={selectedSlug} onSelect={onSelect} />
    </MapContainer>
  );
}
