import type { Project } from "@/types";
import { defaultLocale, type Locale } from "@/lib/i18n";
import projectsEn from "@/content/en/projects.json";
import projectsZh from "@/content/zh/projects.json";

const projectsByLocale: Record<Locale, Project[]> = {
  en: projectsEn as Project[],
  zh: projectsZh as Project[]
};

function getRawProjects(locale: Locale) {
  return projectsByLocale[locale];
}

export function getProjects(locale: Locale = defaultLocale) {
  return [...getRawProjects(locale)].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
}

export function getFeaturedProjects(locale: Locale = defaultLocale, limit = 3) {
  return getProjects(locale)
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string, locale: Locale = defaultLocale) {
  return getRawProjects(locale).find((project) => project.slug === slug);
}

export function getProjectsByIds(ids: string[], locale: Locale = defaultLocale) {
  const idSet = new Set(ids);

  return getProjects(locale).filter((project) => idSet.has(project.id));
}
