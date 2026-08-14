import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Barber Reactivation Calculator — See What Dormant Clients Cost You",
  description:
    "Free calculator: see how much revenue is sitting in your phone from clients who stopped coming — and get 5 texts that win them back.",
  alternates: { canonical: "/tools/reactivation-calculator" },
  openGraph: {
    title: "How much are your dormant clients costing you?",
    description:
      "Free barber reactivation calculator + 5 texts that win lapsed clients back.",
    url: `${SITE.url}/tools/reactivation-calculator`,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How much are your dormant clients costing you?",
    description: "Free barber reactivation calculator + 5 win-back texts.",
    images: [SITE.ogImage],
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
