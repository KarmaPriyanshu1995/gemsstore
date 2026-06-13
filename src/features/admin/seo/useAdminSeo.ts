"use client";

import { useCallback, useMemo, useState } from "react";

import type {
  AdminSeoData,
  SeoPageConfig,
  SeoPageKey,
} from "@/types/admin-seo";

type UseAdminSeoOptions = {
  initialData: AdminSeoData;
};

export function useAdminSeo({ initialData }: UseAdminSeoOptions) {
  const [data, setData] = useState(initialData);
  const [activePageKey, setActivePageKey] = useState<SeoPageKey>("home");
  const [savedSnapshot] = useState(initialData);

  const activePage = useMemo(
    () => data.pages.find((p) => p.pageKey === activePageKey) ?? data.pages[0],
    [data.pages, activePageKey],
  );

  const updatePage = useCallback((patch: Partial<SeoPageConfig>) => {
    if (!activePage) return;

    setData((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.pageKey === activePage.pageKey
          ? { ...page, ...patch, updatedAt: new Date().toISOString() }
          : page,
      ),
    }));
  }, [activePage]);

  const resetPage = useCallback(() => {
    const original = savedSnapshot.pages.find((p) => p.pageKey === activePageKey);
    if (!original) return;

    setData((current) => ({
      ...current,
      pages: current.pages.map((page) =>
        page.pageKey === activePageKey ? { ...original } : page,
      ),
    }));
  }, [activePageKey, savedSnapshot]);

  const resetAll = useCallback(() => {
    setData({ ...savedSnapshot });
  }, [savedSnapshot]);

  return {
    data,
    activePageKey,
    setActivePageKey,
    activePage,
    updatePage,
    resetPage,
    resetAll,
  };
}
