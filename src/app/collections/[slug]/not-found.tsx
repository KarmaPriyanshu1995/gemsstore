import Link from "next/link";
import { Layers } from "lucide-react";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Button } from "@/components/ui/button";

export default function CollectionNotFound() {
  return (
    <StorefrontShell activeHref="/collections">
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        <Layers className="h-12 w-12 text-accent" aria-hidden />
        <h1 className="mt-6 font-heading text-3xl font-semibold">
          Collection Not Found
        </h1>
        <p className="mt-3 text-muted-foreground">
          This curated collection may have been archived or is not yet
          available.
        </p>
        <Button variant="heritage" className="mt-8" asChild>
          <Link href="/collections">Browse All Collections</Link>
        </Button>
      </div>
    </StorefrontShell>
  );
}
