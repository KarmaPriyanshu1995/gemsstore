"use client";

import { useCallback, useMemo, useState } from "react";

import {
  adminProductsConfig,
  type AdminProductSortValue,
} from "@/features/admin/products/admin-products.config";
import type {
  AdminProduct,
  AdminProductEditorMode,
  AdminProductFormData,
  AdminProductStatus,
} from "@/types/admin-product";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nextId(products: AdminProduct[]) {
  const max = products.reduce((acc, product) => {
    const num = Number(product.id.replace("prod_", ""));
    return Number.isFinite(num) ? Math.max(acc, num) : acc;
  }, 0);
  return `prod_${String(max + 1).padStart(3, "0")}`;
}

function nextSku(products: AdminProduct[]) {
  const max = products.reduce((acc, product) => {
    const num = Number(product.sku.replace("RG-", ""));
    return Number.isFinite(num) ? Math.max(acc, num) : acc;
  }, 0);
  return `RG-${String(max + 1).padStart(4, "0")}`;
}

function sortProducts(
  products: AdminProduct[],
  sortValue: AdminProductSortValue,
): AdminProduct[] {
  const [field, direction] = sortValue.split("-") as [
    "name" | "price" | "inventory" | "updatedAt",
    "asc" | "desc",
  ];

  return [...products].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "inventory":
        comparison = a.inventory - b.inventory;
        break;
      case "updatedAt":
        comparison =
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
    }

    return direction === "asc" ? comparison : -comparison;
  });
}

export const emptyProductForm = (): AdminProductFormData => ({
  name: "",
  description: "",
  price: 0,
  currency: "INR",
  images: ["/images/showcase/gemstone.png"],
  category: "rings",
  gemstoneType: "emerald",
  origin: "",
  certification: "GIA Certified",
  benefits: "",
  inventory: 0,
  status: "draft",
  visible: false,
});

type UseAdminProductsOptions = {
  initialProducts: AdminProduct[];
};

export function useAdminProducts({ initialProducts }: UseAdminProductsOptions) {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminProductStatus | "all">(
    "all",
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState<AdminProductSortValue>(
    adminProductsConfig.defaultSort,
  );
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<AdminProductEditorMode>("edit");
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null,
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      if (statusFilter !== "all" && product.status !== statusFilter) {
        return false;
      }

      if (categoryFilter !== "all" && product.category !== categoryFilter) {
        return false;
      }

      if (!normalizedQuery) return true;

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery) ||
        product.gemstoneType.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [products, query, statusFilter, categoryFilter]);

  const sorted = useMemo(
    () => sortProducts(filtered, sort),
    [filtered, sort],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / adminProductsConfig.pageSize),
  );
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * adminProductsConfig.pageSize;
    return sorted.slice(start, start + adminProductsConfig.pageSize);
  }, [sorted, currentPage]);

  const openCreate = useCallback(() => {
    setEditingProduct(null);
    setEditorMode("create");
    setEditorOpen(true);
  }, []);

  const openView = useCallback((product: AdminProduct) => {
    setEditingProduct(product);
    setEditorMode("view");
    setEditorOpen(true);
  }, []);

  const openEdit = useCallback((product: AdminProduct) => {
    setEditingProduct(product);
    setEditorMode("edit");
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditingProduct(null);
  }, []);

  const createProduct = useCallback((data: AdminProductFormData) => {
    const now = new Date().toISOString();

    setProducts((current) => {
      const id = nextId(current);
      const sku = nextSku(current);
      const product: AdminProduct = {
        id,
        sku,
        slug: slugify(data.name) || `product-${id}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      return [product, ...current];
    });

    setPage(1);
    closeEditor();
  }, [closeEditor]);

  const updateProduct = useCallback(
    (id: string, data: AdminProductFormData) => {
      setProducts((current) =>
        current.map((product) =>
          product.id === id
            ? {
                ...product,
                ...data,
                slug: slugify(data.name) || product.slug,
                updatedAt: new Date().toISOString(),
              }
            : product,
        ),
      );
      closeEditor();
    },
    [closeEditor],
  );

  const deleteProduct = useCallback((id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
    setSelectedIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const duplicateProduct = useCallback((id: string) => {
    setProducts((current) => {
      const source = current.find((product) => product.id === id);
      if (!source) return current;

      const newId = nextId(current);
      const now = new Date().toISOString();
      const duplicate: AdminProduct = {
        ...source,
        id: newId,
        sku: nextSku(current),
        slug: `${source.slug}-copy`,
        name: `${source.name} (Copy)`,
        status: "draft",
        visible: false,
        createdAt: now,
        updatedAt: now,
      };

      return [duplicate, ...current];
    });
    setPage(1);
  }, []);

  const archiveProduct = useCallback((id: string) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              status: "archived",
              visible: false,
              updatedAt: new Date().toISOString(),
            }
          : product,
      ),
    );
  }, []);

  const bulkArchive = useCallback(() => {
    setProducts((current) =>
      current.map((product) =>
        selectedIds.has(product.id)
          ? {
              ...product,
              status: "archived",
              visible: false,
              updatedAt: new Date().toISOString(),
            }
          : product,
      ),
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const bulkDelete = useCallback(() => {
    setProducts((current) =>
      current.filter((product) => !selectedIds.has(product.id)),
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((current) => {
      const pageIds = paginated.map((product) => product.id);
      const allSelected = pageIds.every((id) => current.has(id));

      if (allSelected) {
        const next = new Set(current);
        pageIds.forEach((id) => next.delete(id));
        return next;
      }

      return new Set([...current, ...pageIds]);
    });
  }, [paginated]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  return {
    products,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sort,
    setSort,
    page: currentPage,
    setPage,
    totalPages,
    totalFiltered: sorted.length,
    paginated,
    selectedIds,
    selectedCount: selectedIds.size,
    editorOpen,
    editorMode,
    editingProduct,
    openCreate,
    openView,
    openEdit,
    closeEditor,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    archiveProduct,
    bulkArchive,
    bulkDelete,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
  };
}
