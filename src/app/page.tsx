import { CurrentFocusSection } from "@/components/sections/current-focus-section";
import { CoreSkillsSection } from "@/components/sections/core-skills-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReadingShelfSection } from "@/components/sections/reading-shelf-section";
import { getAbout } from "@/lib/about";
import { getFeaturedBooks } from "@/lib/books";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
import { getCoreSkills } from "@/lib/skills";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "A product-grade personal brand website for projects, reading, skills, and thoughtful frontend work."
});

export default function HomePage() {
  const about = getAbout();
  const featuredProjects = getFeaturedProjects();
  const featuredBooks = getFeaturedBooks();
  const coreSkills = getCoreSkills();
  const projects = getProjects();

  return (
    <>
      <HeroSection about={about} />
      <CurrentFocusSection about={about} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <ReadingShelfSection books={featuredBooks} />
      <CoreSkillsSection skills={coreSkills} projects={projects} />
    </>
  );
}
