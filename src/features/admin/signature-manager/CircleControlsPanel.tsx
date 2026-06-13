"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { adminSignatureConfig } from "@/features/admin/signature-manager/admin-signature.config";
import type { ShowcaseCircleControls } from "@/types/admin-signature";

type CircleControlsPanelProps = {
  circle: ShowcaseCircleControls;
  onChange: (patch: Partial<ShowcaseCircleControls>) => void;
};

function RangeControl({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label} ({format(value)})
      </Label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

export function CircleControlsPanel({
  circle,
  onChange,
}: CircleControlsPanelProps) {
  const { circleScale, glowIntensity, animationSpeed, scrollSensitivity } =
    adminSignatureConfig;

  return (
    <AdminCard className="p-5">
      <div className="flex items-center gap-2">
        <h2 className="font-heading text-lg font-semibold">
          Future Circle Controls
        </h2>
        <Badge variant="outline">Migration Ready</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Stored for a future scroll-driven Circle of Gems experience
      </p>

      <div className="mt-5 space-y-5">
        <div className="flex items-center gap-3">
          <Checkbox
            id="circle-path"
            checked={circle.circularPathVisible}
            onCheckedChange={(checked) =>
              onChange({ circularPathVisible: checked === true })
            }
          />
          <Label htmlFor="circle-path" className="text-sm font-normal">
            Show circular gemstone path
          </Label>
        </div>

        <RangeControl
          id="active-scale"
          label="Active scale"
          value={circle.activeScale}
          min={circleScale.min}
          max={circleScale.max}
          step={circleScale.step}
          format={(v) => `${v.toFixed(2)}×`}
          onChange={(activeScale) => onChange({ activeScale })}
        />

        <RangeControl
          id="glow-intensity"
          label="Glow intensity"
          value={circle.glowIntensity}
          min={glowIntensity.min}
          max={glowIntensity.max}
          step={glowIntensity.step}
          format={(v) => `${v}%`}
          onChange={(glowIntensity) => onChange({ glowIntensity })}
        />

        <RangeControl
          id="animation-speed"
          label="Animation speed"
          value={circle.animationSpeed}
          min={animationSpeed.min}
          max={animationSpeed.max}
          step={animationSpeed.step}
          format={(v) => `${v.toFixed(1)}×`}
          onChange={(animationSpeed) => onChange({ animationSpeed })}
        />

        <RangeControl
          id="scroll-sensitivity"
          label="Scroll sensitivity"
          value={circle.scrollSensitivity}
          min={scrollSensitivity.min}
          max={scrollSensitivity.max}
          step={scrollSensitivity.step}
          format={(v) => `${v.toFixed(1)}×`}
          onChange={(scrollSensitivity) => onChange({ scrollSensitivity })}
        />
      </div>
    </AdminCard>
  );
}
