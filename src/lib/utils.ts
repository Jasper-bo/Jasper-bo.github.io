import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { defaultLocale, getIntlLocale, type Locale } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locale: Locale = defaultLocale) {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}

export function toTitleCase(value: string) {
  return value.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

export function uniq<T>(values: T[]) {
  return Array.from(new Set(values));
}
