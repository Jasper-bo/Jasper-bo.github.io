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
        "inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-[0.16em] backdrop-blur-xl",
        variant === "accent" &&
          "border border-white/46 bg-[linear-gradient(135deg,rgba(255,255,255,0.65),rgba(217,229,236,0.32))] text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.68)]",
        variant === "neutral" &&
          "border border-white/36 bg-[linear-gradient(135deg,rgba(255,255,255,0.44),rgba(233,239,245,0.18))] text-foreground/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.56)]",
        variant === "outline" &&
          "border border-white/34 bg-white/16 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
        className
      )}
    >
      {children}
    </span>
  );
}
