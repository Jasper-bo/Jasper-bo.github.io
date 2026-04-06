import { CurrentFocusSection } from "@/components/sections/current-focus-section";
import { CoreSkillsSection } from "@/components/sections/core-skills-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReadingShelfSection } from "@/components/sections/reading-shelf-section";
import { getAbout } from "@/lib/about";
import { getFeaturedBooks } from "@/lib/books";
import { getDictionary } from "@/lib/dictionaries";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
import { getCoreSkills } from "@/lib/skills";
import type { Locale } from "@/lib/i18n";

export function getHomePageMetadata(locale: Locale) {
  const metadata = getDictionary(locale).metadata.home;

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    locale
  });
}

interface HomePageViewProps {
  locale: Locale;
}

export function HomePageView({ locale }: HomePageViewProps) {
  const about = getAbout(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const featuredBooks = getFeaturedBooks(locale);
  const coreSkills = getCoreSkills(locale);
  const projects = getProjects(locale);

  return (
    <>
      <HeroSection about={about} locale={locale} />
      <CurrentFocusSection about={about} locale={locale} />
      <FeaturedProjectsSection projects={featuredProjects} locale={locale} />
      <ReadingShelfSection books={featuredBooks} locale={locale} />
      <CoreSkillsSection skills={coreSkills} projects={projects} locale={locale} />
    </>
  );
}

