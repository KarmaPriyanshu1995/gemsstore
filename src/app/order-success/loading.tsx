import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function OrderSuccessLoading() {
  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-48" />
        <Skeleton className="mb-10 h-8 w-full max-w-2xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="mt-8 h-48 w-full rounded-lg" />
        <Skeleton className="mt-8 h-12 w-full max-w-md mx-auto" />
      </div>
    </StorefrontShell>
  );
}
