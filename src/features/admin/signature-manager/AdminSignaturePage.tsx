"use client";

import { RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CircleControlsPanel } from "@/features/admin/signature-manager/CircleControlsPanel";
import { DisplayControlsPanel } from "@/features/admin/signature-manager/DisplayControlsPanel";
import { GemstoneEditorModal } from "@/features/admin/signature-manager/GemstoneEditorModal";
import { GemstoneTable } from "@/features/admin/signature-manager/GemstoneTable";
import { SignatureLivePreview } from "@/features/admin/signature-manager/SignatureLivePreview";
import { useAdminSignature } from "@/features/admin/signature-manager/useAdminSignature";
import { toast } from "@/lib/toast";
import type { AdminSignatureData } from "@/types/admin-signature";

type AdminSignaturePageProps = {
  initialData: AdminSignatureData;
};

export function AdminSignaturePage({ initialData }: AdminSignaturePageProps) {
  const signature = useAdminSignature({ initialData });

  const handleDeletePlaceholder = () => {
    toast.info("Delete will be available when the API is connected");
  };

  const handleSave = () => {
    toast.success("Signature experience saved locally");
  };

  const handleDrop = (targetId: string) => {
    if (signature.draggingId) {
      signature.reorderGemstones(signature.draggingId, targetId);
    }
    signature.setDraggingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Signature Experience
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the Maharaja Gallery showcase on the homepage
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={signature.resetAll}>
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
          <Button variant="heritage" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section>
            <h2 className="mb-3 font-heading text-lg font-semibold">
              Gemstone Table
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Drag rows to reorder, or use arrow controls.{" "}
              {signature.sortedGemstones.length} gemstones configured.
            </p>
            <GemstoneTable
              gemstones={signature.sortedGemstones}
              draggingId={signature.draggingId}
              onDragStart={signature.setDraggingId}
              onDragEnd={() => signature.setDraggingId(null)}
              onDrop={handleDrop}
              onEdit={signature.openEditor}
              onEnable={(id) => signature.setGemstoneStatus(id, "enabled")}
              onDisable={(id) => signature.setGemstoneStatus(id, "disabled")}
              onDeletePlaceholder={handleDeletePlaceholder}
              onMove={signature.moveGemstone}
            />
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <DisplayControlsPanel
              display={signature.data.display}
              onChange={signature.updateDisplay}
            />
            <CircleControlsPanel
              circle={signature.data.circle}
              onChange={signature.updateCircle}
            />
          </div>
        </div>

        <SignatureLivePreview
          data={signature.data}
          visibleGemstones={signature.visibleGemstones}
          previewMode={signature.previewMode}
          onPreviewModeChange={signature.setPreviewMode}
        />
      </div>

      <GemstoneEditorModal
        open={signature.editorOpen}
        gemstone={signature.editingGemstone}
        onClose={signature.closeEditor}
        onSave={signature.updateGemstone}
      />
    </div>
  );
}
