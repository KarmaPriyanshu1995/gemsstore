"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminCard } from "@/features/admin/layout/admin-card";
import {
  adminSignatureConfig,
  mobileBehaviorOptions,
} from "@/features/admin/signature-manager/admin-signature.config";
import type { ShowcaseDisplayControls } from "@/types/admin-signature";

type DisplayControlsPanelProps = {
  display: ShowcaseDisplayControls;
  onChange: (patch: Partial<ShowcaseDisplayControls>) => void;
};

export function DisplayControlsPanel({
  display,
  onChange,
}: DisplayControlsPanelProps) {
  const { rotationSpeed } = adminSignatureConfig;

  return (
    <AdminCard className="p-5">
      <h2 className="font-heading text-lg font-semibold">Display Controls</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Maharaja Gallery autoplay and mobile behavior
      </p>

      <div className="mt-5 space-y-5">
        <div className="flex items-center gap-3">
          <Checkbox
            id="autoplay"
            checked={display.autoplayEnabled}
            onCheckedChange={(checked) =>
              onChange({ autoplayEnabled: checked === true })
            }
          />
          <Label htmlFor="autoplay" className="text-sm font-normal">
            Enable autoplay rotation
          </Label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="rotation-speed">
            Rotation speed ({display.rotationSpeedMs / 1000}s)
          </Label>
          <input
            id="rotation-speed"
            type="range"
            min={rotationSpeed.min}
            max={rotationSpeed.max}
            step={rotationSpeed.step}
            value={display.rotationSpeedMs}
            onChange={(e) =>
              onChange({ rotationSpeedMs: Number(e.target.value) })
            }
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2s</span>
            <span>12s</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="pause-hover"
            checked={display.pauseOnHover}
            onCheckedChange={(checked) =>
              onChange({ pauseOnHover: checked === true })
            }
          />
          <Label htmlFor="pause-hover" className="text-sm font-normal">
            Pause on hover / focus
          </Label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="mobile-behavior">Mobile behavior</Label>
          <Select
            value={display.mobileBehavior}
            onValueChange={(value) =>
              onChange({
                mobileBehavior: value as ShowcaseDisplayControls["mobileBehavior"],
              })
            }
          >
            <SelectTrigger id="mobile-behavior">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mobileBehaviorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </AdminCard>
  );
}
