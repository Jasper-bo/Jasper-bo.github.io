"use client";

import { startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  label: string;
  paramKey: string;
  options: FilterOption[];
  allLabel?: string;
  activeValue?: string | null;
  searchParamsString?: string;
  className?: string;
}

export function FilterBar({
  label,
  paramKey,
  options,
  allLabel = "All",
  activeValue = "",
  searchParamsString = "",
  className
}: FilterBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const selectedValue = activeValue ?? "";

  function updateFilter(value: string) {
    const nextParams = new URLSearchParams(searchParamsString);

    if (!value) {
      nextParams.delete(paramKey);
    } else {
      nextParams.set(paramKey, value);
    }

    const query = nextParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="text-sm font-medium tracking-[0.04em] text-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateFilter("")}
          data-liquid
          className={cn(
            "filter-button",
            selectedValue === "" && "filter-button-active"
          )}
        >
          {allLabel}
        </button>
        {options.map((option) => {
          const active = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => updateFilter(option.value)}
              data-liquid
              className={cn("filter-button", active && "filter-button-active")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
