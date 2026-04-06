import type { Metadata } from "next";

import { resolveRouteLocale } from "@/lib/route-locale";
import { getSkillsPageMetadata, SkillsPageView } from "@/views/skills-page";

interface LocaleSkillsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params
}: LocaleSkillsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getSkillsPageMetadata(resolveRouteLocale(locale));
}

export default async function LocaleSkillsPage({
  params
}: LocaleSkillsPageProps) {
  const { locale } = await params;

  return <SkillsPageView locale={resolveRouteLocale(locale)} />;
}
