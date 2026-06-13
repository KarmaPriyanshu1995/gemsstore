"use client";

import Image from "next/image";
import {
  Archive,
  Copy,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "@/types/admin-product";
import { formatCurrency } from "@/utils/format-currency";

type ProductTableProps = {
  products: AdminProduct[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onView: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
};

const statusVariant: Record<
  AdminProduct["status"],
  "default" | "secondary" | "outline"
> = {
  active: "default",
  draft: "secondary",
  archived: "outline",
};

function RowActions({
  product,
  onView,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
}: {
  product: AdminProduct;
  onView: (product: AdminProduct) => void;
  onEdit: (product: AdminProduct) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <div className="hidden items-center gap-1 md:flex">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onView(product)}
          aria-label={`View ${product.name}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onDuplicate(product.id)}
          aria-label={`Duplicate ${product.name}`}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onArchive(product.id)}
          aria-label={`Archive ${product.name}`}
        >
          <Archive className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => setConfirmDelete(true)}
          aria-label={`Delete ${product.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={() => setOpen(true)}
        aria-label={`Actions for ${product.name}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>Choose an action</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => { onView(product); setOpen(false); }}>
              View
            </Button>
            <Button variant="outline" onClick={() => { onEdit(product); setOpen(false); }}>
              Edit
            </Button>
            <Button variant="outline" onClick={() => { onDuplicate(product.id); setOpen(false); }}>
              Duplicate
            </Button>
            <Button variant="outline" onClick={() => { onArchive(product.id); setOpen(false); }}>
              Archive
            </Button>
            <Button
              variant="destructive"
              onClick={() => { setOpen(false); setConfirmDelete(true); }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              This will permanently remove {product.name} from the catalog. This
              action cannot be undone in this session.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(product.id);
                setConfirmDelete(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductTable({
  products,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onView,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
}: ProductTableProps) {
  const allPageSelected =
    products.length > 0 && products.every((product) => selectedIds.has(product.id));

  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 text-muted-foreground">
              <th className="w-12 px-4 py-3" scope="col">
                <Checkbox
                  checked={allPageSelected}
                  onCheckedChange={onToggleSelectAll}
                  aria-label="Select all products on this page"
                />
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Product
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                SKU
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Category
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Price
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Inventory
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Status
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={cn(
                  "border-b border-[rgba(199,164,90,0.08)] last:border-0",
                  selectedIds.has(product.id) && "bg-emerald/5",
                )}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.has(product.id)}
                    onCheckedChange={() => onToggleSelect(product.id)}
                    aria-label={`Select ${product.name}`}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-secondary/30">
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {product.gemstoneType}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                <td className="px-4 py-3 capitalize">{product.category}</td>
                <td className="px-4 py-3 font-medium">
                  {formatCurrency(product.price, product.currency)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      product.inventory === 0 && "text-destructive",
                      product.inventory > 0 &&
                        product.inventory <= 3 &&
                        "text-accent",
                    )}
                  >
                    {product.inventory}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[product.status]}>
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <RowActions
                    product={product}
                    onView={onView}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onArchive={onArchive}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
