import type { Metadata } from "next";

import { AdminShell } from "@/features/admin/layout";

export const metadata: Metadata = {
  title: "Admin — RealGemsStore",
  description: "Maharaja Heritage command center for RealGemsStore operations.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
