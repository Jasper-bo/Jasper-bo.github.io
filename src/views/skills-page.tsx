import { SkillCard } from "@/components/cards/skill-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
import { getSkillCategories, getSkills } from "@/lib/skills";

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
  searchParams: {
    category?: string;
  };
}

export function SkillsPageView({ locale, searchParams }: SkillsPageViewProps) {
  const dictionary = getDictionary(locale);
  const searchParamsString = new URLSearchParams(
    Object.entries(searchParams).flatMap(([key, value]) =>
      typeof value === "string" ? [[key, value]] : []
    )
  ).toString();
  const categories = getSkillCategories(locale);
  const activeCategory =
    categories.includes(searchParams.category ?? "") ? searchParams.category ?? null : null;
  const skills = getSkills(activeCategory, locale);
  const projects = getProjects(locale);
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

        {skills.length > 0 ? (
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
