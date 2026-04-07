import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { locales, localizePath } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

describe("sitemap", () => {
  it("keeps only home, books, and project detail pages in the public route surface", () => {
    const urls = sitemap().map((entry) => entry.url);

    const expectedStaticUrls = locales.flatMap((locale) =>
      ["", "/books"].map((path) => `${siteConfig.url}${localizePath(path || "/", locale)}`)
    );

    const expectedProjectUrls = locales.flatMap((locale) =>
      getProjects(locale).map(
        (project) => `${siteConfig.url}${localizePath(`/projects/${project.slug}`, locale)}`
      )
    );

    expect(urls).toEqual(expect.arrayContaining([...expectedStaticUrls, ...expectedProjectUrls]));

    for (const retiredPath of ["/about", "/projects", "/skills"]) {
      for (const locale of locales) {
        expect(urls).not.toContain(`${siteConfig.url}${localizePath(retiredPath, locale)}`);
      }
    }
  });
});
