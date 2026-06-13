import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCmsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-9 w-24" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)_320px]">
        <Skeleton className="hidden h-96 xl:block" />
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[480px]" />
      </div>
    </div>
  );
}
