import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactPageContent } from "@/services/storefront.service";

type ContactPageProps = {
  content: ContactPageContent;
};

export function ContactPage({ content }: ContactPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        className="mb-8"
      />

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Concierge
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-muted-foreground">
          Our heritage concierge team is here to assist with certifications,
          bespoke settings, and private viewings.
        </p>
      </header>

      <div className="grid gap-4">
        <Card className="border-[rgba(199,164,90,0.15)]">
          <CardContent className="flex items-start gap-4 p-6">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="font-heading font-semibold">Email</h2>
              <Link
                href={`mailto:${content.email}`}
                className="mt-1 block text-muted-foreground hover:text-primary"
              >
                {content.email}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[rgba(199,164,90,0.15)]">
          <CardContent className="flex items-start gap-4 p-6">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="font-heading font-semibold">Phone</h2>
              <p className="mt-1 text-muted-foreground">{content.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[rgba(199,164,90,0.15)]">
          <CardContent className="flex items-start gap-4 p-6">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="font-heading font-semibold">Showroom</h2>
              <address className="mt-1 not-italic text-muted-foreground">
                {content.address}
              </address>
              <p className="mt-2 text-sm text-muted-foreground">{content.hours}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
