"use client";

import { useRef, useState, useEffect } from "react";
import EmailCapture from "./EmailCapture";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1920&q=80";

export default function HeroJumbotron() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 + scrollY * 0.0003;
  const y = scrollY * 0.35;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="parallax-hero-bg absolute inset-0 -top-[10%] h-[120%] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          transform: `translate3d(0, ${y * 0.45}px, 0) scale(${Math.min(scale, 1.15)})`,
        }}
        aria-hidden
      />
      {/* Coca-Cola style red overlay for bold, iconic look */}
      <div
        className="absolute inset-0 bg-[var(--primary)]/75"
        aria-hidden
      />
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/90">
          Built for barbers · AI outreach via iMessage
        </p>
        <h1
          className="mx-auto max-w-4xl text-5xl font-normal leading-[1.1] tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl [font-family:var(--font-bebas)]"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          Fill every chair.
          <br />
          <span className="text-white">Recover lost revenue.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-white/95 sm:text-xl">
          Our AI chatbot reaches your clients on iMessage—reminds them, fills last-minute openings, and rebooks no-shows. So your chair stays full and you stay behind the chair.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <EmailCapture variant="hero" />
          <p className="text-sm font-medium uppercase tracking-wider text-white/80">
            Cancel anytime
          </p>
        </div>
      </div>
      {/* Bottom fade to white (Coca-Cola clean transition) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />
    </section>
  );
}
