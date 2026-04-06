import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";

export function getProjectsPageMetadata(locale: Locale) {
  const metadata = getDictionary(locale).metadata.projects;

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    path: "/projects",
    locale
  });
}

interface ProjectsPageViewProps {
  locale: Locale;
}

export function ProjectsPageView({ locale }: ProjectsPageViewProps) {
  const dictionary = getDictionary(locale);
  const projects = getProjects(locale);
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-14">
        <SectionTitle
          eyebrow={dictionary.projectsPage.eyebrow}
          title={dictionary.projectsPage.title}
          description={dictionary.projectsPage.description}
        />

        <section className="space-y-8">
          <SectionTitle
            eyebrow={dictionary.projectsPage.featuredEyebrow}
            title={dictionary.projectsPage.featuredTitle}
            description={dictionary.projectsPage.featuredDescription}
          />
          <div className="grid gap-6 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </div>
        </section>

        {archiveProjects.length ? (
          <section className="space-y-8">
            <SectionTitle
              eyebrow={dictionary.projectsPage.archiveEyebrow}
              title={dictionary.projectsPage.archiveTitle}
              description={dictionary.projectsPage.archiveDescription}
            />
            <div className="grid gap-6 xl:grid-cols-2">
              {archiveProjects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
