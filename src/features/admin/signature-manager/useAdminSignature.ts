"use client";

import { useCallback, useMemo, useState } from "react";

import type {
  AdminShowcaseGemstone,
  AdminSignatureData,
  ShowcaseCircleControls,
  ShowcaseDisplayControls,
  ShowcaseGemstoneFormData,
  ShowcaseGemstoneStatus,
} from "@/types/admin-signature";

type UseAdminSignatureOptions = {
  initialData: AdminSignatureData;
};

function sortGemstones(gemstones: AdminShowcaseGemstone[]) {
  return [...gemstones].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function useAdminSignature({ initialData }: UseAdminSignatureOptions) {
  const [data, setData] = useState(initialData);
  const [savedSnapshot] = useState(initialData);
  const [editingGemstone, setEditingGemstone] =
    useState<AdminShowcaseGemstone | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const sortedGemstones = useMemo(
    () => sortGemstones(data.gemstones),
    [data.gemstones],
  );

  const visibleGemstones = useMemo(
    () => sortedGemstones.filter((gem) => gem.status === "enabled"),
    [sortedGemstones],
  );

  const openEditor = useCallback((gemstone: AdminShowcaseGemstone) => {
    setEditingGemstone(gemstone);
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditingGemstone(null);
  }, []);

  const updateGemstone = useCallback(
    (id: string, form: ShowcaseGemstoneFormData) => {
      setData((current) => ({
        ...current,
        gemstones: current.gemstones.map((gem) =>
          gem.id === id
            ? {
                ...gem,
                ...form,
                updatedAt: new Date().toISOString(),
              }
            : gem,
        ),
        updatedAt: new Date().toISOString(),
      }));
      closeEditor();
    },
    [closeEditor],
  );

  const setGemstoneStatus = useCallback(
    (id: string, status: ShowcaseGemstoneStatus) => {
      setData((current) => ({
        ...current,
        gemstones: current.gemstones.map((gem) =>
          gem.id === id
            ? { ...gem, status, updatedAt: new Date().toISOString() }
            : gem,
        ),
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const reorderGemstones = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return;

    setData((current) => {
      const sorted = sortGemstones(current.gemstones);
      const fromIndex = sorted.findIndex((gem) => gem.id === fromId);
      const toIndex = sorted.findIndex((gem) => gem.id === toId);
      if (fromIndex < 0 || toIndex < 0) return current;

      const next = [...sorted];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);

      return {
        ...current,
        gemstones: next.map((gem, index) => ({
          ...gem,
          sortOrder: index + 1,
        })),
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const moveGemstone = useCallback((id: string, direction: "up" | "down") => {
    setData((current) => {
      const sorted = sortGemstones(current.gemstones);
      const index = sorted.findIndex((gem) => gem.id === id);
      if (index < 0) return current;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return current;

      const next = [...sorted];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];

      return {
        ...current,
        gemstones: next.map((gem, i) => ({
          ...gem,
          sortOrder: i + 1,
        })),
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const updateDisplay = useCallback((patch: Partial<ShowcaseDisplayControls>) => {
    setData((current) => ({
      ...current,
      display: { ...current.display, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateCircle = useCallback((patch: Partial<ShowcaseCircleControls>) => {
    setData((current) => ({
      ...current,
      circle: { ...current.circle, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetAll = useCallback(() => {
    setData({ ...savedSnapshot });
    closeEditor();
  }, [closeEditor, savedSnapshot]);

  return {
    data,
    sortedGemstones,
    visibleGemstones,
    editingGemstone,
    editorOpen,
    previewMode,
    setPreviewMode,
    draggingId,
    setDraggingId,
    openEditor,
    closeEditor,
    updateGemstone,
    setGemstoneStatus,
    reorderGemstones,
    moveGemstone,
    updateDisplay,
    updateCircle,
    resetAll,
  };
}
