import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { Project } from "@/types";

const fallbackProject: Project = {
  id: "other-project",
  title: "Other Project",
  slug: "other-project",
  tagline: "A different project that should never silently replace the homepage proof point.",
  description: "Fallback content used only for contract testing.",
  goal: "Verify the homepage does not silently drift to another project.",
  coverImage: "/images/projects/aipm-blog.svg",
  tags: ["Test"],
  status: "live",
  role: "Test",
  techStack: ["Next.js"],
  targetUsers: ["Fallback users"],
  problem: "This should not appear on the homepage.",
  solution: "The homepage should require the fitness-app slug explicitly.",
  features: ["Contract test"],
  challenges: ["None"],
  learnings: ["Do not silently fall back"],
  demoUrl: null,
  githubUrl: null,
  featured: false,
  createdAt: "2026-04-01",
  updatedAt: "2026-04-07"
};

describe("HomePageView project contract", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("@/lib/projects");
  });

  it("throws if the fitness-app homepage proof point is missing", async () => {
    vi.doMock("@/lib/projects", async () => {
      const actual = await vi.importActual<typeof import("@/lib/projects")>("@/lib/projects");

      return {
        ...actual,
        getProjectBySlug: vi.fn(() => undefined),
        getProjects: vi.fn(() => [fallbackProject])
      };
    });

    const { HomePageView } = await import("@/views/home-page");

    expect(() => render(<HomePageView locale="en" />)).toThrow(/fitness-app/i);
  });
});
