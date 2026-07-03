import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SHOPS, getShop, getCity } from "@/lib/marketplace/data";
import ShopPageClient from "./ShopPageClient";

interface Props {
  params: Promise<{ city: string; shop: string }>;
}

/**
 * Per-shop metadata so all 100+ indexable shop pages rank individually
 * instead of sharing the site-wide default title. The root layout template
 * appends "| ChairFill".
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, shop: shopSlug } = await params;
  const shop = getShop(citySlug, shopSlug);
  const city = getCity(citySlug);
  if (!shop || !city) return {};

  const title = `${shop.name} | Barber Booth Rental in ${city.name}, ${city.state}`;
  const description = `Rent a barber booth at ${shop.name} in ${city.name}, ${city.state}. See booth plans and amenities, and inquire directly on ChairFill.`;
  const url = `https://chairfill.co/shops/${citySlug}/${shopSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function ShopPage({ params }: Props) {
  const { city: citySlug, shop: shopSlug } = await params;
  const shop = getShop(citySlug, shopSlug);
  const city = getCity(citySlug);

  if (!shop || !city) notFound();

  return (
    <ShopPageClient 
      shop={shop} 
      city={city} 
      citySlug={citySlug} 
      shopSlug={shopSlug} 
    />
  );
}

// Static params for prerendering
export async function generateStaticParams() {
  return SHOPS.map((s) => ({ city: s.city, shop: s.slug }));
}
