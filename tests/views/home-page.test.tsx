import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePageView } from "@/views/home-page";

describe("HomePageView", () => {
  it("renders the four-section single-page narrative and removes old homepage preview sections", () => {
    render(<HomePageView locale="en" />);

    expect(screen.getByRole("heading", { level: 1, name: /Junbo He/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /What I'm Building/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How I Work/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Three Questions I'm Thinking About Lately/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse reading archive/i })).toHaveAttribute(
      "href",
      "/books"
    );

    expect(screen.queryByText(/Current Focus/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Selected Work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Capabilities/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /About me/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View projects/i })).not.toBeInTheDocument();
  });
});
