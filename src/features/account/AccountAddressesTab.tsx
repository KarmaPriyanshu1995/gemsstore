"use client";

import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import type { UserAddress } from "@/types/account";

type AccountAddressesTabProps = {
  addresses: UserAddress[];
  onSetDefault: (addressId: string) => void;
};

export function AccountAddressesTab({
  addresses,
  onSetDefault,
}: AccountAddressesTabProps) {
  const handleSetDefault = (address: UserAddress) => {
    if (address.isDefault) return;
    onSetDefault(address.id);
    toast.success(`${address.label} set as default address`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-semibold">Saved Addresses</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage delivery destinations for your heritage treasures.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className="border-[rgba(199,164,90,0.15)]"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="flex items-center gap-2 font-heading text-base">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden />
                  {address.label}
                </CardTitle>
                {address.isDefault && (
                  <Badge variant="accent" className="shrink-0">
                    <Star className="mr-1 h-3 w-3" aria-hidden />
                    Default
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <address className="not-italic text-sm text-muted-foreground">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
              </address>
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(address)}
                >
                  Set as default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
