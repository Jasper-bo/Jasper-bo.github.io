import Link from "next/link";

import type { Project } from "@/types";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/cards/project-card";
import { SectionTitle } from "@/components/shared/section-title";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export function FeaturedProjectsSection({
  projects
}: FeaturedProjectsSectionProps) {
  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow="Selected Work"
          title="Featured projects with product and engineering depth"
          description="These projects reflect how I think about product framing, interface structure, and the maintainability of what ships."
          action={
            <Link href="/projects" className="button-secondary">
              See all projects
            </Link>
          }
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
