"use client";

import { useCallback, useEffect, useState } from "react";

import { searchConfig } from "@/features/search/search.config";

function readRecentSearches(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(searchConfig.recentStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecentSearches(searches: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    searchConfig.recentStorageKey,
    JSON.stringify(searches),
  );
}

export function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(readRecentSearches());
  }, []);

  const addRecent = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const next = [
      trimmed,
      ...readRecentSearches().filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase(),
      ),
    ].slice(0, searchConfig.maxRecentSearches);

    writeRecentSearches(next);
    setRecent(next);
  }, []);

  const clearRecent = useCallback(() => {
    writeRecentSearches([]);
    setRecent([]);
  }, []);

  return { recent, addRecent, clearRecent };
}
