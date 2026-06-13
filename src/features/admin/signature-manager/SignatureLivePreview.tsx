"use client";

import Image from "next/image";
import { Monitor, Smartphone, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type {
  AdminShowcaseGemstone,
  AdminSignatureData,
} from "@/types/admin-signature";
import { formatCurrency } from "@/utils/format-currency";

type SignatureLivePreviewProps = {
  data: AdminSignatureData;
  visibleGemstones: AdminShowcaseGemstone[];
  previewMode: "desktop" | "mobile";
  onPreviewModeChange: (mode: "desktop" | "mobile") => void;
};

export function SignatureLivePreview({
  data,
  visibleGemstones,
  previewMode,
  onPreviewModeChange,
}: SignatureLivePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [visibleGemstones.length]);

  useEffect(() => {
    if (
      !data.display.autoplayEnabled ||
      visibleGemstones.length <= 1 ||
      paused
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleGemstones.length);
    }, data.display.rotationSpeedMs);

    return () => window.clearInterval(timer);
  }, [
    data.display.autoplayEnabled,
    data.display.rotationSpeedMs,
    visibleGemstones.length,
    paused,
  ]);

  const activeGem = visibleGemstones[activeIndex];
  const isMobilePreview = previewMode === "mobile";
  const isCompact =
    isMobilePreview && data.display.mobileBehavior === "compact";

  return (
    <AdminCard className="sticky top-20 overflow-hidden">
      <div className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="font-heading text-sm font-semibold">Live Preview</h2>
            <p className="text-xs text-muted-foreground">
              {data.sectionLabel}
            </p>
          </div>
          <div className="flex rounded-md border border-[rgba(199,164,90,0.15)] p-0.5">
            <Button
              variant={previewMode === "desktop" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => onPreviewModeChange("desktop")}
              aria-label="Desktop preview"
            >
              <Monitor className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={previewMode === "mobile" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => onPreviewModeChange("mobile")}
              aria-label="Mobile preview"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto p-4",
          isMobilePreview ? "max-w-[375px]" : "max-w-full",
        )}
        onMouseEnter={() => data.display.pauseOnHover && setPaused(true)}
        onMouseLeave={() => data.display.pauseOnHover && setPaused(false)}
      >
        {visibleGemstones.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Enable at least one gemstone to preview the showcase.
          </p>
        ) : activeGem ? (
          <div
            className={cn(
              "overflow-hidden rounded-lg border border-[rgba(199,164,90,0.15)] bg-background",
              isCompact ? "space-y-0" : "grid grid-cols-1 md:grid-cols-2",
              isMobilePreview && !isCompact && "grid-cols-1",
            )}
          >
            <div
              className={cn(
                "flex flex-col justify-center p-5",
                isCompact && "order-2 border-t",
              )}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Maharaja Gallery
              </p>
              <p className="mt-2 text-[10px] tracking-widest text-muted-foreground">
                Treasure {String(activeIndex + 1).padStart(2, "0")} of{" "}
                {String(visibleGemstones.length).padStart(2, "0")}
              </p>
              <h3
                className={cn(
                  "mt-3 font-heading font-semibold leading-tight",
                  isMobilePreview ? "text-2xl" : "text-3xl",
                )}
              >
                {activeGem.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="accent" className="text-[10px]">
                  {activeGem.origin}
                </Badge>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {isCompact ? activeGem.story : activeGem.description}
              </p>
              {!isCompact && (
                <div className="mt-3 rounded-md border border-border/80 bg-secondary/20 p-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-accent" aria-hidden />
                    Heritage Benefits
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {activeGem.benefits}
                  </p>
                </div>
              )}
              <p className="mt-3 font-heading text-lg text-primary">
                From {formatCurrency(activeGem.priceFrom)}
              </p>
              <Button
                variant="heritage"
                size="sm"
                className="mt-4 w-fit pointer-events-none"
              >
                {activeGem.ctaLabel}
              </Button>
              <div className="mt-4 flex gap-1.5">
                {visibleGemstones.map((gem, index) => (
                  <button
                    key={gem.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-1 rounded-full transition-all",
                      index === activeIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-border",
                    )}
                    aria-label={`Preview ${gem.name}`}
                  />
                ))}
              </div>
            </div>

            <div
              className={cn(
                "relative min-h-[180px] bg-transparent",
                isCompact ? "order-1 min-h-[140px]" : "min-h-[220px]",
              )}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 45%, ${activeGem.glowColor}22 0%, transparent 65%)`,
                  opacity: data.circle.glowIntensity / 100,
                }}
                aria-hidden
              />
              <div className="relative flex h-full items-center justify-center p-6">
                <div
                  className="relative aspect-square w-full max-w-[200px]"
                  style={{
                    filter: `drop-shadow(0 0 ${24 * (data.circle.glowIntensity / 100)}px ${activeGem.glowColor}88)`,
                    transform: `scale(${data.circle.activeScale * 0.5})`,
                  }}
                >
                  <Image
                    src={data.heroImage}
                    alt={activeGem.name}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {!data.display.autoplayEnabled && visibleGemstones.length > 0 && (
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Autoplay disabled — use dots to navigate
          </p>
        )}
      </div>
    </AdminCard>
  );
}
