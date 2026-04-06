import { defaultLocale } from "@/lib/i18n";
import { BooksPageView, getBooksPageMetadata } from "@/views/books-page";

export const metadata = getBooksPageMetadata(defaultLocale);

export default function BooksPage() {
  return <BooksPageView locale={defaultLocale} />;
}
