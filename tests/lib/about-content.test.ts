import { describe, expect, it } from "vitest";

import { getAbout } from "@/lib/about";

describe("about content", () => {
  it("provides observatory metadata for the hero, workflow, signals, and channel cards", () => {
    const about = getAbout("en");

    expect(about.worldview).toMatch(/quiet system/i);
    expect(about.heroSignals).toEqual([
      { label: "Mode", value: "Signal observatory" },
      { label: "Focus", value: "Gym product loop" },
      { label: "Build state", value: "Quietly shipping" }
    ]);
    expect(about.workflow.steps).toHaveLength(3);
    expect(about.workflow.steps[0]).toMatchObject({
      title: "Capture live demand",
      output: "Signal map"
    });
    expect(about.thinkingQuestions[0]).toMatchObject({
      id: "Signal 01",
      theme: "AI product judgement",
      status: "Active"
    });
    expect(about.socials[0]).toMatchObject({
      label: "Email",
      note: "Serious async conversations"
    });
  });

  it("keeps the Chinese locale aligned with the observatory schema and localized channel labels", () => {
    const about = getAbout("zh");

    expect(about.worldview).toMatch(/安静运行的系统/);
    expect(about.heroSignals).toHaveLength(3);
    expect(about.workflow.steps).toHaveLength(3);
    expect(about.workflow.steps[0]).toMatchObject({
      title: "捕捉真实需求",
      output: "信号地图"
    });
    expect(about.thinkingQuestions[0]).toMatchObject({
      id: "Signal 01",
      theme: "AI 产品判断",
      status: "进行中"
    });
    expect(about.socials[0]).toMatchObject({
      label: "邮箱",
      note: "适合认真、异步的沟通"
    });
  });
});
