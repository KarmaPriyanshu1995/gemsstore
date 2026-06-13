import { CollectionCard } from "@/features/home/collection-card";
import type { Collection } from "@/types/catalog";

type CollectionsPageProps = {
  collections: Collection[];
};

export function CollectionsPage({ collections }: CollectionsPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Curated Collections
        </h1>
        <p className="mt-4 text-muted-foreground">
          Explore signature edits of certified gemstones — each collection
          tells a story of royal craftsmanship and timeless elegance.
        </p>
      </header>

      {collections.length === 0 ? (
        <p className="text-muted-foreground">
          New collections are being curated. Check back soon.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
