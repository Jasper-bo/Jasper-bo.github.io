import Image from "next/image";

import type { About } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:items-center">
          <div className="surface surface-strong p-8 sm:p-10 lg:p-12">
            <div className="space-y-5">
              <Tag variant="accent">{dictionary.hero.badge}</Tag>
              <p className="max-w-2xl font-serif text-xl italic text-foreground/58 sm:text-2xl">
                {about.title}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                {about.name}
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-foreground/84 sm:text-2xl sm:leading-9">
                {about.tagline}
              </p>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {about.bio[0]}
              </p>
            </div>
          </div>

          <aside className="surface p-6 sm:p-8">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/25 shadow-card">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
