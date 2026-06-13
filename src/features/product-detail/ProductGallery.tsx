"use client";

import Image from "next/image";
import { Expand, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-square overflow-hidden rounded-lg border border-border/80 bg-secondary/20"
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
        >
          <Image
            src={activeImage}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out",
              zooming && "scale-150",
            )}
            priority
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-3 top-3 h-9 w-9 bg-background/90 shadow-sm"
            onClick={() => setFullscreen(true)}
            aria-label="Open fullscreen preview"
          >
            <Expand className="h-4 w-4" />
          </Button>
        </div>

        {images.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Product gallery thumbnails"
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`View image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                  index === activeIndex
                    ? "border-primary"
                    : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="max-w-4xl gap-0 overflow-hidden border-none bg-black/95 p-0 sm:rounded-lg">
          <DialogTitle className="sr-only">{alt} fullscreen preview</DialogTitle>
          <div className="relative aspect-square w-full md:aspect-[4/3]">
            <Image
              src={activeImage}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 text-white hover:bg-white/10 hover:text-white"
              onClick={() => setFullscreen(false)}
              aria-label="Close fullscreen preview"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {images.length > 1 && (
            <div className="flex justify-center gap-2 bg-black/80 px-4 py-3">
              {images.map((image, index) => (
                <button
                  key={`fullscreen-${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-12 w-12 overflow-hidden rounded border-2",
                    index === activeIndex
                      ? "border-accent"
                      : "border-transparent opacity-60",
                  )}
                  aria-label={`Fullscreen image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
