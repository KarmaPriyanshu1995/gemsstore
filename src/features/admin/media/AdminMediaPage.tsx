"use client";

import { useRef } from "react";
import { ImageIcon } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { MediaGrid } from "@/features/admin/media/MediaGrid";
import { MediaPagination } from "@/features/admin/media/MediaPagination";
import { MediaPreviewModal } from "@/features/admin/media/MediaPreviewModal";
import { MediaToolbar } from "@/features/admin/media/MediaToolbar";
import { MediaUploadZone } from "@/features/admin/media/MediaUploadZone";
import { useAdminMedia } from "@/features/admin/media/useAdminMedia";
import { toast } from "@/lib/toast";
import type { AdminMediaAsset } from "@/types/admin-media";

type AdminMediaPageProps = {
  initialAssets: AdminMediaAsset[];
};

export function AdminMediaPage({ initialAssets }: AdminMediaPageProps) {
  const media = useAdminMedia({ initialAssets });
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleDelete = (id: string) => {
    media.deleteAssets([id]);
    toast.success("Asset removed");
  };

  const handleBulkDelete = () => {
    const count = media.selectedCount;
    media.deleteAssets([...media.selectedIds]);
    toast.info(`${count} assets removed — Cloudinary delete coming soon`);
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-6">
      <MediaToolbar
        query={media.query}
        onQueryChange={(value) => {
          media.setQuery(value);
          media.setPage(1);
        }}
        categoryFilter={media.categoryFilter}
        onCategoryFilterChange={(value) => {
          media.setCategoryFilter(value);
          media.setPage(1);
        }}
        sort={media.sort}
        onSortChange={(value) => {
          media.setSort(value);
          media.setPage(1);
        }}
        uploadCategory={media.uploadCategory}
        onUploadCategoryChange={media.setUploadCategory}
        totalFiltered={media.totalFiltered}
        selectedCount={media.selectedCount}
        onBulkDelete={handleBulkDelete}
        onClearSelection={media.clearSelection}
        onUploadClick={scrollToUpload}
      />

      <div ref={uploadRef}>
        <MediaUploadZone
          uploadJobs={media.uploadJobs}
          onFilesSelected={(files) => {
            media.simulateUpload(files);
            toast.success("Upload started");
          }}
        />
      </div>

      {media.paginated.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No media found"
          description="Upload assets or adjust your search and filters."
        />
      ) : (
        <>
          <MediaGrid
            assets={media.paginated}
            selectedIds={media.selectedIds}
            onToggleSelect={media.toggleSelect}
            onView={media.setPreviewAsset}
            onDelete={handleDelete}
            formatBytes={media.formatBytes}
          />
          <MediaPagination
            page={media.page}
            totalPages={media.totalPages}
            onPageChange={media.setPage}
          />
        </>
      )}

      <MediaPreviewModal
        asset={media.previewAsset}
        open={media.previewAsset !== null}
        onClose={() => media.setPreviewAsset(null)}
        onDelete={handleDelete}
        formatBytes={media.formatBytes}
      />
    </div>
  );
}
