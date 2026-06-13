"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { SeoValidationResult } from "@/types/admin-seo";

type SeoValidationProps = {
  results: SeoValidationResult[];
};

const iconMap = {
  good: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

const styleMap = {
  good: "text-emerald",
  warning: "text-accent",
  error: "text-destructive",
} as const;

export function SeoValidation({ results }: SeoValidationProps) {
  return (
    <ul className="space-y-2" aria-label="SEO validation">
      {results.map((result) => {
        const Icon = iconMap[result.status];

        return (
          <li
            key={`${result.field}-${result.message}`}
            className="flex items-start gap-2 rounded-md border border-[rgba(199,164,90,0.15)] bg-ivory/30 px-3 py-2 text-sm"
          >
            <Icon
              className={cn("mt-0.5 h-4 w-4 shrink-0", styleMap[result.status])}
              aria-hidden
            />
            <span className="text-muted-foreground">{result.message}</span>
          </li>
        );
      })}
    </ul>
  );
}
