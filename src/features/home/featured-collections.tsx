import Link from "next/link";

import { CollectionCard } from "@/features/home/collection-card";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/types/catalog";

type FeaturedCollectionsProps = {
  collections: Collection[];
};

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (collections.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Curated for you
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground md:text-4xl">
            Featured Collections
          </h2>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/collections">View all</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}
