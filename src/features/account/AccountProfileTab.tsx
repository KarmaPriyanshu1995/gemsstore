"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/lib/toast";
import type { UserProfile, UserProfileForm } from "@/types/account";

type AccountProfileTabProps = {
  profile: UserProfile;
  onUpdate: (patch: Partial<UserProfileForm>) => void;
};

function formatMemberSince(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function AccountProfileTab({
  profile,
  onUpdate,
}: AccountProfileTabProps) {
  const [form, setForm] = useState<UserProfileForm>({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const handleSave = () => {
    onUpdate(form);
    toast.success("Profile updated");
  };

  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Profile</CardTitle>
        <p className="text-sm text-muted-foreground">
          Member since {formatMemberSince(profile.memberSince)}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Full name</Label>
          <Input
            id="profile-name"
            value={form.name}
            onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input
            id="profile-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-phone">Phone</Label>
          <Input
            id="profile-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))}
          />
        </div>
        <Button variant="heritage" onClick={handleSave}>
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}
