import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteFrame } from "@/app/layout";

vi.mock("@/components/i18n/language-switcher", () => ({
  LanguageSwitcher: () => <div>Language switcher</div>
}));

describe("layout shell", () => {
  it("renders the observatory atmosphere, the status-led navbar, and the final transmission footer", () => {
    render(
      <SiteFrame>
        <div>Page content</div>
      </SiteFrame>
    );

    expect(screen.getByTestId("site-atmosphere")).toBeInTheDocument();
    expect(screen.getByText(/Signal observatory online/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute("href", "/");
    expect(screen.getByText(/End transmission/i)).toBeInTheDocument();
  });
});
