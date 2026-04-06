import { defaultLocale } from "@/lib/i18n";
import { AboutPageView, getAboutPageMetadata } from "@/views/about-page";

export const metadata = getAboutPageMetadata(defaultLocale);

export default function AboutPage() {
  return <AboutPageView locale={defaultLocale} />;
}
