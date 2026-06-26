import type { Metadata } from "next";

/**
 * /claim layout — noindex while the shop-claim backend is not yet wired.
 * Form submissions on /claim currently do not persist (see TODO comments
 * in claim/page.tsx); we don't want Google directing real shop owners to
 * a form that no-ops. Remove `robots` and add `title`/`description` when
 * the claim flow is real.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ClaimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
