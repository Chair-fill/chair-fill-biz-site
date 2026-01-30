import type { Metadata } from "next";
import { Geist_Mono, Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ChairFill — Fill Every Chair. For Barbers. AI Outreach via iMessage.",
  description:
    "Built for barbers. Our AI chatbot fills your chair by automating client outreach and rebooking via iMessage—fewer no-shows, more appointments.",
  openGraph: {
    title: "ChairFill — Fill Every Chair | AI Outreach for Barbers via iMessage",
    description:
      "For barbers: automate client outreach via iMessage. Fill your chair, reduce no-shows, recover lost revenue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${geistMono.variable} ${bebasNeue.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
