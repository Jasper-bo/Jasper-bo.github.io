import type { Metadata } from "next";

import { resolveRouteLocale } from "@/lib/route-locale";
import { getHomePageMetadata, HomePageView } from "@/views/home-page";

interface LocaleHomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params
}: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return getHomePageMetadata(resolveRouteLocale(locale));
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  return <HomePageView locale={resolveRouteLocale(locale)} />;
}

