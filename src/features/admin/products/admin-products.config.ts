export const adminProductsConfig = {
  pageSize: 8,
  sortOptions: [
    { value: "updatedAt-desc" as const, label: "Recently Updated" },
    { value: "name-asc" as const, label: "Name A–Z" },
    { value: "name-desc" as const, label: "Name Z–A" },
    { value: "price-asc" as const, label: "Price Low–High" },
    { value: "price-desc" as const, label: "Price High–Low" },
    { value: "inventory-asc" as const, label: "Inventory Low–High" },
    { value: "inventory-desc" as const, label: "Inventory High–Low" },
  ],
  defaultSort: "updatedAt-desc" as const,
} as const;

export type AdminProductSortValue =
  (typeof adminProductsConfig.sortOptions)[number]["value"];
