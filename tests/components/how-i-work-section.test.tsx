import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HowIWorkSection } from "@/components/sections/how-i-work-section";
import { getAbout } from "@/lib/about";

describe("HowIWorkSection", () => {
  it("renders the connected system loop with explicit outputs", () => {
    render(<HowIWorkSection about={getAbout("en")} locale="en" />);

    expect(screen.getByRole("heading", { name: /System Loop/i })).toBeInTheDocument();
    expect(screen.getByText(/Signal map/i)).toBeInTheDocument();
    expect(screen.getByText(/Product thesis/i)).toBeInTheDocument();
    expect(screen.getByText(/Working surface/i)).toBeInTheDocument();
  });
});
