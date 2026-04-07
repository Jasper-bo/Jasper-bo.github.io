import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "@/app/not-found";
import { ProjectDetailPageView } from "@/views/project-detail-page";

describe("retired route links", () => {
  it("does not link project detail pages back to the retired projects index", () => {
    render(<ProjectDetailPageView locale="en" slug="fitness-app" />);

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));

    expect(hrefs).not.toContain("/projects");
    expect(hrefs).toContain("/");
  });

  it("does not send the not-found page to the retired projects index", () => {
    render(<NotFound />);

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));

    expect(hrefs).not.toContain("/projects");
    expect(hrefs).toContain("/books");
  });
});
