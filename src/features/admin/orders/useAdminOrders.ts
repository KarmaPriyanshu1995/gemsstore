"use client";

import { useCallback, useMemo, useState } from "react";

import { adminOrdersConfig } from "@/features/admin/orders/admin-orders.config";
import type {
  AdminOrder,
  AdminOrderSortValue,
  AdminOrderStatus,
  AdminPaymentStatus,
} from "@/types/admin-order";

function sortOrders(
  orders: AdminOrder[],
  sortValue: AdminOrderSortValue,
): AdminOrder[] {
  const [field, direction] = sortValue.split("-") as [
    "date" | "amount" | "customer",
    "asc" | "desc",
  ];

  return [...orders].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case "date":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "amount":
        comparison = a.amount - b.amount;
        break;
      case "customer":
        comparison = a.customerName.localeCompare(b.customerName);
        break;
    }

    return direction === "asc" ? comparison : -comparison;
  });
}

const statusDescriptions: Record<AdminOrderStatus, string> = {
  pending: "Order received and awaiting concierge review.",
  processing: "Gemologist verification and packaging in progress.",
  shipped: "Insured courier dispatched with white-glove delivery.",
  delivered: "Signed delivery confirmed by recipient.",
  cancelled: "Order cancelled.",
};

type UseAdminOrdersOptions = {
  initialOrders: AdminOrder[];
};

export function useAdminOrders({ initialOrders }: UseAdminOrdersOptions) {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminOrderStatus | "all">(
    "all",
  );
  const [paymentFilter, setPaymentFilter] = useState<
    AdminPaymentStatus | "all"
  >("all");
  const [sort, setSort] = useState<AdminOrderSortValue>(
    adminOrdersConfig.defaultSort,
  );
  const [page, setPage] = useState(1);
  const [drawerOrderId, setDrawerOrderId] = useState<string | null>(null);
  const [statusModalOrderId, setStatusModalOrderId] = useState<string | null>(
    null,
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (paymentFilter !== "all" && order.paymentStatus !== paymentFilter) {
        return false;
      }

      if (!normalizedQuery) return true;

      return (
        order.orderNumber.toLowerCase().includes(normalizedQuery) ||
        order.customerName.toLowerCase().includes(normalizedQuery) ||
        order.customerEmail.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [orders, query, statusFilter, paymentFilter]);

  const sorted = useMemo(() => sortOrders(filtered, sort), [filtered, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / adminOrdersConfig.pageSize),
  );
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * adminOrdersConfig.pageSize;
    return sorted.slice(start, start + adminOrdersConfig.pageSize);
  }, [sorted, currentPage]);

  const drawerOrder = useMemo(
    () => orders.find((order) => order.id === drawerOrderId) ?? null,
    [orders, drawerOrderId],
  );

  const statusModalOrder = useMemo(
    () => orders.find((order) => order.id === statusModalOrderId) ?? null,
    [orders, statusModalOrderId],
  );

  const openDrawer = useCallback((id: string) => setDrawerOrderId(id), []);
  const closeDrawer = useCallback(() => setDrawerOrderId(null), []);

  const openStatusModal = useCallback(
    (id: string) => setStatusModalOrderId(id),
    [],
  );
  const closeStatusModal = useCallback(() => setStatusModalOrderId(null), []);

  const updateStatus = useCallback(
    (id: string, status: AdminOrderStatus) => {
      const now = new Date().toISOString();

      setOrders((current) =>
        current.map((order) => {
          if (order.id !== id) return order;

          const hasEvent = order.timeline.some((event) => event.status === status);
          const timeline = hasEvent
            ? order.timeline
            : [
                ...order.timeline,
                {
                  id: `tl_${status}_${Date.now()}`,
                  status,
                  label: adminOrdersConfig.statusLabels[status],
                  description: statusDescriptions[status],
                  timestamp: now,
                },
              ];

          const paymentStatus: AdminPaymentStatus =
            status === "cancelled" ? "refunded" : order.paymentStatus;

          return {
            ...order,
            status,
            paymentStatus,
            timeline,
            updatedAt: now,
          };
        }),
      );

      closeStatusModal();
    },
    [closeStatusModal],
  );

  return {
    orders,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    sort,
    setSort,
    page: currentPage,
    setPage,
    totalPages,
    totalFiltered: sorted.length,
    paginated,
    drawerOrder,
    drawerOpen: drawerOrderId !== null,
    openDrawer,
    closeDrawer,
    statusModalOrder,
    statusModalOpen: statusModalOrderId !== null,
    openStatusModal,
    closeStatusModal,
    updateStatus,
  };
}
