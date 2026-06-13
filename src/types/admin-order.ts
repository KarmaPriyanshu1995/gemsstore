export type AdminOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type AdminPaymentStatus = "paid" | "pending" | "refunded";

export type AdminOrderLineItem = {
  id: string;
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
};

export type AdminOrderAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type AdminOrderTimelineEvent = {
  id: string;
  status: AdminOrderStatus | "refund_requested";
  label: string;
  description: string;
  timestamp: string;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: AdminOrderStatus;
  paymentStatus: AdminPaymentStatus;
  items: AdminOrderLineItem[];
  shipping: AdminOrderAddress;
  billing: AdminOrderAddress;
  timeline: AdminOrderTimelineEvent[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminOrderSortField = "date" | "amount" | "customer";

export type AdminOrderSortValue =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "customer-asc"
  | "customer-desc";
