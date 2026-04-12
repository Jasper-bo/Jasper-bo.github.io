import { Tag } from "@/components/shared/tag";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/types";
import { StatusChip } from "@/components/shared/status-chip";

interface CurrentBuildSectionProps {
  project: Project;
  locale: Locale;
}

export function CurrentBuildSection({ project, locale }: CurrentBuildSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.currentBuild.eyebrow}
          title={dictionary.currentBuild.title}
          description={dictionary.currentBuild.description}
        />

        <div className="mission-grid">
          <article className="mission-panel surface surface-strong p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag variant="accent">{dictionary.projectStatuses[project.status]}</Tag>
              <StatusChip label="Proof point" value={project.title} />
            </div>

            <div className="mt-6 space-y-5">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {project.title}
              </h3>
              <p className="text-lg leading-8 text-foreground/84">{project.tagline}</p>
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <p className="eyebrow">Why this build exists</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Mission framing</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            <article data-liquid className="mission-readout surface surface-subtle min-h-[172px] p-5">
              <p className="eyebrow">{dictionary.currentBuild.audienceLabel}</p>
              <p className="mt-4 text-base leading-8 text-foreground/88">
                {project.targetUsers.slice(0, 2).join(" / ")}
              </p>
            </article>

            <article data-liquid className="mission-readout surface surface-subtle min-h-[172px] p-5">
              <p className="eyebrow">{dictionary.currentBuild.constraintLabel}</p>
              <p className="mt-4 text-base leading-8 text-foreground/88">{project.goal}</p>
            </article>

            <article data-liquid className="mission-readout surface surface-subtle min-h-[172px] p-5">
              <p className="eyebrow">{dictionary.currentBuild.thesisLabel}</p>
              <p className="mt-4 text-base leading-8 text-foreground/88">{project.solution}</p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
