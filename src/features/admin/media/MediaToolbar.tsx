"use client";

import { Search, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminMediaConfig } from "@/features/admin/media/admin-media.config";
import type {
  AdminMediaSortValue,
  MediaCategory,
} from "@/types/admin-media";

type MediaToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  categoryFilter: MediaCategory | "all";
  onCategoryFilterChange: (value: MediaCategory | "all") => void;
  sort: AdminMediaSortValue;
  onSortChange: (value: AdminMediaSortValue) => void;
  uploadCategory: MediaCategory;
  onUploadCategoryChange: (value: MediaCategory) => void;
  totalFiltered: number;
  selectedCount: number;
  onBulkDelete: () => void;
  onClearSelection: () => void;
  onUploadClick: () => void;
};

export function MediaToolbar({
  query,
  onQueryChange,
  categoryFilter,
  onCategoryFilterChange,
  sort,
  onSortChange,
  uploadCategory,
  onUploadCategoryChange,
  totalFiltered,
  selectedCount,
  onBulkDelete,
  onClearSelection,
  onUploadClick,
}: MediaToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Media Library
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalFiltered} heritage assets
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={uploadCategory} onValueChange={onUploadCategoryChange}>
            <SelectTrigger className="w-[140px]" aria-label="Upload category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {adminMediaConfig.categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="heritage" onClick={onUploadClick}>
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or filename..."
            className="pl-9"
            aria-label="Search media"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            value={categoryFilter}
            onValueChange={(v) =>
              onCategoryFilterChange(v as MediaCategory | "all")
            }
          >
            <SelectTrigger className="w-[150px]" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {adminMediaConfig.categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => onSortChange(v as AdminMediaSortValue)}>
            <SelectTrigger className="w-[150px]" aria-label="Sort media">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {adminMediaConfig.sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] bg-white px-4 py-3">
          <span className="text-sm font-medium">{selectedCount} selected</span>
          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            Clear selection
          </Button>
        </div>
      )}
    </div>
  );
}
