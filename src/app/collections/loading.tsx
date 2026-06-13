import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function CollectionsLoading() {
  return (
    <StorefrontShell activeHref="/collections">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-4 h-4 w-32" />
        <Skeleton className="mb-4 h-10 w-72" />
        <Skeleton className="mb-10 h-16 w-full max-w-2xl" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[4/3] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </StorefrontShell>
  );
}
