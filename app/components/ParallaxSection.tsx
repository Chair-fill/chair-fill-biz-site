"use client";

import { useRef, useState, useEffect } from "react";

type ParallaxSectionProps = {
  children: React.ReactNode;
  imageUrl: string;
  overlay?: "dark" | "darker" | "light" | "coke" | "none";
  speed?: number;
  minHeight?: string;
  className?: string;
  contentClassName?: string;
  id?: string;
};

export default function ParallaxSection({
  children,
  imageUrl,
  overlay = "dark",
  speed = 0.4,
  minHeight = "100vh",
  className = "",
  contentClassName = "",
  id,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      // As user scrolls down, background moves slower (parallax): offset = scroll into section * speed
      const scrollIntoSection = window.scrollY - sectionTop + window.innerHeight * 0.5;
      const clamped = Math.max(-200, Math.min(200, scrollIntoSection * speed));
      setOffset(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const overlayClass =
    overlay === "dark"
      ? "bg-black/60"
      : overlay === "darker"
        ? "bg-black/75"
        : overlay === "light"
          ? "bg-white/50"
          : overlay === "coke"
            ? "bg-[#f40009]/70"
            : "";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Parallax background layer */}
      <div
        className="absolute inset-0 -top-[20%] h-[140%] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translate3d(0, ${offset}px, 0)`,
        }}
        aria-hidden
      />
      {overlay !== "none" && (
        <div
          className={`absolute inset-0 ${overlayClass}`}
          aria-hidden
        />
      )}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  );
}
