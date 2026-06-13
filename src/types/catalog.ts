export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  gemstoneType: string;
  origin: string;
  birthMonth?: string;
  zodiac?: string;
  certification: string;
  color: string;
  benefits?: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
  featured: boolean;
};

export type CollectionDetailData = {
  collection: Collection;
  products: Product[];
};

export type Gemstone = {
  id: string;
  name: string;
  slug: string;
  description: string;
  origin: string;
  benefits: string;
  certification: string;
  glowColor: string;
  priceFrom: number;
  image: string;
  visible: boolean;
  sortOrder: number;
};
