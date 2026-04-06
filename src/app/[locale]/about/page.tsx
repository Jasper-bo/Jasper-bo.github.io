import type { Metadata } from "next";

import { resolveRouteLocale } from "@/lib/route-locale";
import { AboutPageView, getAboutPageMetadata } from "@/views/about-page";

interface LocaleAboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params
}: LocaleAboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getAboutPageMetadata(resolveRouteLocale(locale));
}

export default async function LocaleAboutPage({ params }: LocaleAboutPageProps) {
  const { locale } = await params;

  return <AboutPageView locale={resolveRouteLocale(locale)} />;
}

