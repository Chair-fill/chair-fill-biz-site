import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Claim a Founding Spot",
  description:
    "One of 5 free Founding Member spots in Tampa. No card. No contract. 90-second signup — I'll text you tonight to launch your reactivation campaign in 48 hours.",
  alternates: { canonical: "/founding-member" },
  openGraph: {
    title: "Claim a Founding Spot — ChairFill",
    description:
      "5 free Founding Member spots for Tampa barbers. AI client reactivation, set up in 48 hours.",
    url: `${SITE.url}/founding-member`,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claim a Founding Spot — ChairFill",
    description:
      "5 free Founding Member spots. AI client reactivation in 48 hours.",
    images: [SITE.ogImage],
  },
};

export default function FoundingMemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
