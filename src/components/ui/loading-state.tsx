import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  message?: string;
  className?: string;
  fullScreen?: boolean;
};

export function LoadingState({
  message = "Loading...",
  className,
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        fullScreen && "min-h-[50vh]",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner size="lg" />
      <p className="text-sm font-body">{message}</p>
    </div>
  );
}
