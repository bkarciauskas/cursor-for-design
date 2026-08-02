"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type ToastTone = "neutral" | "success" | "warning";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneClass: Record<ToastTone, string> = {
  neutral: "border-border bg-card text-fg",
  success: "border-success/30 bg-success-bg text-success",
  warning: "border-warning/30 bg-warning-bg text-warning",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((current) => [
      ...current.slice(-3),
      {
        id,
        title: input.title,
        description: input.description,
        tone: input.tone ?? "neutral",
      },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(100%-2rem,22rem)] flex-col gap-2"
      >
        {items.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(item.id), 3600);
    return () => window.clearTimeout(timer);
  }, [item.id, onDismiss]);

  return (
    <div
      role="status"
      aria-labelledby={titleId}
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-lg border px-3.5 py-3 shadow-sm",
        toneClass[item.tone],
      )}
    >
      <div className="min-w-0 flex-1">
        <p id={titleId} className="text-sm font-medium">
          {item.title}
        </p>
        {item.description && (
          <p className="text-muted mt-0.5 text-xs leading-relaxed">{item.description}</p>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onDismiss(item.id)}
        className="text-muted hover:text-fg -mt-0.5 -mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
