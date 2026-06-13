import type { SeoPageKey } from "@/types/admin-seo";

export const adminSeoConfig = {
  titleMin: 30,
  titleMax: 60,
  descriptionMin: 120,
  descriptionMax: 160,
  pages: [
    { key: "home" as const, label: "Home" },
    { key: "products" as const, label: "Shop / Products" },
    { key: "collections" as const, label: "Collections" },
    { key: "about" as const, label: "About" },
    { key: "contact" as const, label: "Contact" },
  ] satisfies { key: SeoPageKey; label: string }[],
  schemaTypes: ["Organization", "WebSite", "Product"] as const,
  ogTypes: ["website", "article", "product"] as const,
  twitterCardTypes: [
    { value: "summary" as const, label: "Summary" },
    { value: "summary_large_image" as const, label: "Large Image" },
  ],
} as const;
