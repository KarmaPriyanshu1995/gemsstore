import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type StorefrontShellProps = {
  children: React.ReactNode;
  activeHref?: string;
};

export function StorefrontShell({
  children,
  activeHref = "/",
}: StorefrontShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHref={activeHref} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
