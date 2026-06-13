import { Badge } from "@/components/ui/badge";

export function HeritageSection() {
  return (
    <section
      id="heritage"
      className="mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="accent" className="mb-4">
            Our Heritage
          </Badge>
          <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
            The art of maharaja craftsmanship
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
            For centuries, Indian royalty adorned themselves with the world&apos;s
            finest gemstones. RealGemsStore carries that legacy forward — each
            piece is sourced from certified mines, cut by master artisans, and
            set in designs inspired by Mughal and Rajput court jewellery.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
            Every gemstone arrives with full provenance documentation, GIA or IGI
            certification, and insured delivery — because true luxury demands
            complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Certified", value: "GIA & IGI" },
            { label: "Origin", value: "Traceable" },
            { label: "Shipping", value: "Insured" },
            { label: "Heritage", value: "Since 1947" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6 text-center"
            >
              <p className="font-heading text-2xl font-semibold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
