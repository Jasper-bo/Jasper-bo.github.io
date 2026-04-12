import Image from "next/image";

import type { About } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/shared/tag";
import { StatusChip } from "@/components/shared/status-chip";

interface HeroSectionProps {
  about: About;
  locale: Locale;
}

export function HeroSection({ about, locale }: HeroSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="hero-grid">
          <div className="hero-panel surface surface-strong p-8 sm:p-10 lg:p-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Tag variant="accent">{dictionary.hero.badge}</Tag>
                <StatusChip label={dictionary.nav.status} />
              </div>

              <p className="max-w-2xl font-serif text-xl italic text-foreground/62 sm:text-2xl">
                {about.title}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                {about.name}
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-foreground/84 sm:text-2xl sm:leading-9">
                {about.tagline}
              </p>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {about.worldview}
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {about.heroSignals.map((signal) => (
                  <StatusChip key={signal.label} label={signal.label} value={signal.value} />
                ))}
              </div>

              <div className="hero-thesis-panel">
                <p className="eyebrow">{dictionary.hero.thesisLabel}</p>
                <p className="mt-3 max-w-3xl text-base leading-8 text-foreground/86 sm:text-lg">
                  {dictionary.hero.thesis}
                </p>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {about.bio[0]}
              </p>
            </div>
          </div>

          <aside className="portrait-panel surface p-6 sm:p-8">
            <div className="portrait-panel-frame">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
            <div className="portrait-panel-caption">
              <p className="eyebrow">Observation window</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Personal signal, product judgement, and interface work held in one live frame.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
