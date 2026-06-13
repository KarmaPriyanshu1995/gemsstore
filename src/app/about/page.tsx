import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { AboutPage } from "@/features/storefront";
import { getAboutPage } from "@/services/storefront.service";

export const metadata: Metadata = {
  title: "About — RealGemsStore",
  description:
    "Discover the maharaja heritage behind RealGemsStore — certified gemstones since 1947.",
};

export default async function AboutRoute() {
  const { data: content } = await getAboutPage();

  return (
    <StorefrontShell activeHref="/about">
      <AboutPage content={content} />
    </StorefrontShell>
  );
}
