import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/books", "/projects", "/skills"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));

  const projectRoutes = getProjects().map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt)
  }));

  return [...staticRoutes, ...projectRoutes];
}
