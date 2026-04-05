import projectsData from "@/content/projects.json";
import type { Project } from "@/types";

function getRawProjects() {
  return projectsData as Project[];
}

export function getProjects() {
  return [...getRawProjects()].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
}

export function getFeaturedProjects(limit = 3) {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string) {
  return getRawProjects().find((project) => project.slug === slug);
}

export function getProjectsByIds(ids: string[]) {
  const idSet = new Set(ids);

  return getProjects().filter((project) => idSet.has(project.id));
}
