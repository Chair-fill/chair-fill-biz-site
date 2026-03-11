import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the waitlist. ChairFill",
  description:
    "Join the ChairFill waitlist. Be the first to know when we launch. AI-powered client outreach for barbers via iMessage.",
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
