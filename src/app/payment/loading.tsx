import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function PaymentLoading() {
  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-56" />
        <Skeleton className="mb-8 h-10 w-48" />
        <Skeleton className="mb-10 h-8 w-full max-w-2xl" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Skeleton className="h-[520px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
        </div>
      </div>
    </StorefrontShell>
  );
}
