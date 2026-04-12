import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { StatusChip } from "@/components/shared/status-chip";
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
        />

        <div className="signals-grid">
          <div className="grid gap-4">
            {about.thinkingQuestions.map((question, index) => (
              <article
                key={question.id}
                data-liquid
                className={`signal-card surface surface-subtle rounded-[1.75rem] p-6 ${index === 0 ? "signal-card-featured" : ""}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {question.id}
                  </p>
                  <StatusChip label={question.status} value={question.theme} />
                </div>
                <p className="mt-5 text-lg leading-8 text-foreground/88">{question.prompt}</p>
              </article>
            ))}
          </div>

          <aside className="channel-panel surface p-6 sm:p-8">
            <div className="space-y-3">
              {about.socials.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  data-liquid
                  className="channel-link surface surface-subtle flex items-center justify-between rounded-[1.5rem] px-4 py-4"
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs leading-6 text-muted-foreground">{item.note}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 border-t border-white/18 pt-6">
              <Link href={localizePath("/books", locale)} data-liquid className="button-secondary">
                {dictionary.signals.action}
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
