import type { Collection } from "@/types/catalog";

export const mockCollections: Collection[] = [
  {
    id: "col_001",
    slug: "maharaja-heritage",
    name: "Maharaja Heritage",
    description: "Curated pieces inspired by royal Indian gemstone traditions.",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800",
    productIds: ["prod_001", "prod_002"],
    featured: true,
  },
  {
    id: "col_002",
    slug: "circle-of-gems",
    name: "Circle of Gems",
    description: "The signature RealGemsStore experience collection.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    productIds: ["prod_001", "prod_003"],
    featured: true,
  },
];
