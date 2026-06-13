"use client";

import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

type SearchNoResultsProps = {
  query: string;
  onClear: () => void;
};

export function SearchNoResults({ query, onClear }: SearchNoResultsProps) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="mb-4 rounded-full bg-secondary/50 p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden />
      </div>
      <h2 className="font-heading text-xl font-semibold">No treasures found</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        No results for &ldquo;{query}&rdquo;. Try a different gemstone, origin,
        or certification term.
      </p>
      <Button variant="outline" className="mt-6" onClick={onClear}>
        Clear Search
      </Button>
    </div>
  );
}
