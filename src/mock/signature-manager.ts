import type { AdminSignatureData } from "@/types/admin-signature";

export const mockSignatureManagerData: AdminSignatureData = {
  sectionId: "circle-of-gems",
  sectionLabel: "Maharaja Gallery — Gemstone Showcase",
  heroImage: "/images/showcase/gemstone.png",
  fadeDurationMs: 1400,
  gemstones: [
    {
      id: "gem_001",
      name: "Emerald",
      slug: "emerald",
      story:
        "Colombian emeralds — the stone of kings, cherished across Maharaja courts for centuries.",
      description:
        "The stone of kings — Colombian emeralds prized for their vivid green fire and timeless regal presence.",
      origin: "Colombia",
      benefits:
        "Believed to inspire clarity, renewal, and prosperity. A symbol of wisdom cherished by Maharaja courts.",
      certification: "GIA & IGI Certified · Full Provenance",
      glowColor: "#0F7B5F",
      priceFrom: 45000,
      image: "/images/showcase/gemstone.png",
      ctaLabel: "Unveil Emerald",
      status: "enabled",
      sortOrder: 1,
      updatedAt: "2026-06-01T10:00:00.000Z",
    },
    {
      id: "gem_002",
      name: "Ruby",
      slug: "ruby",
      story:
        "Burmese pigeon-blood rubies — the passion stone of emperors and warrior kings.",
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
      ctaLabel: "Unveil Ruby",
      status: "enabled",
      sortOrder: 2,
      updatedAt: "2026-06-01T10:00:00.000Z",
    },
    {
      id: "gem_003",
      name: "Sapphire",
      slug: "sapphire",
      story:
        "Ceylon sapphires — celestial blue stones that adorned South Asian dynasties.",
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
      ctaLabel: "Unveil Sapphire",
      status: "enabled",
      sortOrder: 3,
      updatedAt: "2026-06-01T10:00:00.000Z",
    },
    {
      id: "gem_004",
      name: "Diamond",
      slug: "diamond",
      story:
        "Flawless diamonds — the ultimate treasure of the Maharaja gallery.",
      description:
        "Flawless diamonds cut to reveal maximum brilliance — the ultimate treasure of the Maharaja gallery.",
      origin: "South Africa",
      benefits:
        "Represents purity, eternal strength, and unmatched brilliance — the crown jewel of any collection.",
      certification: "GIA Certified · Laser Inscription",
      glowColor: "#C7A45A",
      priceFrom: 75000,
      image: "/images/showcase/maharaja-gem-reference.png",
      ctaLabel: "Unveil Diamond",
      status: "enabled",
      sortOrder: 4,
      updatedAt: "2026-06-01T10:00:00.000Z",
    },
  ],
  display: {
    autoplayEnabled: true,
    rotationSpeedMs: 5000,
    pauseOnHover: true,
    mobileBehavior: "stack",
  },
  circle: {
    circularPathVisible: false,
    activeScale: 1.85,
    glowIntensity: 75,
    animationSpeed: 1,
    scrollSensitivity: 1,
  },
  updatedAt: "2026-06-01T10:00:00.000Z",
};
