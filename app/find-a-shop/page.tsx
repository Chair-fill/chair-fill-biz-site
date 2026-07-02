import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeMapSection from "../components/HomeMapSection";

export const metadata: Metadata = {
  title: "Find a Shop | ChairFill",
  description:
    "Explore the ChairFill barbershop network — 100+ real shops across Tampa, Miami, Orlando, and Atlanta on an interactive map.",
  alternates: { canonical: "/find-a-shop" },
};

/**
 * Standalone map page ("Find a Shop", linked from the header). Hosts the
 * marketplace map that used to sit on the homepage.
 */
export default function FindAShopPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />
      <div className="pt-16 lg:pt-14" />
      <HomeMapSection />
      <Footer />
    </div>
  );
}
