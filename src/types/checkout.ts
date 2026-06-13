export type CheckoutAddress = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CheckoutDeliveryMethod = "standard" | "express" | "white-glove";

export type CheckoutDelivery = {
  method: CheckoutDeliveryMethod;
  instructions: string;
};

export type CheckoutFormData = {
  shipping: CheckoutAddress;
  billing: CheckoutAddress;
  sameAsShipping: boolean;
  delivery: CheckoutDelivery;
};

export type CheckoutSession = {
  form: CheckoutFormData;
  subtotal: number;
  discount: number;
  shipping: number;
  deliveryFee: number;
  total: number;
  couponCode: string | null;
  itemCount: number;
  completedAt: string;
};
