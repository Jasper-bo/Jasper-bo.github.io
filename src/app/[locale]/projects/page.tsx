import type { Metadata } from "next";

import { resolveRouteLocale } from "@/lib/route-locale";
import { getProjectsPageMetadata, ProjectsPageView } from "@/views/projects-page";

interface LocaleProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params
}: LocaleProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getProjectsPageMetadata(resolveRouteLocale(locale));
}

export default async function LocaleProjectsPage({
  params
}: LocaleProjectsPageProps) {
  const { locale } = await params;

  return <ProjectsPageView locale={resolveRouteLocale(locale)} />;
}

