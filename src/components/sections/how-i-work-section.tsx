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

        <div className="workflow-track surface surface-subtle p-4 sm:p-6">
          {about.workflow.steps.map((step, index) => (
            <article key={step.title} data-liquid className="workflow-node">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{step.description}</p>
              <div className="workflow-output">
                <span>{dictionary.howIWork.outputLabel}</span>
                <strong>{step.output}</strong>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
