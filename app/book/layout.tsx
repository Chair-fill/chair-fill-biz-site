import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free 30-minute setup call with ChairFill. We'll get your client-reactivation running — no card, no commitment.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Call with ChairFill",
    description:
      "Grab a 30-minute setup call. We'll get your chair filling with AI client reactivation.",
    url: `${SITE.url}/book`,
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call with ChairFill",
    description: "Grab a 30-minute setup call. Free, no commitment.",
    images: [SITE.ogImage],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
