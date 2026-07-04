import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pretty barber-card URLs: chairfill.co/card/<barber> proxies to the backend,
  // which renders the card live from the barber's account.
  async rewrites() {
    return [
      {
        source: "/card/:path*",
        destination: "https://api.chairfill.co/api/v1/card/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.undraw.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
