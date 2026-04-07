import { describe, expect, it } from "vitest";

import { getAbout } from "@/lib/about";

describe("about content", () => {
  it("provides three workflow steps and three thinking questions for the homepage", () => {
    const about = getAbout("en");

    expect(about.workflow.steps).toHaveLength(3);
    expect(about.thinkingQuestions).toHaveLength(3);
  });
});
