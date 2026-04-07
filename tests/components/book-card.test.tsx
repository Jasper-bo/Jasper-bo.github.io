import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BookCard } from "@/components/cards/book-card";
import type { Book } from "@/types";

const book: Book = {
  id: "compact-card-test",
  title: "Compact Card Test",
  author: "Tester",
  cover: "/images/books/ganfa.svg",
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
