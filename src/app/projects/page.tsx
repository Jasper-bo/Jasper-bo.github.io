import { defaultLocale } from "@/lib/i18n";
import { getProjectsPageMetadata, ProjectsPageView } from "@/views/projects-page";

export const metadata = getProjectsPageMetadata(defaultLocale);

export default function ProjectsPage() {
  return <ProjectsPageView locale={defaultLocale} />;
}
