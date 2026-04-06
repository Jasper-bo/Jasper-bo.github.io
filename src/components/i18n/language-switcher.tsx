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
        "surface surface-subtle inline-flex items-center gap-1 rounded-full p-1",
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
            data-liquid
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition-colors",
              active
                ? "border border-white/20 bg-foreground/88 text-white shadow-[0_16px_34px_-24px_rgba(24,38,60,0.44)]"
                : "text-muted-foreground hover:text-foreground"
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
