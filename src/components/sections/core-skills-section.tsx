import Link from "next/link";

import type { Project, Skill } from "@/types";
import { Container } from "@/components/layout/container";
import { SkillCard } from "@/components/cards/skill-card";
import { SectionTitle } from "@/components/shared/section-title";

interface CoreSkillsSectionProps {
  skills: Skill[];
  projects: Project[];
}

export function CoreSkillsSection({
  skills,
  projects
}: CoreSkillsSectionProps) {
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
          eyebrow="Capabilities"
          title="Core skills I bring to product work"
          description="Beyond a tool list, these are the capabilities I rely on most when turning ideas into shippable, maintainable products."
          action={
            <Link href="/skills" className="button-secondary">
              Explore all skills
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
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
