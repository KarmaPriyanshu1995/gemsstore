import { mockProducts } from "@/mock/products";
import type { AdminProduct } from "@/types/admin-product";

const inventoryById: Record<string, number> = {
  prod_001: 12,
  prod_002: 8,
  prod_003: 0,
  prod_004: 3,
  prod_005: 15,
  prod_006: 6,
  prod_007: 4,
  prod_008: 9,
  prod_009: 2,
  prod_010: 0,
  prod_011: 11,
  prod_012: 7,
};

const statusById: Record<string, AdminProduct["status"]> = {
  prod_003: "archived",
  prod_010: "draft",
};

function toSku(id: string) {
  const suffix = id.replace("prod_", "").toUpperCase().padStart(4, "0");
  return `RG-${suffix}`;
}

export const mockAdminProducts: AdminProduct[] = mockProducts.map((product) => ({
  id: product.id,
  sku: toSku(product.id),
  slug: product.slug,
  name: product.name,
  description: product.description,
  price: product.price,
  currency: product.currency,
  images: product.images,
  category: product.category,
  gemstoneType: product.gemstoneType,
  origin: product.origin,
  certification: product.certification,
  benefits: product.benefits,
  inventory: inventoryById[product.id] ?? 5,
  status: statusById[product.id] ?? "active",
  visible: product.inStock && statusById[product.id] !== "archived",
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
}));

export const adminProductCategories = [
  "rings",
  "pendants",
  "earrings",
  "necklaces",
  "bracelets",
  "brooches",
] as const;

export const adminGemstoneTypes = [
  "emerald",
  "ruby",
  "sapphire",
  "diamond",
  "amethyst",
] as const;
