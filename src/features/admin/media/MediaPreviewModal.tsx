"use client";

import Image from "next/image";
import { Copy, Film, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adminMediaConfig } from "@/features/admin/media/admin-media.config";
import { toast } from "@/lib/toast";
import type { AdminMediaAsset } from "@/types/admin-media";

type MediaPreviewModalProps = {
  asset: AdminMediaAsset | null;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  formatBytes: (bytes: number) => string;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function MediaPreviewModal({
  asset,
  open,
  onClose,
  onDelete,
  formatBytes,
}: MediaPreviewModalProps) {
  if (!asset) return null;

  const isImage = asset.mimeType.startsWith("image/");

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(asset.url);
      toast.success("URL copied to clipboard");
    } catch {
      toast.error("Unable to copy URL");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <div className="relative aspect-video bg-secondary/30">
          {isImage ? (
            <Image
              src={asset.url}
              alt={asset.alt ?? asset.name}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-contain"
              priority
            />
          ) : asset.category === "videos" ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <Film className="h-16 w-16" aria-hidden />
              <p className="mt-3 text-sm">Video preview — playback coming soon</p>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <p className="text-sm">Document preview unavailable</p>
              <p className="mt-1 text-xs">{asset.filename}</p>
            </div>
          )}
        </div>

        <div className="space-y-4 p-6">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {adminMediaConfig.categoryLabels[asset.category]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {asset.mimeType}
              </span>
            </div>
            <DialogTitle>{asset.name}</DialogTitle>
          </DialogHeader>

          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Filename</dt>
              <dd className="font-mono text-xs">{asset.filename}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Size</dt>
              <dd>{formatBytes(asset.sizeBytes)}</dd>
            </div>
            {asset.width && asset.height && (
              <div>
                <dt className="text-muted-foreground">Dimensions</dt>
                <dd>
                  {asset.width} × {asset.height}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground">Uploaded</dt>
              <dd>{formatDate(asset.uploadedAt)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">URL</dt>
              <dd className="break-all font-mono text-xs">{asset.url}</dd>
            </div>
          </dl>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={copyUrl}>
              <Copy className="h-4 w-4" />
              Copy URL
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(asset.id);
                onClose();
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
