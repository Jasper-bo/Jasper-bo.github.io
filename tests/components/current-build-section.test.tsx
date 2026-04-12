import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CurrentBuildSection } from "@/components/sections/current-build-section";
import { getProjectBySlug } from "@/lib/projects";

describe("CurrentBuildSection", () => {
  it("renders the mission panel with audience, constraint, and build-thesis readouts", () => {
    const project = getProjectBySlug("fitness-app", "en");

    if (!project) {
      throw new Error("Missing required project fixture: fitness-app");
    }

    render(<CurrentBuildSection project={project} locale="en" />);

    expect(screen.getByRole("heading", { name: /Mission Panel/i })).toBeInTheDocument();
    expect(screen.getByText(/^Audience$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Core constraint$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Build thesis$/i)).toBeInTheDocument();
  });
});
