"use client";

import { Gem } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { ProductEditorModal } from "@/features/admin/products/ProductEditorModal";
import { ProductPagination } from "@/features/admin/products/ProductPagination";
import { ProductTable } from "@/features/admin/products/ProductTable";
import { ProductToolbar } from "@/features/admin/products/ProductToolbar";
import { useAdminProducts } from "@/features/admin/products/useAdminProducts";
import { toast } from "@/lib/toast";
import type { AdminProduct, AdminProductFormData } from "@/types/admin-product";

type AdminProductsPageProps = {
  initialProducts: AdminProduct[];
  categories: string[];
  gemstoneTypes: string[];
};

export function AdminProductsPage({
  initialProducts,
  categories,
  gemstoneTypes,
}: AdminProductsPageProps) {
  const admin = useAdminProducts({ initialProducts });

  const handleCreate = (data: AdminProductFormData) => {
    admin.createProduct(data);
    toast.success("Product created");
  };

  const handleUpdate = (id: string, data: AdminProductFormData) => {
    admin.updateProduct(id, data);
    toast.success("Product updated");
  };

  const handleDelete = (id: string) => {
    admin.deleteProduct(id);
    toast.success("Product deleted");
  };

  const handleDuplicate = (id: string) => {
    admin.duplicateProduct(id);
    toast.success("Product duplicated");
  };

  const handleArchive = (id: string) => {
    admin.archiveProduct(id);
    toast.success("Product archived");
  };

  const handleBulkArchive = () => {
    admin.bulkArchive();
    toast.success(`${admin.selectedCount} products archived`);
  };

  const handleBulkDelete = () => {
    admin.bulkDelete();
    toast.success("Selected products deleted");
  };

  return (
    <div className="space-y-6">
      <ProductToolbar
        query={admin.query}
        onQueryChange={(value) => {
          admin.setQuery(value);
          admin.setPage(1);
        }}
        statusFilter={admin.statusFilter}
        onStatusFilterChange={(value) => {
          admin.setStatusFilter(value);
          admin.setPage(1);
        }}
        categoryFilter={admin.categoryFilter}
        onCategoryFilterChange={(value) => {
          admin.setCategoryFilter(value);
          admin.setPage(1);
        }}
        sort={admin.sort}
        onSortChange={(value) => {
          admin.setSort(value);
          admin.setPage(1);
        }}
        categories={categories}
        totalFiltered={admin.totalFiltered}
        selectedCount={admin.selectedCount}
        onCreate={admin.openCreate}
        onBulkArchive={handleBulkArchive}
        onBulkDelete={handleBulkDelete}
        onClearSelection={admin.clearSelection}
      />

      {admin.paginated.length === 0 ? (
        <EmptyState
          icon={Gem}
          title="No products found"
          description="Adjust your search or filters, or add a new heritage piece."
          actionLabel="Add Product"
          onAction={admin.openCreate}
        />
      ) : (
        <>
          <ProductTable
            products={admin.paginated}
            selectedIds={admin.selectedIds}
            onToggleSelect={admin.toggleSelect}
            onToggleSelectAll={admin.toggleSelectAll}
            onView={admin.openView}
            onEdit={admin.openEdit}
            onDuplicate={handleDuplicate}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
          <ProductPagination
            page={admin.page}
            totalPages={admin.totalPages}
            onPageChange={admin.setPage}
          />
        </>
      )}

      <ProductEditorModal
        open={admin.editorOpen}
        mode={admin.editorMode}
        product={admin.editingProduct}
        categories={categories}
        gemstoneTypes={gemstoneTypes}
        onClose={admin.closeEditor}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
