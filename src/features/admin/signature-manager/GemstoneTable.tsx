"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type { AdminShowcaseGemstone } from "@/types/admin-signature";

type GemstoneTableProps = {
  gemstones: AdminShowcaseGemstone[];
  draggingId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (targetId: string) => void;
  onEdit: (gemstone: AdminShowcaseGemstone) => void;
  onEnable: (id: string) => void;
  onDisable: (id: string) => void;
  onDeletePlaceholder: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
};

function RowActions({
  gemstone,
  onEdit,
  onEnable,
  onDisable,
  onDeletePlaceholder,
}: {
  gemstone: AdminShowcaseGemstone;
  onEdit: (gemstone: AdminShowcaseGemstone) => void;
  onEnable: (id: string) => void;
  onDisable: (id: string) => void;
  onDeletePlaceholder: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden items-center gap-1 md:flex">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(gemstone)}
          aria-label={`Edit ${gemstone.name}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        {gemstone.status === "enabled" ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDisable(gemstone.id)}
            aria-label={`Disable ${gemstone.name}`}
          >
            <PowerOff className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEnable(gemstone.id)}
            aria-label={`Enable ${gemstone.name}`}
          >
            <Power className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => onDeletePlaceholder(gemstone.id)}
          aria-label={`Delete ${gemstone.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={`Actions for ${gemstone.name}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {menuOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-md border border-[rgba(199,164,90,0.15)] bg-background p-1 shadow-md md:hidden">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-secondary/50"
            onClick={() => {
              onEdit(gemstone);
              setMenuOpen(false);
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-secondary/50"
            onClick={() => {
              if (gemstone.status === "enabled") onDisable(gemstone.id);
              else onEnable(gemstone.id);
              setMenuOpen(false);
            }}
          >
            {gemstone.status === "enabled" ? (
              <PowerOff className="h-3.5 w-3.5" />
            ) : (
              <Power className="h-3.5 w-3.5" />
            )}
            {gemstone.status === "enabled" ? "Disable" : "Enable"}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary/50"
            onClick={() => {
              onDeletePlaceholder(gemstone.id);
              setMenuOpen(false);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export function GemstoneTable({
  gemstones,
  draggingId,
  onDragStart,
  onDragEnd,
  onDrop,
  onEdit,
  onEnable,
  onDisable,
  onDeletePlaceholder,
  onMove,
}: GemstoneTableProps) {
  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium" scope="col">
                Order
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Gemstone
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Status
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Glow
              </th>
              <th className="px-4 py-3 font-medium text-right" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {gemstones.map((gemstone, index) => (
              <tr
                key={gemstone.id}
                draggable
                onDragStart={() => onDragStart(gemstone.id)}
                onDragEnd={onDragEnd}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onDrop(gemstone.id)}
                className={cn(
                  "border-b border-[rgba(199,164,90,0.1)] transition-colors last:border-0",
                  draggingId === gemstone.id && "bg-secondary/30 opacity-60",
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <GripVertical
                      className="h-4 w-4 cursor-grab text-muted-foreground"
                      aria-hidden
                    />
                    <span className="font-medium">{gemstone.sortOrder}</span>
                    <div className="ml-1 flex flex-col">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        disabled={index === 0}
                        onClick={() => onMove(gemstone.id, "up")}
                        aria-label={`Move ${gemstone.name} up`}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        disabled={index === gemstones.length - 1}
                        onClick={() => onMove(gemstone.id, "down")}
                        aria-label={`Move ${gemstone.name} down`}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-[rgba(199,164,90,0.15)]">
                      <Image
                        src={gemstone.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{gemstone.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {gemstone.origin}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      gemstone.status === "enabled" ? "default" : "outline"
                    }
                  >
                    {gemstone.status === "enabled" ? "Enabled" : "Disabled"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-5 w-5 rounded-full border border-[rgba(199,164,90,0.2)]"
                      style={{ backgroundColor: gemstone.glowColor }}
                      aria-hidden
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {gemstone.glowColor}
                    </span>
                  </div>
                </td>
                <td className="relative px-4 py-3 text-right">
                  <RowActions
                    gemstone={gemstone}
                    onEdit={onEdit}
                    onEnable={onEnable}
                    onDisable={onDisable}
                    onDeletePlaceholder={onDeletePlaceholder}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
