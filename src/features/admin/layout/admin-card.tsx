import { cn } from "@/lib/utils";

export const adminCardClass =
  "rounded-lg border border-[rgba(199,164,90,0.15)] bg-white text-foreground shadow-sm";

type AdminCardProps = React.HTMLAttributes<HTMLDivElement>;

export function AdminCard({ className, ...props }: AdminCardProps) {
  return <div className={cn(adminCardClass, className)} {...props} />;
}
