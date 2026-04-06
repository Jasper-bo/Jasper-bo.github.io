import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { Timeline } from "@/components/shared/timeline";
import { Tag } from "@/components/shared/tag";
import { getAbout } from "@/lib/about";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/site";

export function getAboutPageMetadata(locale: Locale) {
  const metadata = getDictionary(locale).metadata.about;

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    path: "/about",
    locale
  });
}

interface AboutPageViewProps {
  locale: Locale;
}

export function AboutPageView({ locale }: AboutPageViewProps) {
  const about = getAbout(locale);
  const dictionary = getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_380px]">
          <div className="surface surface-strong p-8 sm:p-10">
            <SectionTitle
              eyebrow={dictionary.aboutPage.eyebrow}
              title={dictionary.aboutPage.title}
              description={about.tagline}
            />

            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="surface flex flex-col gap-6 p-6 sm:p-8">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/22 shadow-card">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>

            <div className="space-y-3">
              <p className="eyebrow">{dictionary.aboutPage.socials}</p>
              <div className="grid gap-3">
                {about.socials.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    data-liquid
                    className="surface surface-subtle rounded-[1.5rem] px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="surface p-8">
            <SectionTitle
              eyebrow={dictionary.aboutPage.focusAreasEyebrow}
              title={dictionary.aboutPage.focusAreasTitle}
              description={dictionary.aboutPage.focusAreasDescription}
            />
            <div className="mt-8 grid gap-4">
              {about.focusAreas.map((item) => (
                <article
                  key={item.title}
                  data-liquid
                  className="surface surface-subtle rounded-[1.75rem] p-6"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface p-8">
            <SectionTitle
              eyebrow={dictionary.aboutPage.nowEyebrow}
              title={dictionary.aboutPage.nowTitle}
              description={dictionary.aboutPage.nowDescription}
            />
            <ul className="mt-8 space-y-4">
              {about.now.map((item) => (
                <li
                  key={item}
                  data-liquid
                  className="surface surface-subtle flex gap-3 rounded-[1.5rem] px-4 py-4 text-sm leading-7 text-muted-foreground"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-foreground/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="surface p-8 sm:p-10">
          <SectionTitle
            eyebrow={dictionary.aboutPage.toolkitEyebrow}
            title={dictionary.aboutPage.toolkitTitle}
            description={dictionary.aboutPage.toolkitDescription}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.tools.map((group) => (
              <article
                key={group.category}
                data-liquid
                className="surface surface-subtle rounded-[1.75rem] p-6"
              >
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface surface-strong p-8 sm:p-10">
          <SectionTitle
            eyebrow={dictionary.aboutPage.timelineEyebrow}
            title={dictionary.aboutPage.timelineTitle}
            description={dictionary.aboutPage.timelineDescription}
          />
          <div className="mt-8">
            <Timeline items={about.timeline} />
          </div>
        </section>
      </Container>
    </div>
  );
}
