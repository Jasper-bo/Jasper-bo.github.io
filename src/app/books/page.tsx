import { BookCard } from "@/components/cards/book-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SectionTitle } from "@/components/shared/section-title";
import { getBookCategories, getBookStatuses, filterBooks } from "@/lib/books";
import { buildMetadata } from "@/lib/site";
import type { BookStatus } from "@/types";

export const metadata = buildMetadata({
  title: "Books",
  description:
    "Books on product, startup thinking, habits, and technical growth that continue to shape how I build."
});

interface BooksPageProps {
  searchParams: Promise<{
    status?: string;
    category?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const categories = getBookCategories();
  const statuses = getBookStatuses();

  const status = statuses.includes(params.status as BookStatus)
    ? (params.status as BookStatus)
    : null;
  const category = categories.includes(params.category ?? "") ? params.category ?? null : null;
  const books = filterBooks({ status, category });

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-10">
        <SectionTitle
          eyebrow="Books"
          title="Reading that informs product judgement and personal growth"
          description="A structured bookshelf with reading status, category filters, key takeaways, and recommendations worth revisiting."
        />

        <section className="surface p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <FilterBar
              label="Filter by status"
              paramKey="status"
              allLabel="All status"
              options={statuses.map((item) => ({
                label:
                  item === "wishlist"
                    ? "Wishlist"
                    : item === "reading"
                      ? "Reading"
                      : "Completed",
                value: item
              }))}
            />
            <FilterBar
              label="Filter by category"
              paramKey="category"
              allLabel="All categories"
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
              <BookCard key={book.id} book={book} />
            ))}
          </section>
        ) : (
          <EmptyState
            title="No books match these filters"
            description="Try clearing one of the filters to see the rest of the reading list."
          />
        )}
      </Container>
    </div>
  );
}
