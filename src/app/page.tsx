import { StorefrontShell } from "@/components/layout/storefront-shell";
import { CircleOfGems } from "@/features/circle-of-gems/CircleOfGems";
import { CtaBanner } from "@/features/home/cta-banner";
import { FeaturedCollections } from "@/features/home/featured-collections";
import { FeaturedProducts } from "@/features/home/featured-products";
import { HeritageSection } from "@/features/home/heritage-section";
import { HeroSection } from "@/features/home/hero-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { getHomePageData } from "@/services/homepage.service";
import { getGemstones } from "@/services/gemstones.service";

export default async function HomePage() {
  const [{ data }, { data: gemstones }] = await Promise.all([
    getHomePageData(),
    getGemstones(),
  ]);

  return (
    <StorefrontShell activeHref="/">
      <HeroSection />
      <CircleOfGems gemstones={gemstones} />
      <FeaturedCollections collections={data.featuredCollections} />
      <FeaturedProducts products={data.featuredProducts} />
      <HeritageSection />
      <TestimonialsSection testimonials={data.testimonials} />
      <CtaBanner />
    </StorefrontShell>
  );
}
