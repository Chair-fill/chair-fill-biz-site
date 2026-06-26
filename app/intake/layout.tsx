import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Founding Member Setup",
  description:
    "5-minute setup so ChairFill can launch your first reactivation campaign in 48 hours.",
  alternates: { canonical: "/intake" },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Founding Member Setup — ChairFill",
    description:
      "Onboarding intake for ChairFill Founding Members. Get launched in 48 hours.",
    url: `${SITE.url}/intake`,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
