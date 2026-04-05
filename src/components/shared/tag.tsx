import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  variant?: "neutral" | "accent" | "outline";
  className?: string;
}

export function Tag({
  children,
  variant = "neutral",
  className
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variant === "accent" &&
          "bg-accent-soft text-accent-foreground ring-1 ring-inset ring-accent/10",
        variant === "neutral" && "bg-muted text-foreground",
        variant === "outline" &&
          "border border-border bg-white text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
