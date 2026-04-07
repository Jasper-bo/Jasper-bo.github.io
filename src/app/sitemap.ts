import type { MetadataRoute } from "next";

import { locales, localizePath } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/books"];

  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}${localizePath(path || "/", locale)}`,
      lastModified: new Date()
    }))
  );

  const projectRoutes = locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      url: `${siteConfig.url}${localizePath(`/projects/${project.slug}`, locale)}`,
      lastModified: new Date(project.updatedAt)
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}
