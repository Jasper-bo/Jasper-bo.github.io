import type { Metadata } from "next";

import { resolveRouteLocale } from "@/lib/route-locale";
import { BooksPageView, getBooksPageMetadata } from "@/views/books-page";

interface LocaleBooksPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    status?: string;
    category?: string;
  }>;
}

export async function generateMetadata({
  params
}: LocaleBooksPageProps): Promise<Metadata> {
  const { locale } = await params;

  return getBooksPageMetadata(resolveRouteLocale(locale));
}

export default async function LocaleBooksPage({
  params,
  searchParams
}: LocaleBooksPageProps) {
  const { locale } = await params;

  return (
    <BooksPageView
      locale={resolveRouteLocale(locale)}
      searchParams={await searchParams}
    />
  );
}

