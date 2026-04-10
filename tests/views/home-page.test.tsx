import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePageView } from "@/views/home-page";

describe("HomePageView", () => {
  it("renders the observatory homepage narrative with mission panel, system loop, active signals, and channel cards", () => {
    render(<HomePageView locale="en" />);

    expect(screen.getByRole("heading", { level: 1, name: /Junbo He/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Mission Panel/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Fitness App/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /System Loop/i })).toBeInTheDocument();
    const signalsHeading = screen.getByRole("heading", { name: /Active Signals/i });
    expect(signalsHeading).toBeInTheDocument();

    const signalsSection = signalsHeading.closest("section");

    expect(signalsSection).not.toBeNull();
    expect(within(signalsSection as HTMLElement).getByText(/Signal 01/i)).toBeInTheDocument();
    expect(
      within(signalsSection as HTMLElement).getByRole("link", { name: /Browse reading archive/i })
    ).toHaveAttribute("href", "/books");
    expect(
      within(signalsSection as HTMLElement).getByText(/Serious async conversations/i)
    ).toBeInTheDocument();
    expect(
      within(signalsSection as HTMLElement).getByRole("link", { name: /GitHub/i })
    ).toHaveAttribute("href", "https://github.com/Jasper-bo");

    expect(screen.queryByRole("heading", { name: /How I Work/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Three Questions I'm Thinking About Lately/i })
    ).not.toBeInTheDocument();
  });
});
