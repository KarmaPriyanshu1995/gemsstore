export type AccountTab =
  | "profile"
  | "addresses"
  | "orders"
  | "wishlist"
  | "settings";

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
};

export type UserAddress = {
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

export type UserOrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type UserOrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  currency: string;
};

export type UserOrder = {
  id: string;
  orderNumber: string;
  total: number;
  currency: string;
  status: UserOrderStatus;
  itemCount: number;
  items: UserOrderItem[];
  paidAt: string;
  estimatedDelivery?: string;
  paymentMethod?: string;
  shippingSummary?: string;
};

export type UserSettings = {
  orderUpdates: boolean;
  marketingEmails: boolean;
  smsAlerts: boolean;
};

export type UserAccount = {
  profile: UserProfile;
  addresses: UserAddress[];
  orders: UserOrder[];
  settings: UserSettings;
};

export type UserProfileForm = Pick<UserProfile, "name" | "email" | "phone">;
