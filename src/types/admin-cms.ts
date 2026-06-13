export type CmsSectionKey =
  | "hero"
  | "featuredProducts"
  | "featuredCollections"
  | "heritage"
  | "educational"
  | "testimonials"
  | "cta"
  | "about"
  | "contact"
  | "visibility";

export type CmsSectionVisibility = {
  hero: boolean;
  featuredProducts: boolean;
  featuredCollections: boolean;
  heritage: boolean;
  educational: boolean;
  testimonials: boolean;
  cta: boolean;
};

export type CmsHeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type CmsSectionHeading = {
  title: string;
  description: string;
};

export type CmsHeritageContent = {
  badge: string;
  headline: string;
  paragraph1: string;
  paragraph2: string;
  stats: { label: string; value: string }[];
};

export type CmsEducationalContent = {
  headline: string;
  body: string;
};

export type CmsCtaContent = {
  headline: string;
  subheadline: string;
  buttonLabel: string;
  buttonHref: string;
};

export type CmsAboutContent = {
  headline: string;
  body: string;
  mission: string;
};

export type CmsContactContent = {
  email: string;
  phone: string;
  address: string;
  hours: string;
};

export type CmsTestimonialItem = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export type AdminCmsData = {
  visibility: CmsSectionVisibility;
  hero: CmsHeroContent;
  featuredProducts: CmsSectionHeading;
  featuredCollections: CmsSectionHeading;
  heritage: CmsHeritageContent;
  educational: CmsEducationalContent;
  testimonials: CmsTestimonialItem[];
  cta: CmsCtaContent;
  about: CmsAboutContent;
  contact: CmsContactContent;
  updatedAt: string;
};
