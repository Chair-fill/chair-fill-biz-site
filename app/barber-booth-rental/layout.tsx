import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marketplaceEnabled } from "@/lib/flags";

/**
 * Marketplace section layout — sets noindex for all /barber-booth-rental/*
 * routes until real shops exist + backend wiring is in place. Page-level
 * metadata still controls title/description/canonical — `robots` is merged
 * from this layout so all marketplace pages get noindex without us having
 * to repeat it on every page export.
 *
 * The whole section is also gated to staging-only via marketplaceEnabled():
 * it renders in development/staging and 404s in production until the
 * marketplace ships for real.
 *
 * Remove `robots` from this metadata block (and the marketplaceEnabled gate
 * below) when the marketplace ships for real.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function BoothRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!marketplaceEnabled()) notFound();
  return <>{children}</>;
}
