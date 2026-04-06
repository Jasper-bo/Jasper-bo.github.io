import type { ReactNode } from "react";

import { getLocalizedStaticParams, resolveRouteLocale } from "@/lib/route-locale";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return getLocalizedStaticParams();
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  resolveRouteLocale(locale);

  return children;
}

