"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type { AdminCmsData, CmsSectionKey } from "@/types/admin-cms";

type CmsEditorProps = {
  cms: AdminCmsData;
  activeSection: CmsSectionKey;
  onChange: (patch: Partial<AdminCmsData>) => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function TextArea({
  value,
  onChange,
  rows = 4,
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

export function CmsEditor({ cms, activeSection, onChange }: CmsEditorProps) {
  return (
    <AdminCard className="p-6">
      {activeSection === "hero" && (
        <div className="grid gap-4">
          <Field label="Eyebrow">
            <Input
              value={cms.hero.eyebrow}
              onChange={(e) =>
                onChange({ hero: { ...cms.hero, eyebrow: e.target.value } })
              }
            />
          </Field>
          <Field label="Headline">
            <TextArea
              value={cms.hero.headline}
              onChange={(v) =>
                onChange({ hero: { ...cms.hero, headline: v } })
              }
              rows={2}
            />
          </Field>
          <Field label="Subheadline">
            <TextArea
              value={cms.hero.subheadline}
              onChange={(v) =>
                onChange({ hero: { ...cms.hero, subheadline: v } })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary CTA Label">
              <Input
                value={cms.hero.primaryCtaLabel}
                onChange={(e) =>
                  onChange({
                    hero: { ...cms.hero, primaryCtaLabel: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Primary CTA Link">
              <Input
                value={cms.hero.primaryCtaHref}
                onChange={(e) =>
                  onChange({
                    hero: { ...cms.hero, primaryCtaHref: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Secondary CTA Label">
              <Input
                value={cms.hero.secondaryCtaLabel}
                onChange={(e) =>
                  onChange({
                    hero: { ...cms.hero, secondaryCtaLabel: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Secondary CTA Link">
              <Input
                value={cms.hero.secondaryCtaHref}
                onChange={(e) =>
                  onChange({
                    hero: { ...cms.hero, secondaryCtaHref: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        </div>
      )}

      {activeSection === "featuredProducts" && (
        <div className="grid gap-4">
          <Field label="Section Title">
            <Input
              value={cms.featuredProducts.title}
              onChange={(e) =>
                onChange({
                  featuredProducts: {
                    ...cms.featuredProducts,
                    title: e.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label="Description">
            <TextArea
              value={cms.featuredProducts.description}
              onChange={(v) =>
                onChange({
                  featuredProducts: {
                    ...cms.featuredProducts,
                    description: v,
                  },
                })
              }
            />
          </Field>
        </div>
      )}

      {activeSection === "featuredCollections" && (
        <div className="grid gap-4">
          <Field label="Section Title">
            <Input
              value={cms.featuredCollections.title}
              onChange={(e) =>
                onChange({
                  featuredCollections: {
                    ...cms.featuredCollections,
                    title: e.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label="Description">
            <TextArea
              value={cms.featuredCollections.description}
              onChange={(v) =>
                onChange({
                  featuredCollections: {
                    ...cms.featuredCollections,
                    description: v,
                  },
                })
              }
            />
          </Field>
        </div>
      )}

      {activeSection === "heritage" && (
        <div className="grid gap-4">
          <Field label="Badge">
            <Input
              value={cms.heritage.badge}
              onChange={(e) =>
                onChange({
                  heritage: { ...cms.heritage, badge: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Headline">
            <Input
              value={cms.heritage.headline}
              onChange={(e) =>
                onChange({
                  heritage: { ...cms.heritage, headline: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Paragraph 1">
            <TextArea
              value={cms.heritage.paragraph1}
              onChange={(v) =>
                onChange({ heritage: { ...cms.heritage, paragraph1: v } })
              }
            />
          </Field>
          <Field label="Paragraph 2">
            <TextArea
              value={cms.heritage.paragraph2}
              onChange={(v) =>
                onChange({ heritage: { ...cms.heritage, paragraph2: v } })
              }
            />
          </Field>
          {cms.heritage.stats.map((stat, index) => (
            <div key={index} className="grid gap-3 rounded-md border border-[rgba(199,164,90,0.15)] p-3 sm:grid-cols-2">
              <Field label={`Stat ${index + 1} Label`}>
                <Input
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...cms.heritage.stats];
                    stats[index] = { ...stat, label: e.target.value };
                    onChange({ heritage: { ...cms.heritage, stats } });
                  }}
                />
              </Field>
              <Field label={`Stat ${index + 1} Value`}>
                <Input
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...cms.heritage.stats];
                    stats[index] = { ...stat, value: e.target.value };
                    onChange({ heritage: { ...cms.heritage, stats } });
                  }}
                />
              </Field>
            </div>
          ))}
        </div>
      )}

      {activeSection === "educational" && (
        <div className="grid gap-4">
          <Field label="Headline">
            <Input
              value={cms.educational.headline}
              onChange={(e) =>
                onChange({
                  educational: { ...cms.educational, headline: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Body">
            <TextArea
              value={cms.educational.body}
              onChange={(v) =>
                onChange({ educational: { ...cms.educational, body: v } })
              }
              rows={6}
            />
          </Field>
        </div>
      )}

      {activeSection === "testimonials" && (
        <div className="space-y-6">
          {cms.testimonials.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-md border border-[rgba(199,164,90,0.15)] p-4"
            >
              <p className="font-medium">Testimonial {index + 1}</p>
              <Field label="Name">
                <Input
                  value={item.name}
                  onChange={(e) => {
                    const testimonials = [...cms.testimonials];
                    testimonials[index] = {
                      ...item,
                      name: e.target.value,
                    };
                    onChange({ testimonials });
                  }}
                />
              </Field>
              <Field label="Location">
                <Input
                  value={item.location}
                  onChange={(e) => {
                    const testimonials = [...cms.testimonials];
                    testimonials[index] = {
                      ...item,
                      location: e.target.value,
                    };
                    onChange({ testimonials });
                  }}
                />
              </Field>
              <Field label="Quote">
                <TextArea
                  value={item.quote}
                  onChange={(v) => {
                    const testimonials = [...cms.testimonials];
                    testimonials[index] = { ...item, quote: v };
                    onChange({ testimonials });
                  }}
                />
              </Field>
              <Field label="Rating (1–5)">
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={item.rating}
                  onChange={(e) => {
                    const testimonials = [...cms.testimonials];
                    testimonials[index] = {
                      ...item,
                      rating: Number(e.target.value) || 5,
                    };
                    onChange({ testimonials });
                  }}
                />
              </Field>
            </div>
          ))}
        </div>
      )}

      {activeSection === "cta" && (
        <div className="grid gap-4">
          <Field label="Headline">
            <Input
              value={cms.cta.headline}
              onChange={(e) =>
                onChange({ cta: { ...cms.cta, headline: e.target.value } })
              }
            />
          </Field>
          <Field label="Subheadline">
            <TextArea
              value={cms.cta.subheadline}
              onChange={(v) =>
                onChange({ cta: { ...cms.cta, subheadline: v } })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Button Label">
              <Input
                value={cms.cta.buttonLabel}
                onChange={(e) =>
                  onChange({
                    cta: { ...cms.cta, buttonLabel: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Button Link">
              <Input
                value={cms.cta.buttonHref}
                onChange={(e) =>
                  onChange({
                    cta: { ...cms.cta, buttonHref: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        </div>
      )}

      {activeSection === "about" && (
        <div className="grid gap-4">
          <Field label="Headline">
            <Input
              value={cms.about.headline}
              onChange={(e) =>
                onChange({ about: { ...cms.about, headline: e.target.value } })
              }
            />
          </Field>
          <Field label="Body">
            <TextArea
              value={cms.about.body}
              onChange={(v) =>
                onChange({ about: { ...cms.about, body: v } })
              }
              rows={5}
            />
          </Field>
          <Field label="Mission">
            <TextArea
              value={cms.about.mission}
              onChange={(v) =>
                onChange({ about: { ...cms.about, mission: v } })
              }
              rows={3}
            />
          </Field>
        </div>
      )}

      {activeSection === "contact" && (
        <div className="grid gap-4">
          <Field label="Email">
            <Input
              type="email"
              value={cms.contact.email}
              onChange={(e) =>
                onChange({
                  contact: { ...cms.contact, email: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Phone">
            <Input
              value={cms.contact.phone}
              onChange={(e) =>
                onChange({
                  contact: { ...cms.contact, phone: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Address">
            <TextArea
              value={cms.contact.address}
              onChange={(v) =>
                onChange({ contact: { ...cms.contact, address: v } })
              }
            />
          </Field>
          <Field label="Hours">
            <Input
              value={cms.contact.hours}
              onChange={(e) =>
                onChange({
                  contact: { ...cms.contact, hours: e.target.value },
                })
              }
            />
          </Field>
        </div>
      )}

      {activeSection === "visibility" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Toggle homepage sections on or off. Hidden sections retain their
            content for when you re-enable them.
          </p>
          {(
            Object.entries(cms.visibility) as [
              keyof typeof cms.visibility,
              boolean,
            ][]
          ).map(([key, visible]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-[rgba(199,164,90,0.15)] px-4 py-3 hover:bg-ivory/50"
            >
              <Checkbox
                checked={visible}
                onCheckedChange={(checked) =>
                  onChange({
                    visibility: {
                      ...cms.visibility,
                      [key]: checked === true,
                    },
                  })
                }
              />
              <span className="text-sm capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </label>
          ))}
        </div>
      )}
    </AdminCard>
  );
}
