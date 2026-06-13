import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function ProductsLoading() {
  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-6 h-4 w-40" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden space-y-4 lg:block">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>

          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-8 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StorefrontShell>
  );
}
