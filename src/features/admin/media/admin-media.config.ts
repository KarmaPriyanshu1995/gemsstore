import type { MediaCategory } from "@/types/admin-media";

export const adminMediaConfig = {
  pageSize: 12,
  defaultSort: "newest" as const,
  categories: [
    { value: "images" as const, label: "Images" },
    { value: "certificates" as const, label: "Certificates" },
    { value: "banners" as const, label: "Banners" },
    { value: "videos" as const, label: "Videos" },
  ],
  sortOptions: [
    { value: "newest" as const, label: "Newest" },
    { value: "oldest" as const, label: "Oldest" },
    { value: "name-asc" as const, label: "Name A–Z" },
    { value: "size-desc" as const, label: "Largest First" },
  ],
  categoryLabels: {
    images: "Images",
    certificates: "Certificates",
    banners: "Banners",
    videos: "Videos",
  } as Record<MediaCategory, string>,
} as const;
