export const SITE = {
  name: "ChairFill",
  legalName: "ChairFill LLC",
  url: "https://chairfill.co",
  logo: "https://chairfill.co/logo-new.png",
  ogImage: "/assets/8f845499-d9e9-44f4-9672-25682e2938c4_removalai_preview.jpeg",
  description:
    "ChairFill is the AI-powered client reactivation platform for independent barbers. Identify quiet clients and bring them back to your chair automatically — through iMessage, in your voice.",
  shortDescription:
    "AI-powered client reactivation for independent barbers. Bring quiet clients back through iMessage, automatically.",
  keywords: [
    "barber booking software",
    "client reactivation",
    "barber client recovery",
    "AI for barbers",
    "barber no-show recovery",
    "iMessage marketing for barbers",
    "barber appointment software",
    "barbershop revenue recovery",
    "barber CRM",
    "barber automation",
  ],
  email: "admin@chairfill.co",
  twitter: "@chairfill",
  founderRegion: "FL",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: SITE.logo,
  description: SITE.description,
  email: SITE.email,
  sameAs: [] as string[],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE.email,
    availableLanguage: ["English"],
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.shortDescription,
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: SITE.logo },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: SITE.description,
  url: SITE.url,
  image: absoluteUrl(SITE.ogImage),
  offers: [
    {
      "@type": "Offer",
      name: "Independent",
      price: "147",
      priceCurrency: "USD",
      description: "Solo barber plan — billed monthly",
    },
    {
      "@type": "Offer",
      name: "Professional",
      price: "247",
      priceCurrency: "USD",
      description: "Multi-chair operator plan — billed monthly",
    },
  ],
  publisher: {
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
  },
};

export function faqPageJsonLd(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
