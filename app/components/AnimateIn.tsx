"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

const OFFSETS: Record<NonNullable<AnimateInProps["direction"]>, string> = {
  up: "translate3d(0, 16px, 0)",
  down: "translate3d(0, -16px, 0)",
  left: "translate3d(16px, 0, 0)",
  right: "translate3d(-16px, 0, 0)",
  fade: "translate3d(0, 0, 0)",
};

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduce]);

  // Reduced motion: render in place, no entrance.
  const shown = reduce || isVisible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : OFFSETS[direction],
        transition: reduce
          ? "none"
          : `opacity 700ms var(--ease-out) ${delay}ms, transform 700ms var(--ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
