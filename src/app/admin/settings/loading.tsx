import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-9 w-32" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <Skeleton className="hidden h-72 xl:block" />
        <Skeleton className="h-[420px]" />
      </div>
    </div>
  );
}
