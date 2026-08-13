"use client";

import { useEffect, useState } from "react";

const TOTAL_SPOTS = 5;

/**
 * Live "free founding spots left", fed by /api/spots-taken (which proxies the
 * backend's real active-barber count). No hardcoded floor — the number reflects
 * genuinely active founding barbers, so it reads honestly (5 of 5 when none are
 * live yet).
 */
export function useSpotsLeft(): number {
  const [left, setLeft] = useState(TOTAL_SPOTS);
  useEffect(() => {
    fetch("/api/spots-taken")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.spotsTaken === "number") {
          const total = typeof d?.totalSpots === "number" ? d.totalSpots : TOTAL_SPOTS;
          setLeft(Math.max(0, total - d.spotsTaken));
        }
      })
      .catch(() => {});
  }, []);
  return left;
}

/** Drop-in stat for the homepage stats bar: "N of 5 / free founding spots left". */
export function SpotsStat() {
  const left = useSpotsLeft();
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] [font-family:var(--font-satoshi)]">
        {left} of {TOTAL_SPOTS}
      </div>
      <div className="text-[10px] sm:text-xs font-medium text-[#888880] uppercase tracking-widest mt-1">
        Free founding spots left
      </div>
    </div>
  );
}
