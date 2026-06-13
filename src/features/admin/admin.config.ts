import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Gem,
  Image,
  LayoutDashboard,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  comingSoon?: boolean;
};

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Gem },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "CMS", href: "/admin/cms", icon: FileText },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "SEO", href: "/admin/seo", icon: Search },
  {
    label: "Signature Experience",
    href: "/admin/signature-experience",
    icon: Sparkles,
  },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const adminBreadcrumbLabels: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  cms: "CMS",
  media: "Media Library",
  seo: "SEO",
  "signature-experience": "Signature Experience",
  settings: "Settings",
};

export const adminShellConfig = {
  brandName: "RealGemsStore",
  brandSubtitle: "Maharaja Command Center",
} as const;
