import { Tag } from "@/components/shared/tag";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/types";

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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <article className="surface surface-strong p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag variant="accent">{dictionary.projectStatuses[project.status]}</Tag>
              {project.tags.map((tag) => (
                <Tag key={tag} variant="outline">
                  {tag}
                </Tag>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {project.title}
              </h3>
              <p className="text-lg leading-8 text-foreground/84">{project.tagline}</p>
              <p className="text-base leading-8 text-muted-foreground">{project.description}</p>
            </div>
          </article>

          <div className="grid gap-4">
            <article data-liquid className="surface surface-subtle min-h-[180px] p-5">
              <p className="eyebrow">{dictionary.currentBuild.audienceLabel}</p>
              <p className="mt-4 text-base leading-8 text-foreground/88">
                {project.targetUsers.slice(0, 2).join(" / ")}
              </p>
            </article>

            <article data-liquid className="surface surface-subtle min-h-[180px] p-5">
              <p className="eyebrow">{dictionary.currentBuild.problemLabel}</p>
              <p className="mt-4 text-base leading-8 text-foreground/88">{project.problem}</p>
            </article>

            <article data-liquid className="surface surface-subtle min-h-[180px] p-5">
              <p className="eyebrow">{dictionary.currentBuild.approachLabel}</p>
              <p className="mt-4 text-base leading-8 text-foreground/88">{project.solution}</p>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
