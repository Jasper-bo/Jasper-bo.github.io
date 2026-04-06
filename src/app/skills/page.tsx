import { defaultLocale } from "@/lib/i18n";
import { getSkillsPageMetadata, SkillsPageView } from "@/views/skills-page";

export const metadata = getSkillsPageMetadata(defaultLocale);

interface SkillsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  return <SkillsPageView locale={defaultLocale} searchParams={await searchParams} />;
}
