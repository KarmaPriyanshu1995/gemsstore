import type { Product } from "@/types/catalog";
import type {
  ProductFaq,
  ProductReview,
  ProductSpecification,
} from "@/types/product-detail";

const GEM_IMAGE = "/images/showcase/gemstone.png";
const REF_IMAGE = "/images/showcase/maharaja-gem-reference.png";

const galleryByGemstone: Record<string, string[]> = {
  emerald: [
    GEM_IMAGE,
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200",
    REF_IMAGE,
  ],
  ruby: [
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200",
    GEM_IMAGE,
  ],
  sapphire: [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200",
    GEM_IMAGE,
    REF_IMAGE,
  ],
  diamond: [GEM_IMAGE, REF_IMAGE, GEM_IMAGE],
  amethyst: [
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200",
    GEM_IMAGE,
  ],
};

export function getProductGallery(product: Product): string[] {
  const typeGallery = galleryByGemstone[product.gemstoneType];
  if (typeGallery) {
    const merged = [product.images[0], ...typeGallery];
    return [...new Set(merged)];
  }
  return product.images.length > 0 ? product.images : [GEM_IMAGE];
}

export function buildProductSpecifications(
  product: Product,
): ProductSpecification[] {
  const specs: ProductSpecification[] = [
    { label: "Gemstone", value: product.gemstoneType },
    { label: "Category", value: product.category },
    { label: "Origin", value: product.origin },
    { label: "Color", value: product.color },
    { label: "Certification", value: product.certification },
  ];

  if (product.birthMonth) {
    specs.push({ label: "Birth Month", value: product.birthMonth });
  }

  if (product.zodiac) {
    specs.push({ label: "Zodiac", value: product.zodiac });
  }

  specs.push({
    label: "Availability",
    value: product.inStock ? "In Stock" : "Sold Out",
  });

  return specs;
}

const sharedReviews: ProductReview[] = [
  {
    id: "rev_001",
    author: "Priya Sharma",
    rating: 5,
    title: "Exquisite craftsmanship",
    body: "The gemstone exceeded every expectation. Certification arrived promptly and the setting feels truly regal.",
    date: "2026-03-12T10:00:00.000Z",
  },
  {
    id: "rev_002",
    author: "Arjun Mehta",
    rating: 5,
    title: "A heirloom-worthy purchase",
    body: "RealGemsStore curated the perfect piece for our anniversary. The concierge team was attentive throughout.",
    date: "2026-02-28T10:00:00.000Z",
  },
  {
    id: "rev_003",
    author: "Elena Vasquez",
    rating: 4,
    title: "Beautiful stone, swift delivery",
    body: "Stunning colour and clarity. Packaging felt luxurious — would appreciate more angle photos in the gallery.",
    date: "2026-01-15T10:00:00.000Z",
  },
];

export function getProductReviews(product: Product): ProductReview[] {
  return sharedReviews.map((review, index) => ({
    ...review,
    id: `${review.id}_${product.slug}`,
    rating: index === 0 ? Math.min(5, product.rating) : review.rating,
  }));
}

export const productDetailFaqs: ProductFaq[] = [
  {
    id: "faq_001",
    question: "Is this gemstone certified?",
    answer:
      "Every RealGemsStore piece ships with independent laboratory certification. Details are listed on the product page and included in your heritage presentation box.",
  },
  {
    id: "faq_002",
    question: "What is your return policy?",
    answer:
      "We offer a 14-day inspection period for unworn pieces in original condition. Contact our concierge team to initiate a return or exchange.",
  },
  {
    id: "faq_003",
    question: "How long does delivery take?",
    answer:
      "Domestic orders typically arrive within 5–7 business days. International heritage shipping is available with full insurance and tracking.",
  },
  {
    id: "faq_004",
    question: "Can I request a custom setting?",
    answer:
      "Yes. Use Consult Expert to speak with our atelier team about bespoke settings, resizing, or matching companion pieces.",
  },
  {
    id: "faq_005",
    question: "Do you offer payment plans?",
    answer:
      "Select pieces qualify for concierge financing. Our team will share options during your expert consultation.",
  },
];
