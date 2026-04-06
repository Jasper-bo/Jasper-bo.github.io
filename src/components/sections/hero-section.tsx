import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { About } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/shared/tag";

interface HeroSectionProps {
  about: About;
  locale: Locale;
}

export function HeroSection({ about, locale }: HeroSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_380px]">
          <div className="surface surface-strong p-8 sm:p-10 lg:p-12">
            <div className="absolute right-[-12%] top-[-18%] h-52 w-52 rounded-full bg-white/45 blur-3xl" />
            <div className="space-y-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <Tag variant="accent">{dictionary.hero.badge}</Tag>
                <div className="surface surface-subtle max-w-xs rounded-[1.5rem] p-4">
                  <p className="eyebrow">{dictionary.hero.focusEyebrow}</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/82">
                    {dictionary.hero.focusTitle}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="max-w-2xl font-serif text-xl italic text-foreground/58 sm:text-2xl">
                  {about.title}
                </p>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                  {about.name}
                </h1>
                <p className="max-w-3xl text-xl leading-8 text-foreground/84 sm:text-2xl sm:leading-9">
                  {about.tagline}
                </p>
              </div>

              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {about.bio[0]}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={localizePath("/projects", locale)}
                  data-liquid
                  className="button-primary"
                >
                  {dictionary.hero.ctaProjects}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localizePath("/about", locale)}
                  data-liquid
                  className="button-secondary"
                >
                  {dictionary.hero.ctaAbout}
                </Link>
              </div>

              <div className="grid gap-3 pt-2 md:grid-cols-3">
                {about.focusAreas.map((item, index) => (
                  <article
                    key={item.title}
                    data-liquid
                    className="surface surface-subtle min-h-[164px] rounded-[1.6rem] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      0{index + 1}
                    </p>
                    <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="surface flex flex-col gap-6 p-6 sm:p-8">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/25 shadow-card">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {dictionary.hero.focusEyebrow}
                </p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-foreground">
                  {dictionary.hero.focusTitle}
                </p>
              </div>

              <ul className="space-y-3">
                {about.now.map((item, index) => (
                  <li
                    key={item}
                    data-liquid
                    className="surface surface-subtle rounded-[1.5rem] px-4 py-4 text-sm leading-7 text-muted-foreground"
                  >
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <span className="text-foreground/82">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="surface surface-subtle rounded-[1.5rem] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {dictionary.hero.badge}
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground/82">
                  {about.bio[1]}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
