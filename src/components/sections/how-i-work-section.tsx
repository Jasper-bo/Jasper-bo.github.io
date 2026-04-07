import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { About } from "@/types";

interface HowIWorkSectionProps {
  about: About;
  locale: Locale;
}

export function HowIWorkSection({ about, locale }: HowIWorkSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.howIWork.eyebrow}
          title={dictionary.howIWork.title}
          description={dictionary.howIWork.description}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {about.workflow.steps.map((step, index) => (
            <article key={step.title} data-liquid className="surface surface-subtle min-h-[220px] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="surface p-6 sm:p-8">
          <p className="eyebrow">{dictionary.howIWork.principlesLabel}</p>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {about.workflow.principles.slice(0, 4).map((principle) => (
              <div
                key={principle}
                data-liquid
                className="surface surface-subtle rounded-[1.5rem] px-4 py-4 text-sm leading-7 text-foreground/82"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
