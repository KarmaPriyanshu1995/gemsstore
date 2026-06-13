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
import { adminCustomersConfig } from "@/features/admin/customers/admin-customers.config";
import type { AdminCustomer } from "@/types/admin-customer";

type CustomerTagModalProps = {
  customer: AdminCustomer | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, tags: string[]) => void;
};

export function CustomerTagModal({
  customer,
  open,
  onClose,
  onSave,
}: CustomerTagModalProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  useEffect(() => {
    if (customer && open) {
      setTags([...customer.tags]);
      setCustomTag("");
    }
  }, [customer, open]);

  if (!customer) return null;

  const toggleTag = (tag: string) => {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((current) => [...current, trimmed]);
    setCustomTag("");
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          {customer.name} · Select concierge labels
        </p>

        <div className="grid gap-3 py-2">
          {adminCustomersConfig.tagOptions.map((tag) => (
            <label
              key={tag}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-[rgba(199,164,90,0.15)] px-3 py-2 hover:bg-ivory/50"
            >
              <Checkbox
                checked={tags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <span className="text-sm">{tag}</span>
            </label>
          ))}

          <div className="flex gap-2 pt-2">
            <Input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Custom tag..."
              onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
            />
            <Button variant="outline" type="button" onClick={addCustomTag}>
              Add
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="heritage" onClick={() => onSave(customer.id, tags)}>
            Save Tags
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
