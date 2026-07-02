import { notFound } from "next/navigation";
import { marketplaceEnabled } from "@/lib/flags";

/**
 * /shops/* layout — the marketplace is live, so these pages are indexable
 * (no robots override here; shop pages set their own title/description).
 * marketplaceEnabled() stays as the kill-switch: 404s the section if
 * NEXT_PUBLIC_MARKETPLACE=false.
 */
export default function ShopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!marketplaceEnabled()) notFound();
  return <>{children}</>;
}
