import booksData from "@/content/books.json";
import type { Book, BookStatus } from "@/types";
import { uniq } from "@/lib/utils";

const statusOrder: Record<BookStatus, number> = {
  reading: 0,
  completed: 1,
  wishlist: 2
};

function getRawBooks() {
  return booksData as Book[];
}

export function getBooks() {
  return [...getRawBooks()].sort((left, right) => {
    const byStatus = statusOrder[left.status] - statusOrder[right.status];

    if (byStatus !== 0) {
      return byStatus;
    }

    return right.rating - left.rating;
  });
}

export function filterBooks(filters?: {
  status?: BookStatus | null;
  category?: string | null;
}) {
  return getBooks().filter((book) => {
    const matchesStatus = !filters?.status || book.status === filters.status;
    const matchesCategory =
      !filters?.category || book.category === filters.category;

    return matchesStatus && matchesCategory;
  });
}

export function getBookCategories() {
  return uniq(getRawBooks().map((book) => book.category)).sort((left, right) =>
    left.localeCompare(right)
  );
}

export function getBookStatuses() {
  return uniq(getRawBooks().map((book) => book.status)).sort(
    (left, right) => statusOrder[left] - statusOrder[right]
  );
}

export function getFeaturedBooks(limit = 3) {
  return getBooks()
    .filter((book) => book.recommend || book.status === "reading")
    .slice(0, limit);
}
