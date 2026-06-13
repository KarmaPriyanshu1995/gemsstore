import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function ProductDetailLoading() {
  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-56" />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full max-w-lg" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-12 w-full max-w-sm" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </StorefrontShell>
  );
}
