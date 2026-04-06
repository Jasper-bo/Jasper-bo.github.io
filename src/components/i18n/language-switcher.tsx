"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import { getLocaleFromPathname, localeMeta, localizePath } from "@/lib/i18n";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const queryString = searchParams.toString();

  return (
    <div
      role="group"
      aria-label={dictionary.nav.languageLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/80 bg-white/90 p-1 shadow-sm",
        className
      )}
    >
      {Object.entries(localeMeta).map(([value, meta]) => {
        const href = localizePath(pathname, value as keyof typeof localeMeta);
        const active = locale === value;
        const nextHref = queryString ? `${href}?${queryString}` : href;

        return (
          <Link
            key={value}
            href={nextHref}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition-colors",
              active
                ? "bg-foreground text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={meta.nativeLabel}
          >
            {meta.shortLabel}
          </Link>
        );
      })}
    </div>
  );
}
