import { defaultLocale } from "@/lib/i18n";
import { getSkillsPageMetadata, SkillsPageView } from "@/views/skills-page";

export const metadata = getSkillsPageMetadata(defaultLocale);

export default function SkillsPage() {
  return <SkillsPageView locale={defaultLocale} />;
}
