"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";
import { Container } from "@/components/layout/container";

function isActive(pathname: string, href: string, exact = false) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function LanguageSwitcherFallback() {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-white/90 p-1 shadow-sm">
      <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
        EN
      </span>
      <span className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground">
        中
      </span>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={localizePath("/", locale)}
          className="flex items-center gap-3 text-sm font-semibold tracking-tight"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-base text-foreground shadow-sm">
            JH
          </span>
          <span className="flex flex-col leading-tight">
            <span>Junbo He</span>
            <span className="text-xs font-medium text-muted-foreground">
              {dictionary.nav.role}
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <nav aria-label="Primary" className="flex flex-wrap gap-2">
            {siteConfig.navigation.map((item) => {
              const href = localizePath(item.href, locale);
              const active = isActive(pathname, href, item.href === "/");

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-foreground text-white shadow-sm"
                      : "text-muted-foreground hover:bg-white hover:text-foreground"
                  )}
                >
                  {dictionary.nav.links[item.key as keyof typeof dictionary.nav.links]}
                </Link>
              );
            })}
          </nav>
          <Suspense fallback={<LanguageSwitcherFallback />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </Container>
    </header>
  );
}
