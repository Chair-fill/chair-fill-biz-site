import type { Metadata } from "next";

/**
 * Marketplace section layout — sets noindex for all /barber-booth-rental/*
 * routes until real shops exist + backend wiring is in place. Page-level
 * metadata still controls title/description/canonical — `robots` is merged
 * from this layout so all marketplace pages get noindex without us having
 * to repeat it on every page export.
 *
 * Remove `robots` from this metadata block when the marketplace ships
 * for real.
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
  return <>{children}</>;
}
