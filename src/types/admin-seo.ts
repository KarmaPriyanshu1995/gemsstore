export type SeoPageKey =
  | "home"
  | "products"
  | "collections"
  | "about"
  | "contact";

export type SeoTwitterCardType = "summary" | "summary_large_image";

export type SeoOpenGraph = {
  title: string;
  description: string;
  image: string;
  type: string;
};

export type SeoTwitterCard = {
  card: SeoTwitterCardType;
  title: string;
  description: string;
  image: string;
};

export type SeoSchemaConfig = {
  enabled: boolean;
  type: "Organization" | "WebSite" | "Product";
  name: string;
  description: string;
};

export type SeoPageConfig = {
  pageKey: SeoPageKey;
  pageLabel: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  openGraph: SeoOpenGraph;
  twitter: SeoTwitterCard;
  schema: SeoSchemaConfig;
  noIndex: boolean;
  updatedAt: string;
};

export type AdminSeoData = {
  siteUrl: string;
  pages: SeoPageConfig[];
};

export type SeoValidationResult = {
  field: string;
  status: "good" | "warning" | "error";
  message: string;
};
