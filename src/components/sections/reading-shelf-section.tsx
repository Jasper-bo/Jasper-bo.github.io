import Link from "next/link";

import type { Book } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { Container } from "@/components/layout/container";
import { BookCard } from "@/components/cards/book-card";
import { SectionTitle } from "@/components/shared/section-title";

interface ReadingShelfSectionProps {
  books: Book[];
  locale: Locale;
}

export function ReadingShelfSection({ books, locale }: ReadingShelfSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.readingShelf.eyebrow}
          title={dictionary.readingShelf.title}
          description={dictionary.readingShelf.description}
          action={
            <Link
              href={localizePath("/books", locale)}
              data-liquid
              className="button-secondary"
            >
              {dictionary.readingShelf.action}
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
