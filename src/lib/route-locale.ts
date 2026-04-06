import { notFound } from "next/navigation";

import { defaultLocale, isSupportedLocale, secondaryLocales, type Locale } from "@/lib/i18n";

export function resolveRouteLocale(locale: string): Locale {
  if (!isSupportedLocale(locale) || locale === defaultLocale) {
    notFound();
  }

  return locale;
}

export function getLocalizedStaticParams() {
  return secondaryLocales.map((locale) => ({ locale }));
}

