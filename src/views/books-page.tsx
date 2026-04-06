import { BookCard } from "@/components/cards/book-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getBookCategories, getBookStatuses, filterBooks } from "@/lib/books";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/site";
import type { BookStatus } from "@/types";

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
  searchParams: {
    status?: string;
    category?: string;
  };
}

export function BooksPageView({ locale, searchParams }: BooksPageViewProps) {
  const dictionary = getDictionary(locale);
  const searchParamsString = new URLSearchParams(
    Object.entries(searchParams).flatMap(([key, value]) =>
      typeof value === "string" ? [[key, value]] : []
    )
  ).toString();
  const categories = getBookCategories(locale);
  const statuses = getBookStatuses(locale);

  const status = statuses.includes(searchParams.status as BookStatus)
    ? (searchParams.status as BookStatus)
    : null;
  const category =
    categories.includes(searchParams.category ?? "") ? searchParams.category ?? null : null;
  const books = filterBooks({ status, category, locale });

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

        {books.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
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
