"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { emptyProductForm } from "@/features/admin/products/useAdminProducts";
import { cn } from "@/lib/utils";
import type {
  AdminProduct,
  AdminProductEditorMode,
  AdminProductFormData,
  AdminProductStatus,
} from "@/types/admin-product";

type ProductEditorModalProps = {
  open: boolean;
  mode: AdminProductEditorMode;
  product: AdminProduct | null;
  categories: string[];
  gemstoneTypes: string[];
  onClose: () => void;
  onCreate: (data: AdminProductFormData) => void;
  onUpdate: (id: string, data: AdminProductFormData) => void;
};

function productToForm(product: AdminProduct): AdminProductFormData {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    currency: product.currency,
    images: product.images,
    category: product.category,
    gemstoneType: product.gemstoneType,
    origin: product.origin,
    certification: product.certification,
    benefits: product.benefits ?? "",
    inventory: product.inventory,
    status: product.status,
    visible: product.visible,
  };
}

export function ProductEditorModal({
  open,
  mode,
  product,
  categories,
  gemstoneTypes,
  onClose,
  onCreate,
  onUpdate,
}: ProductEditorModalProps) {
  const readOnly = mode === "view";
  const [form, setForm] = useState<AdminProductFormData>(emptyProductForm());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    if (product && mode !== "create") {
      setForm(productToForm(product));
    } else {
      setForm(emptyProductForm());
    }
    setError(null);
  }, [open, product, mode]);

  const updateField = <K extends keyof AdminProductFormData>(
    key: K,
    value: AdminProductFormData[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = () => {
    if (readOnly) return;

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (form.price <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    const payload: AdminProductFormData = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      origin: form.origin.trim(),
      benefits: form.benefits?.trim(),
      images: form.images[0]
        ? [form.images[0].trim()]
        : ["/images/showcase/gemstone.png"],
    };

    if (mode === "create") {
      onCreate(payload);
      return;
    }

    if (product) {
      onUpdate(product.id, payload);
    }
  };

  const title =
    mode === "create"
      ? "Add Product"
      : mode === "view"
        ? "View Product"
        : "Edit Product";

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="product-name">Name</Label>
            <Input
              id="product-name"
              value={form.name}
              disabled={readOnly}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="product-description">Description</Label>
            <textarea
              id="product-description"
              value={form.description}
              disabled={readOnly}
              rows={4}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              className={cn(
                "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-price">Price (INR)</Label>
            <Input
              id="product-price"
              type="number"
              min={0}
              value={form.price || ""}
              disabled={readOnly}
              onChange={(event) =>
                updateField("price", Number(event.target.value) || 0)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-inventory">Inventory</Label>
            <Input
              id="product-inventory"
              type="number"
              min={0}
              value={form.inventory || ""}
              disabled={readOnly}
              onChange={(event) =>
                updateField("inventory", Number(event.target.value) || 0)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={form.category}
              disabled={readOnly}
              onValueChange={(value) => updateField("category", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gemstone Type</Label>
            <Select
              value={form.gemstoneType}
              disabled={readOnly}
              onValueChange={(value) => updateField("gemstoneType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gemstoneTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-origin">Origin</Label>
            <Input
              id="product-origin"
              value={form.origin}
              disabled={readOnly}
              onChange={(event) => updateField("origin", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-certification">Certification</Label>
            <Input
              id="product-certification"
              value={form.certification}
              disabled={readOnly}
              onChange={(event) =>
                updateField("certification", event.target.value)
              }
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="product-benefits">Benefits</Label>
            <Input
              id="product-benefits"
              value={form.benefits ?? ""}
              disabled={readOnly}
              onChange={(event) => updateField("benefits", event.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="product-image">Image URL</Label>
            <Input
              id="product-image"
              value={form.images[0] ?? ""}
              disabled={readOnly}
              onChange={(event) => updateField("images", [event.target.value])}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              disabled={readOnly}
              onValueChange={(value) =>
                updateField("status", value as AdminProductStatus)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2 pb-2">
            <Checkbox
              id="product-visible"
              checked={form.visible}
              disabled={readOnly}
              onCheckedChange={(checked) =>
                updateField("visible", checked === true)
              }
            />
            <Label htmlFor="product-visible" className="cursor-pointer">
              Visible on storefront
            </Label>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {readOnly ? "Close" : "Cancel"}
          </Button>
          {!readOnly && (
            <Button variant="heritage" onClick={handleSubmit}>
              {mode === "create" ? "Create Product" : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
