"use client";

import { cn } from "@/lib/utils";
import { adminSeoConfig } from "@/features/admin/seo/admin-seo.config";
import type { SeoPageKey } from "@/types/admin-seo";

type SeoPagePickerProps = {
  activePageKey: SeoPageKey;
  onSelect: (key: SeoPageKey) => void;
};

export function SeoPagePicker({ activePageKey, onSelect }: SeoPagePickerProps) {
  return (
    <nav aria-label="SEO pages" className="space-y-1">
      {adminSeoConfig.pages.map((page) => (
        <button
          key={page.key}
          type="button"
          onClick={() => onSelect(page.key)}
          aria-current={activePageKey === page.key ? "page" : undefined}
          className={cn(
            "w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors",
            activePageKey === page.key
              ? "bg-emerald text-ivory"
              : "text-foreground hover:bg-secondary/40",
          )}
        >
          {page.label}
        </button>
      ))}
    </nav>
  );
}
