"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { getAbout } from "@/lib/about";
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
    <div className="surface surface-subtle inline-flex items-center gap-1 rounded-full p-1">
      <span className="rounded-full border border-white/50 bg-white/55 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
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
  const about = getAbout(locale);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <Container className="max-w-7xl px-0">
        <div className="surface surface-strong flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <Link
            href={localizePath("/", locale)}
            data-liquid
            className="flex items-center gap-3 rounded-[1.75rem] p-1.5 text-sm font-semibold tracking-tight"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-[1.4rem] border border-white/55 bg-white/50 text-base text-foreground shadow-card backdrop-blur-xl">
              HJ
            </span>
            <span className="flex flex-col leading-tight">
              <span>{about.name}</span>
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
                    data-liquid
                    className={cn(
                      "nav-pill",
                      active
                        ? "nav-pill-active"
                        : "border border-white/30 bg-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.56)] backdrop-blur-xl hover:text-foreground"
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
        </div>
      </Container>
    </header>
  );
}
