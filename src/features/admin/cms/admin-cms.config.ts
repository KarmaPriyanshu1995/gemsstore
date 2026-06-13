import type { CmsSectionKey } from "@/types/admin-cms";

export const adminCmsConfig = {
  sections: [
    { key: "hero" as const, label: "Hero", group: "Homepage" },
    {
      key: "featuredCollections" as const,
      label: "Featured Collections",
      group: "Homepage",
    },
    {
      key: "featuredProducts" as const,
      label: "Featured Products",
      group: "Homepage",
    },
    { key: "heritage" as const, label: "Heritage", group: "Homepage" },
    {
      key: "educational" as const,
      label: "Educational Content",
      group: "Homepage",
    },
    { key: "testimonials" as const, label: "Testimonials", group: "Homepage" },
    { key: "cta" as const, label: "CTA Banner", group: "Homepage" },
    { key: "visibility" as const, label: "Section Visibility", group: "Settings" },
    { key: "about" as const, label: "About Page", group: "Pages" },
    { key: "contact" as const, label: "Contact Info", group: "Pages" },
  ] satisfies { key: CmsSectionKey; label: string; group: string }[],
} as const;
