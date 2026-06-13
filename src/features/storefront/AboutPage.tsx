import Link from "next/link";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AboutPageContent } from "@/services/storefront.service";

type AboutPageProps = {
  content: AboutPageContent;
};

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About" }]}
        className="mb-8"
      />

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          {content.headline}
        </h1>
      </header>

      <div className="space-y-6 text-muted-foreground">
        <p className="text-base leading-relaxed">{content.body}</p>
        <Card className="border-[rgba(199,164,90,0.15)]">
          <CardContent className="p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Our Mission
            </h2>
            <p className="mt-3 leading-relaxed">{content.mission}</p>
          </CardContent>
        </Card>
      </div>

      <Button variant="heritage" className="mt-10" asChild>
        <Link href="/products">Explore Gemstones</Link>
      </Button>
    </div>
  );
}
