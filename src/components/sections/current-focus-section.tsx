import type { About } from "@/types";

import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";

interface CurrentFocusSectionProps {
  about: About;
}

export function CurrentFocusSection({ about }: CurrentFocusSectionProps) {
  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow="Current Focus"
          title="What I am building and learning right now"
          description="A compact snapshot of the work streams shaping my recent projects, writing, and experiments."
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
