import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { footerNavLinks, mainNavLinks } from "@/constants/navigation";
import { siteConfig } from "@/constants/design-tokens";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl font-semibold text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Heritage
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Certified gemstones. Insured worldwide shipping. GIA and IGI
              documentation with every piece.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Footer navigation" className="flex gap-4 md:hidden">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
