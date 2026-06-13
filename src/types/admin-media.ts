export type MediaCategory = "images" | "certificates" | "banners" | "videos";

export type MediaUploadStatus = "idle" | "uploading" | "complete" | "error";

export type AdminMediaAsset = {
  id: string;
  name: string;
  filename: string;
  url: string;
  category: MediaCategory;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  alt?: string;
  uploadedAt: string;
};

export type MediaUploadJob = {
  id: string;
  filename: string;
  category: MediaCategory;
  progress: number;
  status: MediaUploadStatus;
};

export type AdminMediaSortValue = "newest" | "oldest" | "name-asc" | "size-desc";
