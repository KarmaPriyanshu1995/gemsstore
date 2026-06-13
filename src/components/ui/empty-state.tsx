"use client";

import type { LucideIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 rounded-full bg-secondary/60 p-4">
          <Icon className="h-8 w-8 text-muted-foreground" aria-hidden />
        </div>
      )}
      <h3 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          className="mt-6"
          variant="heritage"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onAction?.();
          }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
