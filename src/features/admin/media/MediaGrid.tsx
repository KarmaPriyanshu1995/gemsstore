"use client";

import Image from "next/image";
import { Eye, Film, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { adminMediaConfig } from "@/features/admin/media/admin-media.config";
import { MediaAssetPlaceholder } from "@/features/admin/media/MediaUploadZone";
import { cn } from "@/lib/utils";
import type { AdminMediaAsset } from "@/types/admin-media";

type MediaGridProps = {
  assets: AdminMediaAsset[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onView: (asset: AdminMediaAsset) => void;
  onDelete: (id: string) => void;
  formatBytes: (bytes: number) => string;
};

function isImageAsset(asset: AdminMediaAsset) {
  return asset.mimeType.startsWith("image/");
}

export function MediaGrid({
  assets,
  selectedIds,
  onToggleSelect,
  onView,
  onDelete,
  formatBytes,
}: MediaGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {assets.map((asset) => {
        const isSelected = selectedIds.has(asset.id);

        return (
          <li key={asset.id}>
            <article
              className={cn(
                "group relative overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md",
                isSelected
                  ? "border-emerald ring-2 ring-emerald/30"
                  : "border-[rgba(199,164,90,0.15)]",
              )}
            >
              <div className="absolute left-2 top-2 z-10">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggleSelect(asset.id)}
                  aria-label={`Select ${asset.name}`}
                  className="bg-white/90 shadow-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => onView(asset)}
                className="relative block aspect-square w-full overflow-hidden"
                aria-label={`View ${asset.name}`}
              >
                {isImageAsset(asset) ? (
                  <Image
                    src={asset.url}
                    alt={asset.alt ?? asset.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : asset.category === "videos" ? (
                  <div className="flex h-full flex-col items-center justify-center bg-walnut/10">
                    <Film className="h-10 w-10 text-muted-foreground" aria-hidden />
                    <span className="mt-2 text-xs text-muted-foreground">Video</span>
                  </div>
                ) : (
                  <MediaAssetPlaceholder category={asset.category} />
                )}
              </button>

              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{asset.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {asset.filename}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {adminMediaConfig.categoryLabels[asset.category]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(asset.sizeBytes)}
                </p>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onView(asset)}
                    aria-label={`Preview ${asset.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(asset.id)}
                    aria-label={`Delete ${asset.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
