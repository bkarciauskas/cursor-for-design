"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { reviews } from "@/lib/data";

type ToastOpts = {
  title: string;
  description?: string;
  tone?: "neutral" | "success" | "warning";
};

export function ToastButton({
  toast: toastOpts,
  children,
  onClick,
  ...props
}: ButtonProps & { toast: ToastOpts }) {
  const { toast } = useToast();

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toast(toastOpts);
      }}
    >
      {children}
    </Button>
  );
}

export function NavigateButton({
  href,
  toast: toastOpts,
  children,
  ...props
}: ButtonProps & { href: string; toast?: ToastOpts }) {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Button
      {...props}
      onClick={() => {
        if (toastOpts) toast(toastOpts);
        router.push(href);
      }}
    >
      {children}
    </Button>
  );
}

export function ExportReviewsButton({
  children,
  filename = "loop-reviews.json",
  ...props
}: ButtonProps & { children: ReactNode; filename?: string }) {
  const { toast } = useToast();

  return (
    <Button
      {...props}
      onClick={() => {
        const blob = new Blob([JSON.stringify(reviews, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Export ready",
          description: `Downloaded ${filename} with ${reviews.length} reviews.`,
          tone: "success",
        });
      }}
    >
      {children}
    </Button>
  );
}
