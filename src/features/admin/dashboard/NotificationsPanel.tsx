import { AlertCircle, Bell, CheckCircle2 } from "lucide-react";

import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type { AdminNotification } from "@/types/admin";

type NotificationsPanelProps = {
  notifications: AdminNotification[];
};

const typeConfig = {
  info: {
    icon: Bell,
    className: "bg-secondary/40 text-foreground",
  },
  warning: {
    icon: AlertCircle,
    className: "bg-accent/20 text-foreground",
  },
  success: {
    icon: CheckCircle2,
    className: "bg-emerald/10 text-emerald",
  },
} as const;

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function NotificationsPanel({
  notifications,
}: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminCard>
      <div className="flex items-center justify-between border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount} unread alerts
          </p>
        </div>
      </div>

      <ul className="divide-y divide-[rgba(199,164,90,0.08)]">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <li
              key={notification.id}
              className={cn(
                "flex gap-4 px-6 py-4",
                !notification.read && "bg-ivory/50",
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  config.className,
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium leading-snug">
                    {notification.title}
                  </p>
                  <time
                    className="shrink-0 text-xs text-muted-foreground"
                    dateTime={notification.time}
                  >
                    {formatRelativeTime(notification.time)}
                  </time>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminCard>
  );
}
