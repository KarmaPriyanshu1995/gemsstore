"use client";

import { ShoppingBag } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { OrderDetailDrawer } from "@/features/admin/orders/OrderDetailDrawer";
import { OrderPagination } from "@/features/admin/orders/OrderPagination";
import { OrderStatusModal } from "@/features/admin/orders/OrderStatusModal";
import { OrderTable } from "@/features/admin/orders/OrderTable";
import { OrderToolbar } from "@/features/admin/orders/OrderToolbar";
import { useAdminOrders } from "@/features/admin/orders/useAdminOrders";
import { toast } from "@/lib/toast";
import type { AdminOrder } from "@/types/admin-order";

type AdminOrdersPageProps = {
  initialOrders: AdminOrder[];
};

function printOrder(order: AdminOrder) {
  const printWindow = window.open("", "_blank", "width=800,height=600");
  if (!printWindow) {
    toast.error("Unable to open print window");
    return;
  }

  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr><td>${item.name}</td><td>${item.sku}</td><td>${item.quantity}</td><td>₹${(item.price * item.quantity).toLocaleString("en-IN")}</td></tr>`,
    )
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html><head><title>${order.orderNumber}</title>
    <style>
      body { font-family: Georgia, serif; padding: 40px; color: #5B4636; }
      h1 { color: #0F7B5F; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border-bottom: 1px solid #D7C6A3; padding: 8px; text-align: left; }
      .meta { color: #888; font-size: 14px; }
    </style></head><body>
    <h1>RealGemsStore — Order Summary</h1>
    <p class="meta">${order.orderNumber} · ${order.customerName}</p>
    <p><strong>Status:</strong> ${order.status} · <strong>Payment:</strong> ${order.paymentStatus}</p>
    <p><strong>Total:</strong> ₹${order.amount.toLocaleString("en-IN")}</p>
    <table><thead><tr><th>Product</th><th>SKU</th><th>Qty</th><th>Amount</th></tr></thead>
    <tbody>${itemsHtml}</tbody></table>
    <p style="margin-top:24px;font-size:12px;color:#888;">Maharaja Heritage · Confidential</p>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export function AdminOrdersPage({ initialOrders }: AdminOrdersPageProps) {
  const admin = useAdminOrders({ initialOrders });

  const handleUpdateStatus = (id: string, status: AdminOrder["status"]) => {
    admin.updateStatus(id, status);
    toast.success("Order status updated");
  };

  const handleRefund = (order: AdminOrder) => {
    toast.info(
      `Refund workflow for ${order.orderNumber} — integration coming soon`,
    );
  };

  return (
    <div className="space-y-6">
      <OrderToolbar
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
        paymentFilter={admin.paymentFilter}
        onPaymentFilterChange={(value) => {
          admin.setPaymentFilter(value);
          admin.setPage(1);
        }}
        sort={admin.sort}
        onSortChange={(value) => {
          admin.setSort(value);
          admin.setPage(1);
        }}
        totalFiltered={admin.totalFiltered}
      />

      {admin.paginated.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders found"
          description="Adjust your search or filters to find concierge transactions."
        />
      ) : (
        <>
          <OrderTable
            orders={admin.paginated}
            onView={admin.openDrawer}
            onUpdateStatus={admin.openStatusModal}
            onPrint={printOrder}
            onRefund={handleRefund}
          />
          <OrderPagination
            page={admin.page}
            totalPages={admin.totalPages}
            onPageChange={admin.setPage}
          />
        </>
      )}

      <OrderDetailDrawer
        order={admin.drawerOrder}
        open={admin.drawerOpen}
        onClose={admin.closeDrawer}
        onUpdateStatus={admin.openStatusModal}
        onPrint={printOrder}
        onRefund={handleRefund}
      />

      <OrderStatusModal
        order={admin.statusModalOrder}
        open={admin.statusModalOpen}
        onClose={admin.closeStatusModal}
        onUpdate={(id, status) => handleUpdateStatus(id, status)}
      />
    </div>
  );
}
