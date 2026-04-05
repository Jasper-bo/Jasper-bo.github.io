import Link from "next/link";

import type { Book } from "@/types";
import { Container } from "@/components/layout/container";
import { BookCard } from "@/components/cards/book-card";
import { SectionTitle } from "@/components/shared/section-title";

interface ReadingShelfSectionProps {
  books: Book[];
}

export function ReadingShelfSection({ books }: ReadingShelfSectionProps) {
  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow="Reading"
          title="Books shaping my product and engineering thinking"
          description="A small reading shelf covering product judgment, systems thinking, habits, and the craft of building with more clarity."
          action={
            <Link href="/books" className="button-secondary">
              Browse all books
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Container>
    </section>
  );
}
