"use client";

import { useCallback, useRef, useState } from "react";
import { FileImage, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MediaUploadJob } from "@/types/admin-media";

type MediaUploadZoneProps = {
  uploadJobs: MediaUploadJob[];
  onFilesSelected: (files: FileList | File[]) => void;
};

export function MediaUploadZone({
  uploadJobs,
  onFilesSelected,
}: MediaUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer.files.length > 0) {
        onFilesSelected(event.dataTransfer.files);
      }
    },
    [onFilesSelected],
  );

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
          isDragging
            ? "border-emerald bg-emerald/5"
            : "border-[rgba(199,164,90,0.3)] bg-ivory/30 hover:border-emerald/50 hover:bg-ivory/50",
        )}
        aria-label="Upload files by drag and drop or click to browse"
      >
        <Upload
          className={cn(
            "h-8 w-8",
            isDragging ? "text-emerald" : "text-muted-foreground",
          )}
          aria-hidden
        />
        <p className="mt-3 font-medium">Drag & drop files here</p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse — upload is simulated
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) onFilesSelected(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {uploadJobs.length > 0 && (
        <ul className="space-y-2" aria-label="Upload progress">
          {uploadJobs.map((job) => (
            <li
              key={job.id}
              className="rounded-md border border-[rgba(199,164,90,0.15)] bg-white px-4 py-3"
            >
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate font-medium">{job.filename}</span>
                <span className="shrink-0 text-muted-foreground capitalize">
                  {job.status === "complete" ? "Complete" : `${Math.round(job.progress)}%`}
                </span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary/60"
                role="progressbar"
                aria-valuenow={job.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    job.status === "complete" ? "bg-emerald" : "bg-accent",
                  )}
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MediaAssetPlaceholder({ category }: { category: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-secondary/30 text-muted-foreground">
      <FileImage className="h-8 w-8" aria-hidden />
      <span className="mt-1 text-[10px] uppercase">{category}</span>
    </div>
  );
}
