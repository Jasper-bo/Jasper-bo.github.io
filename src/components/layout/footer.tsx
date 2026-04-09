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
        <div className="final-transmission surface surface-subtle grid gap-6 px-6 py-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {dictionary.footer.eyebrow}
            </p>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {dictionary.footer.title}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              {dictionary.footer.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 self-end text-sm text-muted-foreground">
            {about.socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={isExternal(item.href) ? "_blank" : undefined}
                rel={isExternal(item.href) ? "noreferrer" : undefined}
                data-liquid
                className="transition hover:text-foreground"
              >
                {item.label} / {item.value}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
