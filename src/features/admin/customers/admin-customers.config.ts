export const adminCustomersConfig = {
  pageSize: 8,
  defaultSort: "spend-desc" as const,
  sortOptions: [
    { value: "spend-desc" as const, label: "Highest Spend" },
    { value: "spend-asc" as const, label: "Lowest Spend" },
    { value: "orders-desc" as const, label: "Most Orders" },
    { value: "name-asc" as const, label: "Name A–Z" },
    { value: "name-desc" as const, label: "Name Z–A" },
    { value: "joined-desc" as const, label: "Newest Members" },
  ],
  tagOptions: [
    "VIP",
    "High Value",
    "New Client",
    "Repeat Buyer",
    "Emerald Lover",
    "Ruby",
    "Sapphire",
    "Diamond Collector",
    "Heritage Collector",
  ],
} as const;
