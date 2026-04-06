"use client";

import { useSearchParams } from "next/navigation";

import { SkillCard } from "@/components/cards/skill-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { Project, Skill } from "@/types";

interface SkillsPageClientProps {
  locale: Locale;
  skills: Skill[];
  categories: string[];
  projects: Project[];
}

export function SkillsPageClient({
  locale,
  skills,
  categories,
  projects
}: SkillsPageClientProps) {
  const dictionary = getDictionary(locale);
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const categoryParam = searchParams.get("category");
  const activeCategory = categories.includes(categoryParam ?? "") ? categoryParam : null;
  const filteredSkills = skills.filter(
    (skill) => !activeCategory || skill.category === activeCategory
  );
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
            activeValue={activeCategory}
            searchParamsString={searchParamsString}
            options={categories.map((category) => ({
              label: category,
              value: category
            }))}
          />
        </section>

        {filteredSkills.length > 0 ? (
          <section className="grid gap-6 lg:grid-cols-2">
            {filteredSkills.map((skill) => (
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
        ) : (
          <EmptyState
            title={dictionary.skillsPage.emptyTitle}
            description={dictionary.skillsPage.emptyDescription}
          />
        )}
      </Container>
    </div>
  );
}

