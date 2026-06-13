export const adminOrdersConfig = {
  pageSize: 8,
  defaultSort: "date-desc" as const,
  sortOptions: [
    { value: "date-desc" as const, label: "Newest First" },
    { value: "date-asc" as const, label: "Oldest First" },
    { value: "amount-desc" as const, label: "Amount High–Low" },
    { value: "amount-asc" as const, label: "Amount Low–High" },
    { value: "customer-asc" as const, label: "Customer A–Z" },
    { value: "customer-desc" as const, label: "Customer Z–A" },
  ],
  statusOptions: [
    { value: "pending" as const, label: "Pending" },
    { value: "processing" as const, label: "Processing" },
    { value: "shipped" as const, label: "Shipped" },
    { value: "delivered" as const, label: "Delivered" },
    { value: "cancelled" as const, label: "Cancelled" },
  ],
  statusLabels: {
    pending: "Order Placed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  } as const,
} as const;
