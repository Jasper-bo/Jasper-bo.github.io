import { defaultLocale } from "@/lib/i18n";
import { getHomePageMetadata, HomePageView } from "@/views/home-page";

export const metadata = getHomePageMetadata(defaultLocale);

export default function HomePage() {
  return <HomePageView locale={defaultLocale} />;
}
