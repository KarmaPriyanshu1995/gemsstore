import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type LoadingSpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string;
  label?: string;
};

export function LoadingSpinner({
  size,
  className,
  label = "Loading",
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn(spinnerVariants({ size }), className)}
      aria-label={label}
      role="status"
    />
  );
}
