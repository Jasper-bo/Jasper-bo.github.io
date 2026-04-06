import Link from "next/link";

import type { Project, Skill } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { SkillCard } from "@/components/cards/skill-card";
import { SectionTitle } from "@/components/shared/section-title";

interface CoreSkillsSectionProps {
  skills: Skill[];
  projects: Project[];
  locale: Locale;
}

export function CoreSkillsSection({
  skills,
  projects,
  locale
}: CoreSkillsSectionProps) {
  const dictionary = getDictionary(locale);
  const projectMap = new Map(
    projects.map((project) => [
      project.id,
      { id: project.id, title: project.title, slug: project.slug }
    ])
  );

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.coreSkills.eyebrow}
          title={dictionary.coreSkills.title}
          description={dictionary.coreSkills.description}
          action={
            <Link href={localizePath("/skills", locale)} className="button-secondary">
              {dictionary.coreSkills.action}
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              locale={locale}
              relatedProjects={skill.relatedProjects
                .map((projectId) => projectMap.get(projectId))
                .filter((project): project is NonNullable<typeof project> => Boolean(project))}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
