"use client";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { CartEmpty } from "@/features/cart/CartEmpty";
import { CartItemRow } from "@/features/cart/CartItemRow";
import { CartOrderSummary } from "@/features/cart/CartOrderSummary";
import { useCart } from "@/features/cart/cart-context";
import { useCartSummary } from "@/features/cart/useCartSummary";
import { toast } from "@/lib/toast";

function CartPageSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex gap-4 py-6">
            <Skeleton className="h-28 w-28 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-32" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
      <Skeleton className="h-[420px] rounded-lg" />
    </div>
  );
}

export function CartPage() {
  const cart = useCart();
  const summary = useCartSummary(cart.subtotal);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    cart.updateQuantity(productId, quantity);
  };

  const handleRemove = (productId: string) => {
    const item = cart.items.find((entry) => entry.productId === productId);
    cart.removeItem(productId);
    if (item) {
      toast.success(`${item.name} removed from cart`);
    }
  };

  const handleApplyCoupon = () => {
    const applied = summary.applyCoupon();
    if (applied) {
      toast.success("Heritage coupon applied");
    }
  };

  if (!cart.isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-32" />
        <Skeleton className="mb-8 h-10 w-48" />
        <CartPageSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        className="mb-8"
      />

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          Your Cart
        </h1>
      </header>

      {cart.items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section aria-label="Cart items">
            {cart.items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </section>

          <div className="lg:sticky lg:top-24">
            <CartOrderSummary
              itemCount={cart.itemCount}
              subtotal={cart.subtotal}
              discount={summary.discount}
              shipping={summary.shipping}
              total={summary.total}
              qualifiesForFreeShipping={summary.qualifiesForFreeShipping}
              couponInput={summary.couponInput}
              couponError={summary.couponError}
              appliedCouponLabel={summary.appliedCoupon?.label ?? null}
              onCouponInputChange={summary.setCouponInput}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={summary.removeCoupon}
            />
          </div>
        </div>
      )}
    </div>
  );
}
