import type { Metadata } from "next";

import { getLocalizedStaticParams, resolveRouteLocale } from "@/lib/route-locale";
import {
  getProjectDetailMetadata,
  getProjectDetailStaticParams,
  ProjectDetailPageView
} from "@/views/project-detail-page";

interface LocaleProjectDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getLocalizedStaticParams().flatMap(({ locale }) =>
    getProjectDetailStaticParams(locale).map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params
}: LocaleProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  return getProjectDetailMetadata(resolveRouteLocale(locale), slug);
}

export default async function LocaleProjectDetailPage({
  params
}: LocaleProjectDetailPageProps) {
  const { locale, slug } = await params;

  return <ProjectDetailPageView locale={resolveRouteLocale(locale)} slug={slug} />;
}

