"use client";

import { Gem, Search } from "lucide-react";
import { useState } from "react";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { SiteNav } from "@/components/navigation/site-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip, FilterGroup } from "@/components/ui/filter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { LoadingState } from "@/components/ui/loading-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { colors } from "@/constants/design-tokens";
import { toast } from "@/lib/toast";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/design-system", label: "Design System" },
];

const FILTER_OPTIONS = ["Emerald", "Ruby", "Sapphire", "Diamond"];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DesignSystemShowcase() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Emerald"]);

  const toggleFilter = (option: string) => {
    setActiveFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option],
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="font-heading text-4xl font-semibold md:text-5xl">
          Design System
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Reusable components styled with the RealGemsStore brand palette.
        </p>
      </header>

      <Section title="Color Tokens">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {Object.entries(colors).map(([name, hex]) => (
            <div key={name} className="space-y-2 text-center">
              <div
                className="mx-auto h-16 w-full rounded-lg border border-border"
                style={{ backgroundColor: hex }}
              />
              <p className="font-heading text-sm capitalize">{name}</p>
              <p className="text-xs text-muted-foreground">{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Navigation">
        <div className="space-y-6 rounded-lg border border-border p-6">
          <SiteNav links={NAV_LINKS} activeHref="/design-system" />
          <Separator />
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Design System" },
            ]}
          />
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="heritage">Heritage</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </Section>

      <Section title="Inputs & Labels">
        <div className="grid max-w-sm gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search gemstones</Label>
            <Input id="search" placeholder="e.g. Emerald ring" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="certified" />
            <Label htmlFor="certified">Certified only</Label>
          </div>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Sale</Badge>
        </div>
      </Section>

      <Section title="Cards">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Royal Emerald Ring</CardTitle>
            <CardDescription>
              Handcrafted 18K gold with certified Colombian emerald.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl text-primary">₹1,25,000</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Details</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Filters">
        <div className="space-y-6 rounded-lg border border-border p-6">
          <FilterGroup label="Gemstone Type">
            {FILTER_OPTIONS.map((option) => (
              <FilterChip
                key={option}
                label={option}
                active={activeFilters.includes(option)}
                onToggle={() => toggleFilter(option)}
              />
            ))}
          </FilterGroup>
          <div className="max-w-xs space-y-2">
            <Label>Sort by</Label>
            <Select defaultValue="featured">
              <SelectTrigger>
                <SelectValue placeholder="Select sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      <Section title="Modal">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Heritage Collection</DialogTitle>
              <DialogDescription>
                Explore curated pieces inspired by royal Indian gemstone
                traditions.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="heritage">Explore Collection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Accordion">
        <Accordion type="single" collapsible className="max-w-lg">
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
            <AccordionContent>
              Insured worldwide shipping with signature confirmation on all
              orders above ₹50,000.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="certification">
            <AccordionTrigger>Gemstone Certification</AccordionTrigger>
            <AccordionContent>
              Every gemstone includes GIA or IGI certification with full
              provenance documentation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Empty State">
        <EmptyState
          icon={Search}
          title="No results found"
          description="Try adjusting your filters or search for a different gemstone."
          actionLabel="Clear filters"
          onAction={() => setActiveFilters([])}
        />
      </Section>

      <Section title="Loading States">
        <div className="flex items-center gap-8">
          <LoadingSpinner size="sm" />
          <LoadingSpinner size="md" />
          <LoadingSpinner size="lg" />
        </div>
        <LoadingState message="Fetching collection..." />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Section>

      <Section title="Toast">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toast.success("Added to wishlist");
            }}
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toast.error("Payment failed. Please retry.");
            }}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toast("New collection available", {
                description: "Maharaja Heritage — now live.",
                action: {
                  label: "View",
                  onClick: (e) => e.preventDefault(),
                },
              });
            }}
          >
            Action Toast
          </Button>
        </div>
      </Section>

      <footer className="flex items-center justify-center gap-2 border-t border-border pt-8 text-sm text-muted-foreground">
        <Gem className="h-4 w-4 text-accent" aria-hidden />
        RealGemsStore Design System
      </footer>
    </div>
  );
}
