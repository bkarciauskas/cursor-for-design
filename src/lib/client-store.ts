"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/*
  Browser-owned state (localStorage, the <html> class list) is read through
  useSyncExternalStore rather than an effect, so hydration stays correct and
  the React Compiler lint rules pass.
*/

type Store<T> = {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (value: T) => void;
};

function createJsonStore<T>(key: string, fallback: T): Store<T> {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null | undefined;
  let cachedValue: T = fallback;

  function emit() {
    listeners.forEach((listener) => listener());
  }

  return {
    subscribe(onChange) {
      listeners.add(onChange);
      window.addEventListener("storage", onChange);
      return () => {
        listeners.delete(onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    // The snapshot must be referentially stable while the raw string is
    // unchanged, otherwise React re-renders forever.
    getSnapshot() {
      const raw = localStorage.getItem(key);
      if (raw !== cachedRaw) {
        cachedRaw = raw;
        try {
          cachedValue = raw === null ? fallback : (JSON.parse(raw) as T);
        } catch {
          cachedValue = fallback;
        }
      }
      return cachedValue;
    },
    getServerSnapshot: () => fallback,
    set(value) {
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
      cachedRaw = raw;
      cachedValue = value;
      emit();
    },
  };
}

const stores = new Map<string, Store<unknown>>();

export function usePersistentState<T>(key: string, fallback: T) {
  const store = useMemo(() => {
    if (!stores.has(key)) stores.set(key, createJsonStore(key, fallback) as Store<unknown>);
    return stores.get(key) as Store<T>;
    // `fallback` is only read when the store is first created.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const value = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const setValue = useCallback((next: T) => store.set(next), [store]);

  return [value, setValue] as const;
}

/* The theme's source of truth is the class on <html>, because an inline
   script applies it before React ever runs. */
const themeListeners = new Set<() => void>();

const themeStore = {
  subscribe(onChange: () => void) {
    themeListeners.add(onChange);
    return () => themeListeners.delete(onChange);
  },
  getSnapshot: () => document.documentElement.classList.contains("dark"),
  getServerSnapshot: () => false,
};

export function useDarkMode() {
  const isDark = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    themeListeners.forEach((listener) => listener());
  }, []);

  return { isDark, toggle };
}
