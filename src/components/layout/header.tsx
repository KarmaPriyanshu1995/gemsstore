import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

import { SiteNav } from "@/components/navigation/site-nav";
import { mainNavLinks } from "@/constants/navigation";
import { siteConfig } from "@/constants/design-tokens";

type HeaderProps = {
  activeHref?: string;
};

export function Header({ activeHref = "/" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="shrink-0">
          <span className="font-heading text-xl font-semibold tracking-wide text-foreground">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 block font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {siteConfig.tagline}
          </span>
        </Link>

        <SiteNav
          links={[...mainNavLinks]}
          activeHref={activeHref}
          className="hidden md:flex"
        />

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/account"
            aria-label="My account"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
