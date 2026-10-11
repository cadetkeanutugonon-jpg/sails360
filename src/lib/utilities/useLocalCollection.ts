"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Demo-only persistence: a collection kept in this browser's localStorage.
 * It is NOT shared with other devices and does not change the public site.
 * It is replaced by Supabase queries when the backend is connected.
 */
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, seed: T[]): T[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return seed; // storage blocked (private mode): fall back to the seed
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T[];
  let value: T[] = seed;
  if (raw) {
    try {
      value = JSON.parse(raw) as T[];
    } catch {
      value = seed;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export function useLocalCollection<T>(key: string, seed: T[]) {
  const subscribe = useCallback((cb: () => void) => {
    listeners.add(cb);
    window.addEventListener("storage", cb);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", cb);
    };
  }, []);

  const items = useSyncExternalStore(
    subscribe,
    () => read(key, seed),
    () => seed,
  );

  const save = useCallback(
    (next: T[]) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Ignore quota/blocked errors; the UI keeps showing the last good state.
      }
      listeners.forEach((l) => l());
    },
    [key],
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  }, [key]);

  return { items, save, reset };
}
