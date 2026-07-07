"use client";

import { useEffect, useState } from "react";

const TOTAL_SPOTS = 5;
// One founding barber is already in — the API adds live signups on top
// (mirrors FoundingMemberSection).
const BASE_SPOTS_TAKEN = 1;

/** Live "free founding spots left", fed by /api/spots-taken. */
export function useSpotsLeft(): number {
  const [left, setLeft] = useState(TOTAL_SPOTS - BASE_SPOTS_TAKEN);
  useEffect(() => {
    fetch("/api/spots-taken")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.spotsTaken === "number") {
          setLeft(Math.max(0, TOTAL_SPOTS - Math.max(BASE_SPOTS_TAKEN, d.spotsTaken)));
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
