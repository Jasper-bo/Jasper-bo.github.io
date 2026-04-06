import { defaultLocale } from "@/lib/i18n";
import { BooksPageView, getBooksPageMetadata } from "@/views/books-page";

export const metadata = getBooksPageMetadata(defaultLocale);

interface BooksPageProps {
  searchParams: Promise<{
    status?: string;
    category?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  return <BooksPageView locale={defaultLocale} searchParams={await searchParams} />;
}
