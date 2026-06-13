export type ShowcaseGemstoneStatus = "enabled" | "disabled";

export type MobileShowcaseBehavior = "stack" | "compact";

export type AdminShowcaseGemstone = {
  id: string;
  name: string;
  slug: string;
  story: string;
  description: string;
  origin: string;
  benefits: string;
  certification: string;
  glowColor: string;
  priceFrom: number;
  image: string;
  ctaLabel: string;
  status: ShowcaseGemstoneStatus;
  sortOrder: number;
  updatedAt: string;
};

export type ShowcaseDisplayControls = {
  autoplayEnabled: boolean;
  rotationSpeedMs: number;
  pauseOnHover: boolean;
  mobileBehavior: MobileShowcaseBehavior;
};

export type ShowcaseCircleControls = {
  circularPathVisible: boolean;
  activeScale: number;
  glowIntensity: number;
  animationSpeed: number;
  scrollSensitivity: number;
};

export type AdminSignatureData = {
  sectionId: string;
  sectionLabel: string;
  heroImage: string;
  fadeDurationMs: number;
  gemstones: AdminShowcaseGemstone[];
  display: ShowcaseDisplayControls;
  circle: ShowcaseCircleControls;
  updatedAt: string;
};

export type ShowcaseGemstoneFormData = Omit<
  AdminShowcaseGemstone,
  "id" | "sortOrder" | "updatedAt"
>;
