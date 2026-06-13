import { mockTestimonials } from "@/mock/testimonials";
import type { AdminCmsData } from "@/types/admin-cms";

export const mockCmsData: AdminCmsData = {
  visibility: {
    hero: true,
    featuredProducts: true,
    featuredCollections: true,
    heritage: true,
    educational: true,
    testimonials: true,
    cta: true,
  },
  hero: {
    eyebrow: "Maharaja Heritage",
    headline: "Timeless gemstones, crafted for the modern maharaja.",
    subheadline:
      "Discover certified emeralds, rubies, and sapphires — each piece hand-selected and set with the artistry of Indian royal heritage.",
    primaryCtaLabel: "Shop Collection",
    primaryCtaHref: "/collections",
    secondaryCtaLabel: "Maharaja Gallery",
    secondaryCtaHref: "#circle-of-gems",
  },
  featuredProducts: {
    title: "Featured Treasures",
    description:
      "Hand-selected gemstones from our heritage collection — certified, insured, and ready to adorn.",
  },
  featuredCollections: {
    title: "Curated Collections",
    description:
      "Explore themed collections inspired by the courts of emperors and the artistry of master craftsmen.",
  },
  heritage: {
    badge: "Our Heritage",
    headline: "The art of maharaja craftsmanship",
    paragraph1:
      "For centuries, Indian royalty adorned themselves with the world's finest gemstones. RealGemsStore carries that legacy forward — each piece is sourced from certified mines, cut by master artisans, and set in designs inspired by Mughal and Rajput court jewellery.",
    paragraph2:
      "Every gemstone arrives with full provenance documentation, GIA or IGI certification, and insured delivery — because true luxury demands complete transparency.",
    stats: [
      { label: "Certified", value: "GIA & IGI" },
      { label: "Origin", value: "Traceable" },
      { label: "Shipping", value: "Insured" },
      { label: "Heritage", value: "Since 1947" },
    ],
  },
  educational: {
    headline: "Understanding Gemstone Certification",
    body:
      "Every RealGemsStore piece ships with GIA or IGI certification — independent verification of origin, treatment, and quality. Our concierge team guides you through provenance reports, helping you invest with confidence in stones worthy of a maharaja's treasury.",
  },
  testimonials: mockTestimonials.map((t) => ({ ...t })),
  cta: {
    headline: "Begin your heritage collection",
    subheadline:
      "Explore certified gemstones and heirloom-quality settings — each piece a testament to maharaja craftsmanship.",
    buttonLabel: "Shop Now",
    buttonHref: "/products",
  },
  about: {
    headline: "Our Story",
    body:
      "Founded in 1947, RealGemsStore began as a family atelier serving the royal courts of Rajasthan. Today we bring that same devotion to certification, provenance, and craftsmanship to discerning collectors worldwide.",
    mission:
      "To preserve the maharaja heritage of Indian gemstone artistry while making certified luxury accessible to the modern connoisseur.",
  },
  contact: {
    email: "concierge@realgemsstore.com",
    phone: "+91 22 4000 1947",
    address: "Maharaja Heritage House, 42 Gem Boulevard, Mumbai 400001, India",
    hours: "Mon–Sat, 10:00 AM – 7:00 PM IST",
  },
  updatedAt: "2026-06-01T10:00:00Z",
};
