"use client";

import { Eye, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { adminCmsConfig } from "@/features/admin/cms/admin-cms.config";
import { cn } from "@/lib/utils";
import type { AdminCmsData, CmsSectionKey, CmsSectionVisibility } from "@/types/admin-cms";

type CmsLivePreviewProps = {
  cms: AdminCmsData;
  activeSection: CmsSectionKey;
};

function isHomepageSection(
  section: CmsSectionKey,
): section is keyof CmsSectionVisibility {
  return section in {
    hero: true,
    featuredProducts: true,
    featuredCollections: true,
    heritage: true,
    educational: true,
    testimonials: true,
    cta: true,
  };
}

function PreviewLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
      <Eye className="h-3.5 w-3.5" aria-hidden />
      {children}
    </p>
  );
}

export function CmsLivePreview({ cms, activeSection }: CmsLivePreviewProps) {
  const sectionLabel =
    adminCmsConfig.sections.find((s) => s.key === activeSection)?.label ??
    "Preview";

  const showHiddenStyle =
    isHomepageSection(activeSection) && !cms.visibility[activeSection];

  return (
    <AdminCard className="sticky top-20 overflow-hidden">
      <div className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 px-4 py-3">
        <h2 className="font-heading text-sm font-semibold">Live Preview</h2>
        <p className="text-xs text-muted-foreground">{sectionLabel}</p>
      </div>

      <div
        className={cn(
          "max-h-[calc(100vh-12rem)] overflow-y-auto p-5",
          showHiddenStyle && "opacity-50",
        )}
      >
        {activeSection === "visibility" && (
          <div className="space-y-2">
            <PreviewLabel>Homepage Sections</PreviewLabel>
            {Object.entries(cms.visibility).map(([key, visible]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-md border border-[rgba(199,164,90,0.15)] px-3 py-2 text-sm"
              >
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <Badge variant={visible ? "default" : "outline"}>
                  {visible ? "Visible" : "Hidden"}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {activeSection === "hero" && (
          <div className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-background p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {cms.hero.eyebrow}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight">
              {cms.hero.headline}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {cms.hero.subheadline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="heritage" size="sm">
                {cms.hero.primaryCtaLabel}
              </Button>
              <Button variant="outline" size="sm">
                {cms.hero.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        )}

        {(activeSection === "featuredProducts" ||
          activeSection === "featuredCollections") && (
          <div>
            <PreviewLabel>Section Header</PreviewLabel>
            <h3 className="font-heading text-xl font-semibold">
              {activeSection === "featuredProducts"
                ? cms.featuredProducts.title
                : cms.featuredCollections.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeSection === "featuredProducts"
                ? cms.featuredProducts.description
                : cms.featuredCollections.description}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-secondary/40"
                  aria-hidden
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === "heritage" && (
          <div>
            <Badge variant="accent" className="mb-3">
              {cms.heritage.badge}
            </Badge>
            <h3 className="font-heading text-xl font-semibold">
              {cms.heritage.headline}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {cms.heritage.paragraph1}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {cms.heritage.paragraph2}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {cms.heritage.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border border-[rgba(199,164,90,0.15)] p-3 text-center"
                >
                  <p className="font-heading text-lg font-semibold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "educational" && (
          <div className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-ivory/30 p-5">
            <h3 className="font-heading text-lg font-semibold">
              {cms.educational.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {cms.educational.body}
            </p>
          </div>
        )}

        {activeSection === "testimonials" && (
          <div className="space-y-3">
            {cms.testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-ivory/30 p-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-accent text-accent"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm italic text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-2 text-xs text-muted-foreground">
                  — {item.name}, {item.location}
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {activeSection === "cta" && (
          <div className="rounded-lg bg-primary p-6 text-center">
            <h3 className="font-heading text-xl font-semibold text-primary-foreground">
              {cms.cta.headline}
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {cms.cta.subheadline}
            </p>
            <Button
              size="sm"
              className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              {cms.cta.buttonLabel}
            </Button>
          </div>
        )}

        {activeSection === "about" && (
          <div>
            <h3 className="font-heading text-xl font-semibold">
              {cms.about.headline}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{cms.about.body}</p>
            <p className="mt-4 rounded-md bg-emerald/5 px-3 py-2 text-sm font-medium text-emerald">
              {cms.about.mission}
            </p>
          </div>
        )}

        {activeSection === "contact" && (
          <address className="not-italic space-y-2 text-sm">
            <p>
              <span className="font-medium">Email:</span> {cms.contact.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {cms.contact.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {cms.contact.address}
            </p>
            <p>
              <span className="font-medium">Hours:</span> {cms.contact.hours}
            </p>
          </address>
        )}

        {showHiddenStyle && (
          <p className="mt-4 text-center text-xs text-destructive">
            This section is currently hidden on the homepage.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
