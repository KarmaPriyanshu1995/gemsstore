"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { adminSeoConfig } from "@/features/admin/seo/admin-seo.config";
import { cn } from "@/lib/utils";
import type { SeoPageConfig } from "@/types/admin-seo";

type SeoEditorProps = {
  page: SeoPageConfig;
  onChange: (patch: Partial<SeoPageConfig>) => void;
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    />
  );
}

export function SeoEditor({ page, onChange }: SeoEditorProps) {
  return (
    <AdminCard className="space-y-6 p-6">
      <section aria-labelledby="seo-meta-heading">
        <h2 id="seo-meta-heading" className="font-heading text-lg font-semibold">
          Meta Tags
        </h2>
        <div className="mt-4 grid gap-4">
          <Field
            label="Meta Title"
            hint={`${page.metaTitle.length} / ${adminSeoConfig.titleMax} characters`}
          >
            <Input
              value={page.metaTitle}
              onChange={(e) => onChange({ metaTitle: e.target.value })}
            />
          </Field>
          <Field
            label="Meta Description"
            hint={`${page.metaDescription.length} / ${adminSeoConfig.descriptionMax} characters`}
          >
            <TextArea
              value={page.metaDescription}
              onChange={(v) => onChange({ metaDescription: v })}
              rows={3}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug">
              <Input
                value={page.slug}
                onChange={(e) => onChange({ slug: e.target.value })}
              />
            </Field>
            <Field label="Canonical URL">
              <Input
                value={page.canonicalUrl}
                onChange={(e) => onChange({ canonicalUrl: e.target.value })}
              />
            </Field>
          </div>
          <label className="flex items-center gap-3">
            <Checkbox
              checked={page.noIndex}
              onCheckedChange={(checked) =>
                onChange({ noIndex: checked === true })
              }
            />
            <span className="text-sm">Prevent search engines from indexing (noindex)</span>
          </label>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="seo-og-heading">
        <h2 id="seo-og-heading" className="font-heading text-lg font-semibold">
          Open Graph
        </h2>
        <div className="mt-4 grid gap-4">
          <Field label="OG Title">
            <Input
              value={page.openGraph.title}
              onChange={(e) =>
                onChange({
                  openGraph: { ...page.openGraph, title: e.target.value },
                })
              }
            />
          </Field>
          <Field label="OG Description">
            <TextArea
              value={page.openGraph.description}
              onChange={(v) =>
                onChange({
                  openGraph: { ...page.openGraph, description: v },
                })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="OG Image URL">
              <Input
                value={page.openGraph.image}
                onChange={(e) =>
                  onChange({
                    openGraph: { ...page.openGraph, image: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="OG Type">
              <Select
                value={page.openGraph.type}
                onValueChange={(v) =>
                  onChange({
                    openGraph: { ...page.openGraph, type: v },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {adminSeoConfig.ogTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="seo-twitter-heading">
        <h2 id="seo-twitter-heading" className="font-heading text-lg font-semibold">
          Twitter Card
        </h2>
        <div className="mt-4 grid gap-4">
          <Field label="Card Type">
            <Select
              value={page.twitter.card}
              onValueChange={(v) =>
                onChange({
                  twitter: {
                    ...page.twitter,
                    card: v as SeoPageConfig["twitter"]["card"],
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {adminSeoConfig.twitterCardTypes.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Twitter Title">
            <Input
              value={page.twitter.title}
              onChange={(e) =>
                onChange({
                  twitter: { ...page.twitter, title: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Twitter Description">
            <TextArea
              value={page.twitter.description}
              onChange={(v) =>
                onChange({
                  twitter: { ...page.twitter, description: v },
                })
              }
            />
          </Field>
          <Field label="Twitter Image URL">
            <Input
              value={page.twitter.image}
              onChange={(e) =>
                onChange({
                  twitter: { ...page.twitter, image: e.target.value },
                })
              }
            />
          </Field>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="seo-schema-heading">
        <h2 id="seo-schema-heading" className="font-heading text-lg font-semibold">
          Schema Markup
        </h2>
        <div className="mt-4 grid gap-4">
          <label className="flex items-center gap-3">
            <Checkbox
              checked={page.schema.enabled}
              onCheckedChange={(checked) =>
                onChange({
                  schema: {
                    ...page.schema,
                    enabled: checked === true,
                  },
                })
              }
            />
            <span className="text-sm">Enable JSON-LD schema for this page</span>
          </label>
          <Field label="Schema Type">
            <Select
              value={page.schema.type}
              onValueChange={(v) =>
                onChange({
                  schema: {
                    ...page.schema,
                    type: v as SeoPageConfig["schema"]["type"],
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {adminSeoConfig.schemaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Organization / Site Name">
            <Input
              value={page.schema.name}
              onChange={(e) =>
                onChange({
                  schema: { ...page.schema, name: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Schema Description">
            <TextArea
              value={page.schema.description}
              onChange={(v) =>
                onChange({
                  schema: { ...page.schema, description: v },
                })
              }
            />
          </Field>
          {page.schema.enabled && (
            <div className="rounded-md bg-secondary/30 p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                JSON-LD Preview
              </p>
              <pre className="overflow-x-auto text-xs text-muted-foreground">
                {JSON.stringify(
                  {
                    "@context": "https://schema.org",
                    "@type": page.schema.type,
                    name: page.schema.name,
                    description: page.schema.description,
                    url: page.canonicalUrl,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          )}
        </div>
      </section>
    </AdminCard>
  );
}
