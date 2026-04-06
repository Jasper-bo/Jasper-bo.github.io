import type { About } from "@/types";
import type { Locale } from "@/lib/i18n";

import { getDictionary } from "@/lib/dictionaries";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";

interface CurrentFocusSectionProps {
  about: About;
  locale: Locale;
}

export function CurrentFocusSection({ about, locale }: CurrentFocusSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.currentFocus.eyebrow}
          title={dictionary.currentFocus.title}
          description={dictionary.currentFocus.description}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {about.now.map((item, index) => (
            <article key={item} className="surface p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                0{index + 1}
              </p>
              <p className="text-base leading-8 text-foreground/90">{item}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
