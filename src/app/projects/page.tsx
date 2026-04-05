import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "A curated project archive covering fitness products, knowledge tools, content systems, and product-minded web experiences."
});

export default function ProjectsPage() {
  const projects = getProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-14">
        <SectionTitle
          eyebrow="Projects"
          title="Products and systems built with both product thinking and frontend depth"
          description="The work here ranges from fitness-focused SaaS ideas to content systems and workflow tools. Each project aims to show what problem it solves, who it serves, and how the implementation supports that story."
        />

        <section className="space-y-8">
          <SectionTitle
            eyebrow="Featured"
            title="Projects worth starting with"
            description="These are the strongest examples of how I connect problem framing, UI structure, and engineering decisions."
          />
          <div className="grid gap-6 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionTitle
            eyebrow="Archive"
            title="More experiments and case studies"
            description="Smaller products, prototypes, and concept-driven work that still reflect my approach to shaping clear software."
          />
          <div className="grid gap-6 xl:grid-cols-2">
            {archiveProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
