"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProductFaq } from "@/types/product-detail";

type ProductDetailFaqsProps = {
  faqs: ProductFaq[];
};

export function ProductDetailFaqs({ faqs }: ProductDetailFaqsProps) {
  return (
    <section aria-labelledby="product-faqs-heading">
      <h2
        id="product-faqs-heading"
        className="font-heading text-2xl font-semibold"
      >
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
