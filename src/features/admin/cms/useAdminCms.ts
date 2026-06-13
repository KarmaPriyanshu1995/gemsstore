"use client";

import { useCallback, useState } from "react";

import type { AdminCmsData, CmsSectionKey } from "@/types/admin-cms";

type UseAdminCmsOptions = {
  initialData: AdminCmsData;
};

export function useAdminCms({ initialData }: UseAdminCmsOptions) {
  const [cms, setCms] = useState(initialData);
  const [activeSection, setActiveSection] = useState<CmsSectionKey>("hero");
  const [savedSnapshot] = useState(initialData);

  const updateCms = useCallback((patch: Partial<AdminCmsData>) => {
    setCms((current) => ({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetSection = useCallback(() => {
    setCms((current) => ({
      ...current,
      [activeSection]:
        activeSection === "visibility"
          ? savedSnapshot.visibility
          : activeSection === "testimonials"
            ? [...savedSnapshot.testimonials]
            : savedSnapshot[activeSection],
      updatedAt: new Date().toISOString(),
    }));
  }, [activeSection, savedSnapshot]);

  const resetAll = useCallback(() => {
    setCms({ ...savedSnapshot, updatedAt: new Date().toISOString() });
  }, [savedSnapshot]);

  return {
    cms,
    activeSection,
    setActiveSection,
    updateCms,
    resetSection,
    resetAll,
  };
}
