import { Suspense } from "react";

import { BookCard } from "@/components/cards/book-card";
import { Container } from "@/components/layout/container";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getBookCategories, getBooks, getBookStatuses } from "@/lib/books";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/site";
import type { Book, BookStatus } from "@/types";
import { BooksPageClient } from "@/views/books-page-client";

export function getBooksPageMetadata(locale: Locale) {
  const metadata = getDictionary(locale).metadata.books;

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    path: "/books",
    locale
  });
}

interface BooksPageViewProps {
  locale: Locale;
}

function BooksPageFallback({
  locale,
  books,
  categories,
  statuses
}: {
  locale: Locale;
  books: Book[];
  categories: string[];
  statuses: BookStatus[];
}) {
  const dictionary = getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow={dictionary.booksPage.eyebrow}
          title={dictionary.booksPage.title}
          description={dictionary.booksPage.description}
        />

        <section className="surface p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <FilterBar
              label={dictionary.booksPage.filterStatusLabel}
              paramKey="status"
              allLabel={dictionary.booksPage.filterStatusAll}
              searchParamsString=""
              options={statuses.map((item) => ({
                label: dictionary.bookStatuses[item],
                value: item
              }))}
            />
            <FilterBar
              label={dictionary.booksPage.filterCategoryLabel}
              paramKey="category"
              allLabel={dictionary.booksPage.filterCategoryAll}
              searchParamsString=""
              options={categories.map((item) => ({
                label: item,
                value: item
              }))}
            />
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} locale={locale} />
          ))}
        </section>
      </Container>
    </div>
  );
}

export function BooksPageView({ locale }: BooksPageViewProps) {
  const books = getBooks(locale);
  const categories = getBookCategories(locale);
  const statuses = getBookStatuses(locale);

  return (
    <Suspense
      fallback={
        <BooksPageFallback
          locale={locale}
          books={books}
          categories={categories}
          statuses={statuses}
        />
      }
    >
      <BooksPageClient
        locale={locale}
        books={books}
        categories={categories}
        statuses={statuses}
      />
    </Suspense>
  );
}
