import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSignatureLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-9 w-56" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Skeleton className="h-[500px]" />
        <Skeleton className="h-[420px]" />
      </div>
    </div>
  );
}
