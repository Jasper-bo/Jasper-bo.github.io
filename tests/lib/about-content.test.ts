import { describe, expect, it } from "vitest";

import { getAbout } from "@/lib/about";

describe("about content", () => {
  it("provides a homepage-only schema with three workflow steps and three thinking questions", () => {
    const about = getAbout("en");

    expect(about.workflow.steps).toHaveLength(3);
    expect(about.thinkingQuestions).toHaveLength(3);
    expect(about).not.toHaveProperty("profileHighlights");
    expect(about).not.toHaveProperty("focusAreas");
    expect(about).not.toHaveProperty("tools");
    expect(about).not.toHaveProperty("now");
    expect(about).not.toHaveProperty("timeline");
    expect(about.workflow).not.toHaveProperty("principles");
    expect(about.workflow).not.toHaveProperty("title");
    expect(about.workflow).not.toHaveProperty("description");
  });
});
