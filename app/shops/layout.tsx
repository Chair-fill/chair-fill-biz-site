import type { Metadata } from "next";

/**
 * /shops/* layout — noindex until the marketplace ships for real.
 * Remove `robots` from this metadata when real shops exist.
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
  return <>{children}</>;
}
