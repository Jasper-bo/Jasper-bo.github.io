import Link from "next/link";

import type { Project } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/cards/project-card";
import { SectionTitle } from "@/components/shared/section-title";

interface FeaturedProjectsSectionProps {
  projects: Project[];
  locale: Locale;
}

export function FeaturedProjectsSection({
  projects,
  locale
}: FeaturedProjectsSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.featuredProjects.eyebrow}
          title={dictionary.featuredProjects.title}
          description={dictionary.featuredProjects.description}
          action={
            <Link href={localizePath("/projects", locale)} className="button-secondary">
              {dictionary.featuredProjects.action}
            </Link>
          }
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
