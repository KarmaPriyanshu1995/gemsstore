export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};
