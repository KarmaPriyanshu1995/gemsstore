import type { Gemstone } from "@/types/catalog";

export const mockGemstones: Gemstone[] = [
  {
    id: "gem_001",
    name: "Emerald",
    slug: "emerald",
    description:
      "The stone of kings — Colombian emeralds prized for their vivid green fire and timeless regal presence.",
    origin: "Colombia",
    benefits:
      "Believed to inspire clarity, renewal, and prosperity. A symbol of wisdom cherished by Maharaja courts.",
    certification: "GIA & IGI Certified · Full Provenance",
    glowColor: "#0F7B5F",
    priceFrom: 45000,
    image: "/images/showcase/gemstone.png",
    visible: true,
    sortOrder: 1,
  },
  {
    id: "gem_002",
    name: "Ruby",
    slug: "ruby",
    description:
      "Burmese rubies with the legendary pigeon-blood hue — the passion stone of emperors and warrior kings.",
    origin: "Myanmar",
    benefits:
      "Associated with courage, vitality, and protection. Worn by royalty as a talisman of power.",
    certification: "GIA Certified · Burmese Origin Report",
    glowColor: "#9B1B30",
    priceFrom: 52000,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200",
    visible: true,
    sortOrder: 2,
  },
  {
    id: "gem_003",
    name: "Sapphire",
    slug: "sapphire",
    description:
      "Ceylon sapphires — celestial blue stones that adorned the crowns of South Asian dynasties for centuries.",
    origin: "Sri Lanka",
    benefits:
      "Thought to bring mental focus, spiritual insight, and divine favour to its wearer.",
    certification: "IGI Certified · Sri Lankan Heritage",
    glowColor: "#1E3A8A",
    priceFrom: 38000,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200",
    visible: true,
    sortOrder: 3,
  },
  {
    id: "gem_004",
    name: "Diamond",
    slug: "diamond",
    description:
      "Flawless diamonds cut to reveal maximum brilliance — the ultimate treasure of the Maharaja gallery.",
    origin: "South Africa",
    benefits:
      "Represents purity, eternal strength, and unmatched brilliance — the crown jewel of any collection.",
    certification: "GIA Certified · Laser Inscription",
    glowColor: "#C7A45A",
    priceFrom: 75000,
    image: "/images/showcase/maharaja-gem-reference.png",
    visible: true,
    sortOrder: 4,
  },
];
