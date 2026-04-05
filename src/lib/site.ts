import type { Metadata } from "next";

export const siteConfig = {
  name: "Junbo He",
  description:
    "Product-minded frontend engineer building calm digital products around fitness, knowledge, and personal systems.",
  url: "https://junbohe.dev",
  locale: "en_US",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" }
  ]
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}

interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.svg"
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
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
