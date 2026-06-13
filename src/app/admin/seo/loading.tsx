import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSeoLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-9 w-20" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[200px_minmax(0,1fr)_340px]">
        <Skeleton className="hidden h-64 xl:block" />
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[500px]" />
      </div>
    </div>
  );
}
