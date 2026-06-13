import type { AdminSeoData } from "@/types/admin-seo";

const SITE_URL = "https://realgemsstore.com";
const OG_IMAGE = "/images/showcase/gemstone.png";

function page(
  pageKey: AdminSeoData["pages"][0]["pageKey"],
  pageLabel: string,
  path: string,
  metaTitle: string,
  metaDescription: string,
  schemaType: AdminSeoData["pages"][0]["schema"]["type"] = "WebSite",
): AdminSeoData["pages"][0] {
  return {
    pageKey,
    pageLabel,
    path,
    metaTitle,
    metaDescription,
    slug: path.replace(/^\//, "") || "home",
    canonicalUrl: `${SITE_URL}${path === "/" ? "" : path}`,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      image: OG_IMAGE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      image: OG_IMAGE,
    },
    schema: {
      enabled: true,
      type: schemaType,
      name: "RealGemsStore",
      description: metaDescription,
    },
    noIndex: false,
    updatedAt: "2026-06-01T10:00:00Z",
  };
}

export const mockSeoData: AdminSeoData = {
  siteUrl: SITE_URL,
  pages: [
    page(
      "home",
      "Home",
      "/",
      "RealGemsStore — Maharaja Heritage Gemstones",
      "Luxury certified gemstones and heritage jewellery. Emeralds, rubies, sapphires — crafted for the modern maharaja.",
      "Organization",
    ),
    page(
      "products",
      "Shop",
      "/products",
      "Shop Certified Gemstones — RealGemsStore",
      "Browse certified emeralds, rubies, sapphires, and diamonds. Filter by origin, certification, and birth month.",
      "Product",
    ),
    page(
      "collections",
      "Collections",
      "/collections",
      "Heritage Collections — RealGemsStore",
      "Explore curated gemstone collections inspired by Maharaja courts and master craftsmanship.",
    ),
    page(
      "about",
      "About",
      "/about",
      "Our Heritage Story — RealGemsStore",
      "Founded in 1947, RealGemsStore preserves the maharaja heritage of Indian gemstone artistry for modern collectors.",
      "Organization",
    ),
    page(
      "contact",
      "Contact",
      "/contact",
      "Contact Concierge — RealGemsStore",
      "Reach our gemstone concierge for certification inquiries, bespoke orders, and white-glove delivery.",
    ),
  ],
};
