"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type FilterChipProps = {
  label: string;
  active?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function FilterChip({
  label,
  active = false,
  onToggle,
  className,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        onToggle?.();
      }}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-secondary/60",
        className,
      )}
    >
      {label}
    </button>
  );
}

type FilterGroupProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function FilterGroup({ label, children, className }: FilterGroupProps) {
  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className="font-heading text-sm font-medium text-foreground">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
