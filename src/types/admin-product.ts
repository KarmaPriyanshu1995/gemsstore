export type AdminProductStatus = "active" | "draft" | "archived";

export type AdminProduct = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  gemstoneType: string;
  origin: string;
  certification: string;
  benefits?: string;
  inventory: number;
  status: AdminProductStatus;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminProductSortField =
  | "name"
  | "price"
  | "inventory"
  | "updatedAt";

export type AdminProductEditorMode = "create" | "edit" | "view";

export type AdminProductFormData = Omit<
  AdminProduct,
  "id" | "sku" | "slug" | "createdAt" | "updatedAt"
>;
