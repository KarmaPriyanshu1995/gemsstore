"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildListingHref } from "@/features/product-listing/parse-listing-params";
import { cn } from "@/lib/utils";
import type { ProductListingParams } from "@/types/product-listing";

type ProductListingPaginationProps = {
  params: ProductListingParams;
  totalPages: number;
  className?: string;
};

export function ProductListingPagination({
  params,
  totalPages,
  className,
}: ProductListingPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Product pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <Button
        variant="outline"
        size="icon"
        disabled={params.page <= 1}
        asChild={params.page > 1}
        aria-label="Previous page"
      >
        {params.page > 1 ? (
          <Link href={buildListingHref({ ...params, page: params.page - 1 })}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      <ul className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === params.page;

          return (
            <li key={page}>
              <Button
                variant={isActive ? "default" : "outline"}
                size="icon"
                className="h-9 w-9"
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
                asChild={!isActive}
              >
                {isActive ? (
                  <span>{page}</span>
                ) : (
                  <Link href={buildListingHref({ ...params, page })}>{page}</Link>
                )}
              </Button>
            </li>
          );
        })}
      </ul>

      <Button
        variant="outline"
        size="icon"
        disabled={params.page >= totalPages}
        asChild={params.page < totalPages}
        aria-label="Next page"
      >
        {params.page < totalPages ? (
          <Link href={buildListingHref({ ...params, page: params.page + 1 })}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}
