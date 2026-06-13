"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type {
  AdminCustomer,
  AdminCustomerFormData,
  AdminCustomerStatus,
} from "@/types/admin-customer";

type CustomerEditorModalProps = {
  customer: AdminCustomer | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, data: AdminCustomerFormData) => void;
};

function customerToForm(customer: AdminCustomer): AdminCustomerFormData {
  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    notes: customer.notes ?? "",
    status: customer.status,
  };
}

export function CustomerEditorModal({
  customer,
  open,
  onClose,
  onSave,
}: CustomerEditorModalProps) {
  const [form, setForm] = useState<AdminCustomerFormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
    status: "active",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customer && open) {
      setForm(customerToForm(customer));
      setError(null);
    }
  }, [customer, open]);

  if (!customer) return null;

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    onSave(customer.id, {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes?.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="cust-name">Name</Label>
            <Input
              id="cust-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cust-email">Email</Label>
            <Input
              id="cust-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cust-phone">Phone</Label>
            <Input
              id="cust-phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((f) => ({
                  ...f,
                  status: value as AdminCustomerStatus,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cust-notes">Notes</Label>
            <textarea
              id="cust-notes"
              value={form.notes ?? ""}
              rows={3}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className={cn(
                "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="heritage" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
