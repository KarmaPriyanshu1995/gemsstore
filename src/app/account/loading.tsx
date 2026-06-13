import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function AccountLoading() {
  return (
    <StorefrontShell activeHref="/account">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-40" />
        <Skeleton className="mb-8 h-10 w-56" />
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <Skeleton className="hidden h-64 w-full rounded-lg lg:block" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    </StorefrontShell>
  );
}
