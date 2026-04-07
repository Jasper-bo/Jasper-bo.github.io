import type { Metadata } from "next";

import { defaultLocale, getMetadataLocale, localizePath, locales, type Locale } from "@/lib/i18n";

export const siteConfig = {
  name: "He Junbo",
  description:
    "AI-native product explorer building a focused fitness app, a reusable content system, and a long-term personal brand around AIPM practice.",
  url: "https://junbohe.dev",
  navigation: [{ href: "/", key: "home" }] as const
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}

interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: Locale;
}

function buildLanguageAlternates(path: string) {
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localizePath(path, locale))])
  );

  return {
    ...alternates,
    "x-default": absoluteUrl(localizePath(path, defaultLocale))
  };
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.svg",
  locale = defaultLocale
}: MetadataInput): Metadata {
  const localizedPath = localizePath(path, locale);
  const url = absoluteUrl(localizedPath);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path)
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: getMetadataLocale(locale),
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}
