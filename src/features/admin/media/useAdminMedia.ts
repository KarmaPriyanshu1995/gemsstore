"use client";

import { useCallback, useMemo, useState } from "react";

import { adminMediaConfig } from "@/features/admin/media/admin-media.config";
import type {
  AdminMediaAsset,
  AdminMediaSortValue,
  MediaCategory,
  MediaUploadJob,
} from "@/types/admin-media";

function sortAssets(
  assets: AdminMediaAsset[],
  sort: AdminMediaSortValue,
): AdminMediaAsset[] {
  const sorted = [...assets];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
      );
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "size-desc":
      return sorted.sort((a, b) => b.sizeBytes - a.sizeBytes);
    default:
      return sorted;
  }
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type UseAdminMediaOptions = {
  initialAssets: AdminMediaAsset[];
};

export function useAdminMedia({ initialAssets }: UseAdminMediaOptions) {
  const [assets, setAssets] = useState(initialAssets);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<MediaCategory | "all">(
    "all",
  );
  const [sort, setSort] = useState<AdminMediaSortValue>(
    adminMediaConfig.defaultSort,
  );
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewAsset, setPreviewAsset] = useState<AdminMediaAsset | null>(
    null,
  );
  const [uploadJobs, setUploadJobs] = useState<MediaUploadJob[]>([]);
  const [uploadCategory, setUploadCategory] = useState<MediaCategory>("images");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return assets.filter((asset) => {
      if (categoryFilter !== "all" && asset.category !== categoryFilter) {
        return false;
      }

      if (!normalizedQuery) return true;

      return (
        asset.name.toLowerCase().includes(normalizedQuery) ||
        asset.filename.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [assets, query, categoryFilter]);

  const sorted = useMemo(() => sortAssets(filtered, sort), [filtered, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / adminMediaConfig.pageSize),
  );
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * adminMediaConfig.pageSize;
    return sorted.slice(start, start + adminMediaConfig.pageSize);
  }, [sorted, currentPage]);

  const simulateUpload = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      fileArray.forEach((file, index) => {
        const jobId = `upload_${Date.now()}_${index}`;
        const job: MediaUploadJob = {
          id: jobId,
          filename: file.name,
          category: uploadCategory,
          progress: 0,
          status: "uploading",
        };

        setUploadJobs((current) => [...current, job]);

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 25 + 10;

          if (progress >= 100) {
            clearInterval(interval);
            const now = new Date().toISOString();
            const newAsset: AdminMediaAsset = {
              id: `media_${Date.now()}_${index}`,
              name: file.name.replace(/\.[^.]+$/, ""),
              filename: file.name,
              url: "/images/showcase/gemstone.png",
              category: uploadCategory,
              mimeType: file.type || "application/octet-stream",
              sizeBytes: file.size,
              uploadedAt: now,
            };

            setAssets((current) => [newAsset, ...current]);
            setUploadJobs((current) =>
              current.map((j) =>
                j.id === jobId
                  ? { ...j, progress: 100, status: "complete" }
                  : j,
              ),
            );

            setTimeout(() => {
              setUploadJobs((current) => current.filter((j) => j.id !== jobId));
            }, 2000);
          } else {
            setUploadJobs((current) =>
              current.map((j) =>
                j.id === jobId
                  ? { ...j, progress: Math.min(progress, 99) }
                  : j,
              ),
            );
          }
        }, 300);
      });
    },
    [uploadCategory],
  );

  const deleteAssets = useCallback((ids: string[]) => {
    setAssets((current) => current.filter((a) => !ids.includes(a.id)));
    setSelectedIds((current) => {
      const next = new Set(current);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  return {
    assets,
    query,
    setQuery,
    categoryFilter,
    setCategoryFilter,
    sort,
    setSort,
    page: currentPage,
    setPage,
    totalPages,
    totalFiltered: sorted.length,
    paginated,
    selectedIds,
    selectedCount: selectedIds.size,
    previewAsset,
    setPreviewAsset,
    uploadJobs,
    uploadCategory,
    setUploadCategory,
    simulateUpload,
    deleteAssets,
    toggleSelect,
    clearSelection,
    formatBytes,
  };
}
