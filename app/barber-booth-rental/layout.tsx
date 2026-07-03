import { notFound } from "next/navigation";
import { marketplaceEnabled } from "@/lib/flags";

/**
 * Marketplace section layout for /barber-booth-rental/*. The marketplace is
 * live, so these routes are indexable — each page sets its own
 * title/description/canonical. marketplaceEnabled() stays as the kill-switch:
 * 404s the section if NEXT_PUBLIC_MARKETPLACE=false.
 */
export default function BoothRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!marketplaceEnabled()) notFound();
  return <>{children}</>;
}
