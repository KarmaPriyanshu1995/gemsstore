import { Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Testimonial } from "@/types/home";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by connoisseurs
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground md:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                      aria-hidden
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <blockquote className="font-body text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-6">
                  <p className="font-heading text-base font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
