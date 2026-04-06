export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  {
    label: string;
    nativeLabel: string;
    shortLabel: string;
    metadataLocale: string;
    intlLocale: string;
  }
> = {
  en: {
    label: "English",
    nativeLabel: "English",
    shortLabel: "EN",
    metadataLocale: "en_US",
    intlLocale: "en-US"
  },
  zh: {
    label: "Chinese",
    nativeLabel: "中文",
    shortLabel: "中",
    metadataLocale: "zh_CN",
    intlLocale: "zh-CN"
  }
};

const localeSet = new Set<Locale>(locales);

export const secondaryLocales = locales.filter((locale) => locale !== defaultLocale);

export function isSupportedLocale(value: string): value is Locale {
  return localeSet.has(value as Locale);
}

export function resolveLocale(value: string): Locale {
  return isSupportedLocale(value) ? value : defaultLocale;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (!firstSegment) {
    return defaultLocale;
  }

  return resolveLocale(firstSegment);
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isSupportedLocale(segments[0])) {
    segments.shift();
  }

  const normalizedPath = `/${segments.join("/")}`;

  return normalizedPath === "/" ? normalizedPath : normalizedPath.replace(/\/+$/, "");
}

export function localizePath(pathname: string, locale: Locale) {
  const normalizedPath = stripLocaleFromPathname(pathname);

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function getIntlLocale(locale: Locale) {
  return localeMeta[locale].intlLocale;
}

export function getMetadataLocale(locale: Locale) {
  return localeMeta[locale].metadataLocale;
}

