"use client";

import { useSearchParams } from "next/navigation";

import { BookCard } from "@/components/cards/book-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { Book, BookStatus } from "@/types";

interface BooksPageClientProps {
  locale: Locale;
  books: Book[];
  categories: string[];
  statuses: BookStatus[];
}

export function BooksPageClient({
  locale,
  books,
  categories,
  statuses
}: BooksPageClientProps) {
  const dictionary = getDictionary(locale);
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const statusParam = searchParams.get("status");
  const categoryParam = searchParams.get("category");
  const status = statuses.includes(statusParam as BookStatus)
    ? (statusParam as BookStatus)
    : null;
  const category = categories.includes(categoryParam ?? "") ? categoryParam : null;
  const filteredBooks = books.filter((book) => {
    const matchesStatus = !status || book.status === status;
    const matchesCategory = !category || book.category === category;

    return matchesStatus && matchesCategory;
  });

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
              activeValue={status}
              searchParamsString={searchParamsString}
              options={statuses.map((item) => ({
                label: dictionary.bookStatuses[item],
                value: item
              }))}
            />
            <FilterBar
              label={dictionary.booksPage.filterCategoryLabel}
              paramKey="category"
              allLabel={dictionary.booksPage.filterCategoryAll}
              activeValue={category}
              searchParamsString={searchParamsString}
              options={categories.map((item) => ({
                label: item,
                value: item
              }))}
            />
          </div>
        </section>

        {filteredBooks.length > 0 ? (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} locale={locale} />
            ))}
          </section>
        ) : (
          <EmptyState
            title={dictionary.booksPage.emptyTitle}
            description={dictionary.booksPage.emptyDescription}
          />
        )}
      </Container>
    </div>
  );
}
