import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Claim Your Free Spot",
  description:
    "Claim a free founding spot on ChairFill — AI-powered client reactivation for independent barbers. Now accepting barbers.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Claim Your Free ChairFill Spot",
    description:
      "Fill your chair with ChairFill. AI client reactivation for independent barbers — now accepting barbers.",
    url: `${SITE.url}/waitlist`,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claim Your Free ChairFill Spot",
    description:
      "AI client reactivation for independent barbers — now accepting barbers.",
    images: [SITE.ogImage],
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
