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
    <footer className="pb-10 pt-12 sm:pb-14 sm:pt-16">
      <Container>
        <div className="surface surface-strong grid gap-8 px-6 py-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {dictionary.footer.eyebrow}
          </p>
          <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            {dictionary.footer.title}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">
            {dictionary.footer.description}
          </p>
        </div>

        <div className="grid gap-3 rounded-[1.75rem]">
          {about.socials.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={isExternal(item.href) ? "_blank" : undefined}
              rel={isExternal(item.href) ? "noreferrer" : undefined}
              data-liquid
              className="surface surface-subtle group flex items-center justify-between rounded-[1.5rem] px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="text-sm text-muted-foreground transition group-hover:text-foreground">
                {item.value}
              </span>
            </Link>
          ))}
        </div>
        </div>
      </Container>
    </footer>
  );
}
