import { AdminProductsPage } from "@/features/admin/products";
import {
  getAdminProductOptions,
  getAdminProducts,
} from "@/services/admin-products.service";

export default async function AdminProductsRoute() {
  const [productsResponse, optionsResponse] = await Promise.all([
    getAdminProducts(),
    getAdminProductOptions(),
  ]);

  return (
    <AdminProductsPage
      initialProducts={productsResponse.data}
      categories={optionsResponse.data.categories}
      gemstoneTypes={optionsResponse.data.gemstoneTypes}
    />
  );
}
