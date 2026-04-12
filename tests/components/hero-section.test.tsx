import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/sections/hero-section";
import { getAbout } from "@/lib/about";

describe("HeroSection", () => {
  it("renders the quiet-system badge, worldview copy, thesis module, and hero signals", () => {
    render(<HeroSection about={getAbout("en")} locale="en" />);

    expect(screen.getByText(/Quiet system online/i)).toBeInTheDocument();
    expect(screen.getByText(/Current thesis/i)).toBeInTheDocument();
    expect(
      screen.getByText(/I am building a quiet system for studying what deserves to exist/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/^Signal observatory$/i)).toBeInTheDocument();
  });
});
