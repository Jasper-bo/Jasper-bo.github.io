import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { SkillCard } from "@/components/cards/skill-card";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
import { getSkillCategories, getSkills } from "@/lib/skills";
import type { Project, Skill } from "@/types";
import { SkillsPageClient } from "@/views/skills-page-client";

export function getSkillsPageMetadata(locale: Locale) {
  const metadata = getDictionary(locale).metadata.skills;

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    path: "/skills",
    locale
  });
}

interface SkillsPageViewProps {
  locale: Locale;
}

function SkillsPageFallback({
  locale,
  skills,
  categories,
  projects
}: {
  locale: Locale;
  skills: Skill[];
  categories: string[];
  projects: Project[];
}) {
  const dictionary = getDictionary(locale);
  const projectMap = new Map(
    projects.map((project) => [
      project.id,
      { id: project.id, title: project.title, slug: project.slug }
    ])
  );

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow={dictionary.skillsPage.eyebrow}
          title={dictionary.skillsPage.title}
          description={dictionary.skillsPage.description}
        />

        <section className="surface p-6 sm:p-8">
          <FilterBar
            label={dictionary.skillsPage.filterCategoryLabel}
            paramKey="category"
            allLabel={dictionary.skillsPage.filterCategoryAll}
            searchParamsString=""
            options={categories.map((category) => ({
              label: category,
              value: category
            }))}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              locale={locale}
              relatedProjects={skill.relatedProjects
                .map((projectId) => projectMap.get(projectId))
                .filter(
                  (project): project is NonNullable<typeof project> => Boolean(project)
                )}
            />
          ))}
        </section>
      </Container>
    </div>
  );
}

export function SkillsPageView({ locale }: SkillsPageViewProps) {
  const skills = getSkills(undefined, locale);
  const categories = getSkillCategories(locale);
  const projects = getProjects(locale);

  return (
    <Suspense
      fallback={
        <SkillsPageFallback
          locale={locale}
          skills={skills}
          categories={categories}
          projects={projects}
        />
      }
    >
      <SkillsPageClient
        locale={locale}
        skills={skills}
        categories={categories}
        projects={projects}
      />
    </Suspense>
  );
}
