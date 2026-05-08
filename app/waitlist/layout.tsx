import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "Reserve your spot for ChairFill — AI-powered client reactivation for independent barbers. Get notified the moment we launch.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Join the ChairFill Waitlist",
    description:
      "Be the first to fill your chair with ChairFill. AI client reactivation for independent barbers — launching soon.",
    url: `${SITE.url}/waitlist`,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the ChairFill Waitlist",
    description:
      "AI client reactivation for independent barbers — launching soon.",
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
