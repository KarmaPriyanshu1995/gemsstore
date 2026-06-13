import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

export function NavLink({ href, children, active, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-body text-sm font-medium transition-colors hover:text-primary",
        active
          ? "text-primary underline decoration-accent underline-offset-4"
          : "text-foreground",
        className,
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

type SiteNavProps = {
  links: { href: string; label: string }[];
  activeHref?: string;
  className?: string;
};

export function SiteNav({ links, activeHref, className }: SiteNavProps) {
  return (
    <nav
      className={cn("flex items-center gap-6", className)}
      aria-label="Main navigation"
    >
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          active={activeHref === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
