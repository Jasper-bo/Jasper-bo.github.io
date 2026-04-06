"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAbout } from "@/lib/about";
import { getDictionary } from "@/lib/dictionaries";
import { getLocaleFromPathname } from "@/lib/i18n";
import { Container } from "@/components/layout/container";

function isExternal(href: string) {
  return href.startsWith("http");
}

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const about = getAbout(locale);
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-border/70 py-10 sm:py-14">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {dictionary.footer.eyebrow}
          </p>
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {dictionary.footer.title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {dictionary.footer.description}
          </p>
        </div>

        <div className="grid gap-3 rounded-3xl border border-border/80 bg-white/90 p-6 shadow-card">
          {about.socials.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={isExternal(item.href) ? "_blank" : undefined}
              rel={isExternal(item.href) ? "noreferrer" : undefined}
              className="group flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 transition hover:border-foreground/20 hover:bg-muted/80"
            >
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="text-sm text-muted-foreground transition group-hover:text-foreground">
                {item.value}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
