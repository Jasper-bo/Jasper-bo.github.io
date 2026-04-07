import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import type { About } from "@/types";

interface SignalsSectionProps {
  about: About;
  locale: Locale;
}

export function SignalsSection({ about, locale }: SignalsSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14 lg:pb-20">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.signals.eyebrow}
          title={dictionary.signals.title}
          description={dictionary.signals.description}
          action={
            <Link href={localizePath("/books", locale)} data-liquid className="button-secondary">
              {dictionary.signals.action}
            </Link>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {about.thinkingQuestions.map((question, index) => (
            <article key={question} data-liquid className="surface surface-subtle min-h-[220px] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Q0{index + 1}
              </p>
              <p className="mt-5 text-lg leading-8 text-foreground/88">{question}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
