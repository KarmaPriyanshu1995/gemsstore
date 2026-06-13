"use client";

import { Star } from "lucide-react";

import type { Product } from "@/types/catalog";
import type { ProductReview } from "@/types/product-detail";

type ProductDetailReviewsProps = {
  product: Product;
  reviews: ProductReview[];
};

function formatReviewDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function ProductDetailReviews({
  product,
  reviews,
}: ProductDetailReviewsProps) {
  return (
    <section aria-labelledby="product-reviews-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="product-reviews-heading"
            className="font-heading text-2xl font-semibold"
          >
            Customer Reviews
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.reviewCount} verified reviews ·{" "}
            {product.rating.toFixed(1)} average
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-lg border border-border/80 bg-ivory/30 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{review.author}</p>
              <time
                dateTime={review.date}
                className="text-xs text-muted-foreground"
              >
                {formatReviewDate(review.date)}
              </time>
            </div>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-3.5 w-3.5 ${
                    index < review.rating
                      ? "fill-accent text-accent"
                      : "text-border"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
            <h3 className="mt-3 font-heading text-base font-semibold">
              {review.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
