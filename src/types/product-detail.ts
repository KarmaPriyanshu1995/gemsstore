import type { Product } from "@/types/catalog";

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type ProductFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ProductDetailData = {
  product: Product;
  gallery: string[];
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  faqs: ProductFaq[];
  relatedProducts: Product[];
};

export type RecentlyViewedItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  viewedAt: string;
};
