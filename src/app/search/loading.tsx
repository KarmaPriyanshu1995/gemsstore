import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function SearchLoading() {
  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Skeleton className="mx-auto h-10 w-64" />
        <Skeleton className="mt-8 h-14 w-full rounded-xl" />
        <Skeleton className="mt-8 h-48 w-full" />
      </div>
    </StorefrontShell>
  );
}
