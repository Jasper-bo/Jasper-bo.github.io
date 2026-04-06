import type { About } from "@/types";
import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";
import aboutEn from "@/content/en/about.json";
import aboutZh from "@/content/zh/about.json";

const aboutByLocale: Record<Locale, About> = {
  en: aboutEn as About,
  zh: aboutZh as About
};

export function getAbout(locale: Locale = defaultLocale) {
  return aboutByLocale[locale];
}
