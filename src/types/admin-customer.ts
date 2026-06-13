export type AdminCustomerStatus = "active" | "inactive" | "vip";

export type AdminCustomerAddress = {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type AdminCustomerWishlistItem = {
  id: string;
  productName: string;
  price: number;
  image: string;
  addedAt: string;
};

export type AdminCustomerOrderSummary = {
  id: string;
  orderNumber: string;
  amount: number;
  status: string;
  date: string;
};

export type AdminCustomerActivity = {
  id: string;
  type: "order" | "wishlist" | "profile" | "tag" | "login";
  label: string;
  description: string;
  timestamp: string;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpend: number;
  currency: string;
  status: AdminCustomerStatus;
  tags: string[];
  addresses: AdminCustomerAddress[];
  orders: AdminCustomerOrderSummary[];
  wishlist: AdminCustomerWishlistItem[];
  activity: AdminCustomerActivity[];
  notes?: string;
  joinedAt: string;
  updatedAt: string;
};

export type AdminCustomerSortValue =
  | "name-asc"
  | "name-desc"
  | "spend-desc"
  | "spend-asc"
  | "orders-desc"
  | "joined-desc";

export type AdminCustomerFormData = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: AdminCustomerStatus;
};
