# Books Grid Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the books archive feel much denser by moving to a 3-column bookshelf pattern earlier and redesigning each book card into a compact browse-first tile.

**Architecture:** Keep the existing books route, filters, and content model, but reduce the visual footprint in two places: the archive grid and the `BookCard` component. Use TDD to lock in the new grid classes and the compact-card behavior before changing production code.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Vitest, React Testing Library

---

## File Structure

### Create

- `tests/views/books-page-layout.test.tsx` — regression tests for the denser 3-column books grid
- `tests/components/book-card.test.tsx` — regression tests for compact book-card behavior

### Modify

- `src/views/books-page.tsx` — tighten the fallback books grid classes
- `src/views/books-page-client.tsx` — tighten the client books grid classes
- `src/components/cards/book-card.tsx` — convert the book card into a compact browse-first layout

## Task 1: Lock the denser books grid with tests

**Files:**
- Create: `tests/views/books-page-layout.test.tsx`
- Modify later: `src/views/books-page.tsx`
- Modify later: `src/views/books-page-client.tsx`

- [ ] **Step 1: Write the failing grid regression test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BooksPageView } from "@/views/books-page";

describe("BooksPageView", () => {
  it("uses a denser bookshelf grid that reaches three columns before xl", () => {
    const { container } = render(<BooksPageView locale="en" />);
    const gridSections = container.querySelectorAll("section.grid");
    const booksGrid = Array.from(gridSections).find((section) =>
      section.className.includes("lg:grid-cols-3")
    );

    expect(booksGrid).toBeTruthy();
    expect(booksGrid?.className).toContain("md:grid-cols-2");
    expect(booksGrid?.className).toContain("lg:grid-cols-3");
    expect(booksGrid?.className).not.toContain("xl:grid-cols-3");
    expect(screen.getAllByRole("article").length).toBeGreaterThan(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test -- tests/views/books-page-layout.test.tsx
```

Expected:
- `FAIL`
- the books grid still contains `xl:grid-cols-3` instead of `lg:grid-cols-3`

- [ ] **Step 3: Update the fallback and client books grids**

Use this class change in both books views:

```tsx
<section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
npm run test -- tests/views/books-page-layout.test.tsx
```

Expected:
- `PASS`

## Task 2: Lock the compact book-card behavior with tests

**Files:**
- Create: `tests/components/book-card.test.tsx`
- Modify later: `src/components/cards/book-card.tsx`

- [ ] **Step 1: Write the failing compact-card regression test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BookCard } from "@/components/cards/book-card";
import type { Book } from "@/types";

const book: Book = {
  id: "test-book",
  title: "Compact Card Test",
  author: "Tester",
  cover: "/images/books/test.svg",
  category: "Product",
  status: "reading",
  rating: 4.2,
  summary: "A summary that should remain visible in the denser card layout.",
  takeaways: ["First takeaway", "Second takeaway", "Third takeaway"],
  recommend: true,
  noteUrl: "https://example.com/book"
};

describe("BookCard", () => {
  it("renders a compact archive card that shows only two takeaways", () => {
    const { container } = render(<BookCard book={book} locale="en" />);

    expect(screen.getByRole("heading", { name: /Compact Card Test/i })).toBeInTheDocument();
    expect(screen.getByText(/A summary that should remain visible/i)).toBeInTheDocument();
    expect(screen.getByText("First takeaway")).toBeInTheDocument();
    expect(screen.getByText("Second takeaway")).toBeInTheDocument();
    expect(screen.queryByText("Third takeaway")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Book page/i })).toHaveAttribute(
      "href",
      "https://example.com/book"
    );

    const article = container.querySelector("article");
    expect(article?.className).toContain("sm:grid");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test -- tests/components/book-card.test.tsx
```

Expected:
- `FAIL`
- all three takeaways still render and the current card is not using the compact split layout

- [ ] **Step 3: Redesign `BookCard` into a compact browse-first tile**

Implement the following behavior:

- article becomes a compact split layout on `sm+`
- cover becomes a smaller fixed column
- summary stays visible but tighter
- takeaways are limited to `book.takeaways.slice(0, 2)`
- spacing and typography are reduced to support dense browsing

Target structure:

```tsx
<article className="group surface surface-strong overflow-hidden sm:grid sm:grid-cols-[108px_minmax(0,1fr)]">
  <div className="relative aspect-[4/5] overflow-hidden border-b border-white/25 bg-white/18 sm:aspect-auto sm:h-full sm:min-h-[188px] sm:border-b-0 sm:border-r">
    ...
  </div>

  <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
    ...
    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{book.summary}</p>
    ...
    {book.takeaways.slice(0, 2).map(...)}
    ...
  </div>
</article>
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
npm run test -- tests/components/book-card.test.tsx
```

Expected:
- `PASS`

## Task 3: Run full verification

**Files:**
- Modify: none

- [ ] **Step 1: Run the full test suite**

Run:

```bash
npm run test
```

Expected:
- all test files pass

- [ ] **Step 2: Run type checking**

Run:

```bash
npm run typecheck
```

Expected:
- exit code `0`

- [ ] **Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected:
- Next.js build completes successfully

- [ ] **Step 4: Commit**

```bash
git add src/views/books-page.tsx src/views/books-page-client.tsx src/components/cards/book-card.tsx tests/views/books-page-layout.test.tsx tests/components/book-card.test.tsx
git commit -m "refactor: densify books archive layout"
```
