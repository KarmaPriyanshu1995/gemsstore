import { Badge } from "@/components/ui/badge";
import { AdminCard } from "@/features/admin/layout/admin-card";
import type { AdminRecentOrder } from "@/types/admin";
import { formatCurrency } from "@/utils/format-currency";

type RecentOrdersTableProps = {
  orders: AdminRecentOrder[];
};

const statusVariant: Record<
  AdminRecentOrder["status"],
  "default" | "secondary" | "accent" | "outline" | "destructive"
> = {
  pending: "outline",
  processing: "secondary",
  shipped: "accent",
  delivered: "default",
  cancelled: "destructive",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <AdminCard>
      <div className="border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
        <h2 className="font-heading text-xl font-semibold">Recent Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Latest concierge transactions
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(199,164,90,0.15)] text-muted-foreground">
              <th className="px-6 py-3 font-medium" scope="col">
                Order
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Customer
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Date
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Amount
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Status
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[rgba(199,164,90,0.08)] last:border-0"
              >
                <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4 font-medium">
                  {formatCurrency(order.amount, order.currency)}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariant[order.status]}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 capitalize text-muted-foreground">
                  {order.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
