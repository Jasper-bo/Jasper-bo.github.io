import { SkillCard } from "@/components/cards/skill-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
import { getSkillCategories, getSkills } from "@/lib/skills";

export const metadata = buildMetadata({
  title: "Skills",
  description:
    "A capability-focused skills page covering frontend engineering, product thinking, UI structuring, and AI-assisted workflows."
});

interface SkillsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  const params = await searchParams;
  const categories = getSkillCategories();
  const activeCategory = categories.includes(params.category ?? "")
    ? params.category ?? null
    : null;
  const skills = getSkills(activeCategory);
  const projects = getProjects();
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
          eyebrow="Skills"
          title="Capabilities, not just a tool list"
          description="This page is meant to show how I work in practice: where each skill is useful, what level I can operate at, and which projects best demonstrate it."
        />

        <section className="surface p-6 sm:p-8">
          <FilterBar
            label="Filter by category"
            paramKey="category"
            allLabel="All categories"
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
            title="No skills in this category"
            description="Try another filter to explore the rest of the capability map."
          />
        )}
      </Container>
    </div>
  );
}
