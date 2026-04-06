import type { Book, BookStatus } from "@/types";
import { uniq } from "@/lib/utils";
import { defaultLocale, type Locale } from "@/lib/i18n";
import booksEn from "@/content/en/books.json";
import booksZh from "@/content/zh/books.json";

const statusOrder: Record<BookStatus, number> = {
  reading: 0,
  completed: 1,
  wishlist: 2
};

const booksByLocale: Record<Locale, Book[]> = {
  en: booksEn as Book[],
  zh: booksZh as Book[]
};

function getRawBooks(locale: Locale) {
  return booksByLocale[locale];
}

export function getBooks(locale: Locale = defaultLocale) {
  return [...getRawBooks(locale)].sort((left, right) => {
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
  locale?: Locale;
}) {
  return getBooks(filters?.locale ?? defaultLocale).filter((book) => {
    const matchesStatus = !filters?.status || book.status === filters.status;
    const matchesCategory =
      !filters?.category || book.category === filters.category;

    return matchesStatus && matchesCategory;
  });
}

export function getBookCategories(locale: Locale = defaultLocale) {
  return uniq(getRawBooks(locale).map((book) => book.category)).sort((left, right) =>
    left.localeCompare(right, locale)
  );
}

export function getBookStatuses(locale: Locale = defaultLocale) {
  return uniq(getRawBooks(locale).map((book) => book.status)).sort(
    (left, right) => statusOrder[left] - statusOrder[right]
  );
}

export function getFeaturedBooks(locale: Locale = defaultLocale, limit = 3) {
  return getBooks(locale)
    .filter((book) => book.recommend || book.status === "reading")
    .slice(0, limit);
}
