"use client";

import { Award, Lock, ShieldCheck } from "lucide-react";

import { securityBadges } from "@/features/payment/payment.config";

const iconMap = {
  lock: Lock,
  shield: ShieldCheck,
  badge: Award,
} as const;

export function PaymentSecurityBadges() {
  return (
    <div className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-ivory/40 p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        Secure Heritage Checkout
      </p>
      <ul className="mt-3 flex flex-wrap gap-4">
        {securityBadges.map((badge) => {
          const Icon = iconMap[badge.icon];
          return (
            <li
              key={badge.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-accent" aria-hidden />
              {badge.label}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        This is a mock payment experience. No real charges are processed.
      </p>
    </div>
  );
}
