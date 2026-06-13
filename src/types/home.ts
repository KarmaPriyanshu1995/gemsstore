export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export type HomePageData = {
  featuredProducts: import("@/types/catalog").Product[];
  featuredCollections: import("@/types/catalog").Collection[];
  testimonials: Testimonial[];
};
