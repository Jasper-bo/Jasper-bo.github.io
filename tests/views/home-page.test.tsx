import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePageView } from "@/views/home-page";

describe("HomePageView", () => {
  it("renders the four-section single-page narrative, keeps fitness-app as the proof point, and closes with signals plus contact links", () => {
    render(<HomePageView locale="en" />);

    expect(screen.getByRole("heading", { level: 1, name: /Junbo He/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /What I'm Building/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Fitness App/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How I Work/i })).toBeInTheDocument();
    const signalsHeading = screen.getByRole("heading", {
      name: /Three Questions I'm Thinking About Lately/i
    });
    expect(signalsHeading).toBeInTheDocument();
    const signalsSection = signalsHeading.closest("section");

    expect(signalsSection).not.toBeNull();
    expect(
      within(signalsSection as HTMLElement).getByRole("link", { name: /Browse reading archive/i })
    ).toHaveAttribute(
      "href",
      "/books"
    );
    expect(
      within(signalsSection as HTMLElement).getByRole("link", { name: /Email/i })
    ).toHaveAttribute("href", "mailto:2909066560@qq.com");
    expect(
      within(signalsSection as HTMLElement).getByRole("link", { name: /GitHub/i })
    ).toHaveAttribute("href", "https://github.com/Jasper-bo");
    expect(
      within(signalsSection as HTMLElement).getByRole("link", { name: /^X@/i })
    ).toHaveAttribute("href", "https://x.com/mniu61934");

    expect(screen.queryByText(/Current Focus/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Selected Work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Capabilities/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /About me/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View projects/i })).not.toBeInTheDocument();
  });
});
