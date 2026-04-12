import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { Footer } from "@/components/layout/footer";
import { LiquidGlassController } from "@/components/layout/liquid-glass-controller";
import { Navbar } from "@/components/layout/navbar";
import { SiteAtmosphere } from "@/components/layout/site-atmosphere";
import { siteConfig } from "@/lib/site";
import { defaultLocale, getMetadataLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Product-minded Frontend Engineer`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "personal website",
    "portfolio",
    "frontend engineer",
    "product thinking",
    "next.js blog"
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.url,
    locale: getMetadataLocale(defaultLocale)
  },
  twitter: {
    card: "summary_large_image"
  }
};

export const viewport: Viewport = {
  themeColor: "#071018",
  width: "device-width",
  initialScale: 1
};

interface RootLayoutProps {
  children: ReactNode;
}

export function SiteFrame({ children }: RootLayoutProps) {
  return (
    <>
      <LiquidGlassController />
      <SiteAtmosphere />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
