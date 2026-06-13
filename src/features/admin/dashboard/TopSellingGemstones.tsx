import Image from "next/image";

import { AdminCard } from "@/features/admin/layout/admin-card";
import type { AdminTopGemstone } from "@/types/admin";
import { formatCurrency } from "@/utils/format-currency";

type TopSellingGemstonesProps = {
  gemstones: AdminTopGemstone[];
};

export function TopSellingGemstones({ gemstones }: TopSellingGemstonesProps) {
  return (
    <AdminCard>
      <div className="border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
        <h2 className="font-heading text-xl font-semibold">Top Selling Gemstones</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Best performers this quarter
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(199,164,90,0.15)] text-muted-foreground">
              <th className="px-6 py-3 font-medium" scope="col">
                Gemstone
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Type
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Sales
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {gemstones.map((gem) => (
              <tr
                key={gem.id}
                className="border-b border-[rgba(199,164,90,0.08)] last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-secondary/30">
                      <Image
                        src={gem.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{gem.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {gem.gemstoneType}
                </td>
                <td className="px-6 py-4">{gem.sales}</td>
                <td className="px-6 py-4 font-medium">
                  {formatCurrency(gem.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
