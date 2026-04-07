import { CurrentBuildSection } from "@/components/sections/current-build-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowIWorkSection } from "@/components/sections/how-i-work-section";
import { SignalsSection } from "@/components/sections/signals-section";
import { getAbout } from "@/lib/about";
import { getDictionary } from "@/lib/dictionaries";
import { getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
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

function getHomepageProject(locale: Locale) {
  const project = getProjectBySlug("fitness-app", locale);

  if (!project) {
    throw new Error("Missing required homepage project: fitness-app");
  }

  return project;
}

export function HomePageView({ locale }: HomePageViewProps) {
  const about = getAbout(locale);
  const featuredProject = getHomepageProject(locale);

  return (
    <>
      <HeroSection about={about} locale={locale} />
      <CurrentBuildSection project={featuredProject} locale={locale} />
      <HowIWorkSection about={about} locale={locale} />
      <SignalsSection about={about} locale={locale} />
    </>
  );
}
