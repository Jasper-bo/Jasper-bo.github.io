import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getBookCategories, getBooks, getBookStatuses } from "@/lib/books";
import { BooksPageClient } from "@/views/books-page-client";

describe("BooksPageClient", () => {
  it("uses a denser bookshelf grid that reaches three columns before xl", () => {
    const { container } = render(
      <BooksPageClient
        locale="en"
        books={getBooks("en")}
        categories={getBookCategories("en")}
        statuses={getBookStatuses("en")}
      />
    );

    const gridSections = Array.from(container.querySelectorAll("section.grid"));
    const booksGrid = gridSections.find((section) => section.className.includes("grid-cols"));

    expect(booksGrid).toBeTruthy();
    expect(booksGrid?.className).toContain("md:grid-cols-2");
    expect(booksGrid?.className).toContain("lg:grid-cols-3");
    expect(booksGrid?.className).not.toContain("xl:grid-cols-3");
  });
});
