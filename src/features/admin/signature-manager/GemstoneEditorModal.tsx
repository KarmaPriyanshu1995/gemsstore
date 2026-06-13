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
import type {
  AdminShowcaseGemstone,
  ShowcaseGemstoneFormData,
} from "@/types/admin-signature";

type GemstoneEditorModalProps = {
  open: boolean;
  gemstone: AdminShowcaseGemstone | null;
  onClose: () => void;
  onSave: (id: string, data: ShowcaseGemstoneFormData) => void;
};

function gemstoneToForm(gemstone: AdminShowcaseGemstone): ShowcaseGemstoneFormData {
  return {
    name: gemstone.name,
    slug: gemstone.slug,
    story: gemstone.story,
    description: gemstone.description,
    origin: gemstone.origin,
    benefits: gemstone.benefits,
    certification: gemstone.certification,
    glowColor: gemstone.glowColor,
    priceFrom: gemstone.priceFrom,
    image: gemstone.image,
    ctaLabel: gemstone.ctaLabel,
    status: gemstone.status,
  };
}

export function GemstoneEditorModal({
  open,
  gemstone,
  onClose,
  onSave,
}: GemstoneEditorModalProps) {
  const [form, setForm] = useState<ShowcaseGemstoneFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !gemstone) return;
    setForm(gemstoneToForm(gemstone));
    setError(null);
  }, [open, gemstone]);

  if (!form || !gemstone) return null;

  const update = <K extends keyof ShowcaseGemstoneFormData>(
    key: K,
    value: ShowcaseGemstoneFormData[K],
  ) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }
    onSave(gemstone.id, form);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">
            Edit {gemstone.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="gem-name">Name</Label>
            <Input
              id="gem-name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gem-story">Story</Label>
            <textarea
              id="gem-story"
              rows={2}
              value={form.story}
              onChange={(e) => update("story", e.target.value)}
              className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gem-description">Description</Label>
            <textarea
              id="gem-description"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="gem-origin">Origin</Label>
              <Input
                id="gem-origin"
                value={form.origin}
                onChange={(e) => update("origin", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gem-slug">Slug</Label>
              <Input
                id="gem-slug"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gem-benefits">Benefits</Label>
            <textarea
              id="gem-benefits"
              rows={2}
              value={form.benefits}
              onChange={(e) => update("benefits", e.target.value)}
              className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gem-certification">Certification</Label>
            <Input
              id="gem-certification"
              value={form.certification}
              onChange={(e) => update("certification", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="gem-price">Price From (INR)</Label>
              <Input
                id="gem-price"
                type="number"
                min={0}
                value={form.priceFrom}
                onChange={(e) =>
                  update("priceFrom", Number(e.target.value) || 0)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gem-glow">Glow Color</Label>
              <div className="flex gap-2">
                <Input
                  id="gem-glow"
                  value={form.glowColor}
                  onChange={(e) => update("glowColor", e.target.value)}
                />
                <input
                  type="color"
                  value={form.glowColor}
                  onChange={(e) => update("glowColor", e.target.value)}
                  className="h-10 w-10 shrink-0 cursor-pointer rounded border border-input"
                  aria-label="Pick glow color"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gem-cta">CTA Label</Label>
            <Input
              id="gem-cta"
              value={form.ctaLabel}
              onChange={(e) => update("ctaLabel", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gem-image">Image URL</Label>
            <Input
              id="gem-image"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="heritage" onClick={handleSubmit}>
            Save Gemstone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
