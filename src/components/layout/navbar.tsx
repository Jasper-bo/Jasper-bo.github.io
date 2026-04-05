"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-base text-foreground shadow-sm">
            JH
          </span>
          <span className="flex flex-col leading-tight">
            <span>Junbo He</span>
            <span className="text-xs font-medium text-muted-foreground">
              Product-minded Frontend Engineer
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap gap-2">
          {siteConfig.navigation.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-foreground text-white shadow-sm"
                    : "text-muted-foreground hover:bg-white hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
