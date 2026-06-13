"use client";

import { Tag, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CartCouponFormProps = {
  couponInput: string;
  couponError: string | null;
  appliedCouponLabel: string | null;
  onCouponInputChange: (value: string) => void;
  onApply: () => void;
  onRemove: () => void;
};

export function CartCouponForm({
  couponInput,
  couponError,
  appliedCouponLabel,
  onCouponInputChange,
  onApply,
  onRemove,
}: CartCouponFormProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="cart-coupon" className="text-sm font-medium">
        Heritage Coupon
      </Label>

      {appliedCouponLabel ? (
        <div className="flex items-center justify-between rounded-md border border-[rgba(199,164,90,0.2)] bg-ivory/50 px-3 py-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-accent" aria-hidden />
            <Badge variant="accent">{appliedCouponLabel}</Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onRemove}
            aria-label="Remove coupon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            id="cart-coupon"
            value={couponInput}
            onChange={(e) => onCouponInputChange(e.target.value)}
            placeholder="e.g. HERITAGE10"
            className="uppercase"
          />
          <Button variant="outline" onClick={onApply}>
            Apply
          </Button>
        </div>
      )}

      {couponError && (
        <p className="text-sm text-destructive">{couponError}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Try <span className="font-mono">HERITAGE10</span> or{" "}
        <span className="font-mono">MAHARAJA500</span>
      </p>
    </div>
  );
}
