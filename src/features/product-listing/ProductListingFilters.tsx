"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { FilterChip, FilterGroup } from "@/components/ui/filter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildListingHref,
} from "@/features/product-listing/parse-listing-params";
import { productListingConfig } from "@/features/product-listing/product-listing.config";
import type {
  ProductFilterOptions,
  ProductListingParams,
} from "@/types/product-listing";
import { formatCurrency } from "@/utils/format-currency";

type ProductListingFiltersProps = {
  params: ProductListingParams;
  filterOptions: ProductFilterOptions;
  className?: string;
};

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ProductListingFilters({
  params,
  filterOptions,
  className,
}: ProductListingFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (next: ProductListingParams) => {
    startTransition(() => {
      router.push(buildListingHref({ ...next, page: 1 }));
    });
  };

  const updateFilters = (
    patch: Partial<ProductListingParams["filters"]>,
  ) => {
    navigate({
      ...params,
      filters: { ...params.filters, ...patch },
      page: 1,
    });
  };

  const clearFilters = () => {
    navigate({
      ...params,
      page: 1,
      filters: {
        gemstoneTypes: [],
        origins: [],
        birthMonths: [],
        zodiacs: [],
        certifications: [],
        colors: [],
        availability: "all",
        priceMin: undefined,
        priceMax: undefined,
      },
    });
  };

  const hasActiveFilters =
    params.filters.gemstoneTypes.length > 0 ||
    params.filters.origins.length > 0 ||
    params.filters.birthMonths.length > 0 ||
    params.filters.zodiacs.length > 0 ||
    params.filters.certifications.length > 0 ||
    params.filters.colors.length > 0 ||
    params.filters.availability !== "all" ||
    params.filters.priceMin !== undefined ||
    params.filters.priceMax !== undefined;

  return (
    <aside
      className={className}
      aria-label="Product filters"
      aria-busy={isPending}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">Refine Selection</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className="mt-6 space-y-8">
        <FilterGroup label="Gemstone Type">
          {filterOptions.gemstoneTypes.map((type) => (
            <FilterChip
              key={type}
              label={capitalize(type)}
              active={params.filters.gemstoneTypes.includes(type)}
              onToggle={() =>
                updateFilters({
                  gemstoneTypes: toggleValue(params.filters.gemstoneTypes, type),
                })
              }
            />
          ))}
        </FilterGroup>

        <div className="space-y-3">
          <Label className="font-heading text-sm font-medium">Price Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="price-min" className="text-xs text-muted-foreground">
                Min
              </Label>
              <Input
                id="price-min"
                type="number"
                min={filterOptions.priceRange.min}
                max={filterOptions.priceRange.max}
                placeholder={String(filterOptions.priceRange.min)}
                defaultValue={params.filters.priceMin ?? ""}
                onBlur={(event) => {
                  const value = event.target.value
                    ? Number(event.target.value)
                    : undefined;
                  updateFilters({ priceMin: value });
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price-max" className="text-xs text-muted-foreground">
                Max
              </Label>
              <Input
                id="price-max"
                type="number"
                min={filterOptions.priceRange.min}
                max={filterOptions.priceRange.max}
                placeholder={String(filterOptions.priceRange.max)}
                defaultValue={params.filters.priceMax ?? ""}
                onBlur={(event) => {
                  const value = event.target.value
                    ? Number(event.target.value)
                    : undefined;
                  updateFilters({ priceMax: value });
                }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(filterOptions.priceRange.min)} –{" "}
            {formatCurrency(filterOptions.priceRange.max)}
          </p>
        </div>

        <FilterGroup label="Origin">
          {filterOptions.origins.map((origin) => (
            <FilterChip
              key={origin}
              label={origin}
              active={params.filters.origins.includes(origin)}
              onToggle={() =>
                updateFilters({
                  origins: toggleValue(params.filters.origins, origin),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Birth Month">
          {filterOptions.birthMonths.map((month) => (
            <FilterChip
              key={month}
              label={month}
              active={params.filters.birthMonths.includes(month)}
              onToggle={() =>
                updateFilters({
                  birthMonths: toggleValue(params.filters.birthMonths, month),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Zodiac">
          {filterOptions.zodiacs.map((sign) => (
            <FilterChip
              key={sign}
              label={sign}
              active={params.filters.zodiacs.includes(sign)}
              onToggle={() =>
                updateFilters({
                  zodiacs: toggleValue(params.filters.zodiacs, sign),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Certification">
          {filterOptions.certifications.map((cert) => (
            <FilterChip
              key={cert}
              label={cert}
              active={params.filters.certifications.includes(cert)}
              onToggle={() =>
                updateFilters({
                  certifications: toggleValue(
                    params.filters.certifications,
                    cert,
                  ),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Color">
          {filterOptions.colors.map((color) => (
            <FilterChip
              key={color}
              label={color}
              active={params.filters.colors.includes(color)}
              onToggle={() =>
                updateFilters({
                  colors: toggleValue(params.filters.colors, color),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Availability">
          {productListingConfig.availabilityOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              active={params.filters.availability === option.value}
              onToggle={() => updateFilters({ availability: option.value })}
            />
          ))}
        </FilterGroup>
      </div>
    </aside>
  );
}
