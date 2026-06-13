"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { checkoutProgressSteps } from "@/features/checkout/checkout.config";
import { cn } from "@/lib/utils";

type CheckoutProgressProps = {
  activeStep?: "cart" | "checkout" | "payment" | "success";
};

export function CheckoutProgress({
  activeStep = "checkout",
}: CheckoutProgressProps) {
  const activeIndex = checkoutProgressSteps.findIndex(
    (step) => step.id === activeStep,
  );

  return (
    <nav aria-label="Checkout progress" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 sm:gap-0">
        {checkoutProgressSteps.map((step, index) => {
          const isComplete = index < activeIndex;
          const isCurrent = index === activeIndex;
          const isFuture = index > activeIndex;

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 && (
                <span
                  className="mx-2 hidden h-px w-8 bg-border sm:block md:w-12"
                  aria-hidden
                />
              )}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                    isComplete && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary text-primary",
                    isFuture && "border-border text-muted-foreground",
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    index + 1
                  )}
                </span>
                {isFuture ? (
                  <span className="text-sm text-muted-foreground">
                    {step.label}
                  </span>
                ) : (
                  <Link
                    href={step.href}
                    className={cn(
                      "text-sm transition-colors hover:text-primary",
                      isCurrent ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {step.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
