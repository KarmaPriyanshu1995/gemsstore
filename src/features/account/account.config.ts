import type { AccountTab } from "@/types/account";
import {
  Heart,
  MapPin,
  Package,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

export const accountTabs: Array<{
  id: AccountTab;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "profile", label: "Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export function isAccountTab(value: string | null): value is AccountTab {
  return accountTabs.some((tab) => tab.id === value);
}
