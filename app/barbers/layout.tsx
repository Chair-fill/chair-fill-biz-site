import type { Metadata } from "next";

/**
 * /barbers/* layout — noindex while the demand-signal backend is not yet
 * wired. Form submissions on /barbers/looking currently do not persist
 * (see TODO in barbers/looking/page.tsx); don't index a form that no-ops.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function BarbersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
