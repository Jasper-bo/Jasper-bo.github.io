import { describe, expect, it } from "vitest";

import { siteConfig } from "@/lib/site";

describe("siteConfig.navigation", () => {
  it("exposes only Home in the primary navigation", () => {
    expect(siteConfig.navigation).toEqual([{ href: "/", key: "home" }]);
  });
});
