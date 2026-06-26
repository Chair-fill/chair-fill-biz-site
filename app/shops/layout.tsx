import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marketplaceEnabled } from "@/lib/flags";

/**
 * /shops/* layout — noindex until the marketplace ships for real, and gated
 * to staging-only via marketplaceEnabled() (renders in development/staging,
 * 404s in production). Remove both when real shops exist.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ShopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!marketplaceEnabled()) notFound();
  return <>{children}</>;
}
