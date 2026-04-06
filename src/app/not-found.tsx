"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";
import { getDictionary } from "@/lib/dictionaries";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);

  return (
    <div className="py-24">
      <Container>
        <div className="surface surface-strong mx-auto max-w-2xl p-10 text-center">
          <p className="eyebrow">{dictionary.notFound.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
            {dictionary.notFound.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            {dictionary.notFound.description}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href={localizePath("/", locale)} data-liquid className="button-primary">
              {dictionary.notFound.backHome}
            </Link>
            <Link
              href={localizePath("/projects", locale)}
              data-liquid
              className="button-secondary"
            >
              {dictionary.notFound.browseProjects}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
