"use client";

import { Users } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { CustomerEditorModal } from "@/features/admin/customers/CustomerEditorModal";
import { CustomerPagination } from "@/features/admin/customers/CustomerPagination";
import { CustomerProfileDrawer } from "@/features/admin/customers/CustomerProfileDrawer";
import { CustomerTable } from "@/features/admin/customers/CustomerTable";
import { CustomerTagModal } from "@/features/admin/customers/CustomerTagModal";
import { CustomerToolbar } from "@/features/admin/customers/CustomerToolbar";
import { useAdminCustomers } from "@/features/admin/customers/useAdminCustomers";
import { toast } from "@/lib/toast";
import type { AdminCustomer } from "@/types/admin-customer";

type AdminCustomersPageProps = {
  initialCustomers: AdminCustomer[];
};

export function AdminCustomersPage({
  initialCustomers,
}: AdminCustomersPageProps) {
  const admin = useAdminCustomers({ initialCustomers });

  const handleDeactivate = (id: string) => {
    admin.deactivateCustomer(id);
    toast.info("Deactivation recorded — API integration coming soon");
  };

  return (
    <div className="space-y-6">
      <CustomerToolbar
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
        sort={admin.sort}
        onSortChange={(value) => {
          admin.setSort(value);
          admin.setPage(1);
        }}
        totalFiltered={admin.totalFiltered}
      />

      {admin.paginated.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No customers found"
          description="Adjust your search or filters to find clientele profiles."
        />
      ) : (
        <>
          <CustomerTable
            customers={admin.paginated}
            onView={admin.openDrawer}
            onEdit={admin.openEditor}
            onTag={admin.openTagModal}
            onDeactivate={handleDeactivate}
          />
          <CustomerPagination
            page={admin.page}
            totalPages={admin.totalPages}
            onPageChange={admin.setPage}
          />
        </>
      )}

      <CustomerProfileDrawer
        customer={admin.drawerCustomer}
        open={admin.drawerOpen}
        onClose={admin.closeDrawer}
        onEdit={admin.openEditor}
        onTag={admin.openTagModal}
        onDeactivate={handleDeactivate}
      />

      <CustomerEditorModal
        customer={admin.editorCustomer}
        open={admin.editorOpen}
        onClose={admin.closeEditor}
        onSave={(id, data) => {
          admin.updateCustomer(id, data);
          toast.success("Customer updated");
        }}
      />

      <CustomerTagModal
        customer={admin.tagCustomer}
        open={admin.tagOpen}
        onClose={admin.closeTagModal}
        onSave={(id, tags) => {
          admin.updateTags(id, tags);
          toast.success("Tags updated");
        }}
      />
    </div>
  );
}
