"use client";

import { useCallback, useMemo, useState } from "react";

import { adminCustomersConfig } from "@/features/admin/customers/admin-customers.config";
import type {
  AdminCustomer,
  AdminCustomerActivity,
  AdminCustomerFormData,
  AdminCustomerSortValue,
  AdminCustomerStatus,
} from "@/types/admin-customer";

function sortCustomers(
  customers: AdminCustomer[],
  sortValue: AdminCustomerSortValue,
): AdminCustomer[] {
  const sorted = [...customers];

  switch (sortValue) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "spend-desc":
      return sorted.sort((a, b) => b.totalSpend - a.totalSpend);
    case "spend-asc":
      return sorted.sort((a, b) => a.totalSpend - b.totalSpend);
    case "orders-desc":
      return sorted.sort((a, b) => b.ordersCount - a.ordersCount);
    case "joined-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
      );
    default:
      return sorted;
  }
}

type UseAdminCustomersOptions = {
  initialCustomers: AdminCustomer[];
};

export function useAdminCustomers({
  initialCustomers,
}: UseAdminCustomersOptions) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminCustomerStatus | "all">(
    "all",
  );
  const [sort, setSort] = useState<AdminCustomerSortValue>(
    adminCustomersConfig.defaultSort,
  );
  const [page, setPage] = useState(1);
  const [drawerCustomerId, setDrawerCustomerId] = useState<string | null>(null);
  const [editorCustomerId, setEditorCustomerId] = useState<string | null>(null);
  const [tagCustomerId, setTagCustomerId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return customers.filter((customer) => {
      if (statusFilter !== "all" && customer.status !== statusFilter) {
        return false;
      }

      if (!normalizedQuery) return true;

      return (
        customer.name.toLowerCase().includes(normalizedQuery) ||
        customer.email.toLowerCase().includes(normalizedQuery) ||
        customer.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery),
        )
      );
    });
  }, [customers, query, statusFilter]);

  const sorted = useMemo(
    () => sortCustomers(filtered, sort),
    [filtered, sort],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / adminCustomersConfig.pageSize),
  );
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * adminCustomersConfig.pageSize;
    return sorted.slice(start, start + adminCustomersConfig.pageSize);
  }, [sorted, currentPage]);

  const drawerCustomer = useMemo(
    () => customers.find((c) => c.id === drawerCustomerId) ?? null,
    [customers, drawerCustomerId],
  );

  const editorCustomer = useMemo(
    () => customers.find((c) => c.id === editorCustomerId) ?? null,
    [customers, editorCustomerId],
  );

  const tagCustomer = useMemo(
    () => customers.find((c) => c.id === tagCustomerId) ?? null,
    [customers, tagCustomerId],
  );

  const openDrawer = useCallback((id: string) => setDrawerCustomerId(id), []);
  const closeDrawer = useCallback(() => setDrawerCustomerId(null), []);
  const openEditor = useCallback((id: string) => setEditorCustomerId(id), []);
  const closeEditor = useCallback(() => setEditorCustomerId(null), []);
  const openTagModal = useCallback((id: string) => setTagCustomerId(id), []);
  const closeTagModal = useCallback(() => setTagCustomerId(null), []);

  const updateCustomer = useCallback(
    (id: string, data: AdminCustomerFormData) => {
      const now = new Date().toISOString();
      const activity: AdminCustomerActivity = {
        id: `act_edit_${Date.now()}`,
        type: "profile",
        label: "Profile Updated",
        description: "Customer details updated by admin",
        timestamp: now,
      };

      setCustomers((current) =>
        current.map((customer) =>
          customer.id === id
            ? {
                ...customer,
                ...data,
                activity: [activity, ...customer.activity],
                updatedAt: now,
              }
            : customer,
        ),
      );
      closeEditor();
    },
    [closeEditor],
  );

  const updateTags = useCallback(
    (id: string, tags: string[]) => {
      const now = new Date().toISOString();
      const activity: AdminCustomerActivity = {
        id: `act_tag_${Date.now()}`,
        type: "tag",
        label: "Tags Updated",
        description: `Tags set to: ${tags.join(", ") || "none"}`,
        timestamp: now,
      };

      setCustomers((current) =>
        current.map((customer) =>
          customer.id === id
            ? {
                ...customer,
                tags,
                status: tags.includes("VIP") ? "vip" : customer.status,
                activity: [activity, ...customer.activity],
                updatedAt: now,
              }
            : customer,
        ),
      );
      closeTagModal();
    },
    [closeTagModal],
  );

  const deactivateCustomer = useCallback((id: string) => {
    const now = new Date().toISOString();
    const activity: AdminCustomerActivity = {
      id: `act_deact_${Date.now()}`,
      type: "profile",
      label: "Deactivation Requested",
      description: "Account deactivation placeholder — API integration pending",
      timestamp: now,
    };

    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: "inactive",
              activity: [activity, ...customer.activity],
              updatedAt: now,
            }
          : customer,
      ),
    );
  }, []);

  return {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    sort,
    setSort,
    page: currentPage,
    setPage,
    totalPages,
    totalFiltered: sorted.length,
    paginated,
    drawerCustomer,
    drawerOpen: drawerCustomerId !== null,
    openDrawer,
    closeDrawer,
    editorCustomer,
    editorOpen: editorCustomerId !== null,
    openEditor,
    closeEditor,
    tagCustomer,
    tagOpen: tagCustomerId !== null,
    openTagModal,
    closeTagModal,
    updateCustomer,
    updateTags,
    deactivateCustomer,
  };
}
