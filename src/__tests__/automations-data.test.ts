import { describe, expect, it } from "vitest";
import {
  AUTOMATIONS,
  AUTOMATIONS_DETAILS,
  CATEGORIES,
} from "@/data/automations";

describe("AUTOMATIONS", () => {
  it("is a non-empty array", () => {
    expect(AUTOMATIONS.length).toBeGreaterThan(0);
  });

  it("each automation has required fields", () => {
    for (const auto of AUTOMATIONS) {
      expect(auto.id).toBeTruthy();
      expect(auto.title).toBeTruthy();
      expect(auto.description).toBeTruthy();
      expect(auto.icon).toBeTruthy();
      expect(auto.metrics).toBeTruthy();
      expect(auto.verticals).toBeTruthy();
    }
  });

  it("all IDs are unique", () => {
    const ids = AUTOMATIONS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("CATEGORIES", () => {
  it("is a non-empty array", () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it("each category has id and label", () => {
    for (const cat of CATEGORIES) {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
    }
  });

  it("includes an 'all' category", () => {
    expect(CATEGORIES.find((c) => c.id === "all")).toBeTruthy();
  });
});

describe("AUTOMATIONS_DETAILS", () => {
  it("is a non-empty array", () => {
    expect(AUTOMATIONS_DETAILS.length).toBeGreaterThan(0);
  });

  it("each detail has required fields", () => {
    for (const detail of AUTOMATIONS_DETAILS) {
      expect(detail.slug).toBeTruthy();
      expect(detail.name).toBeTruthy();
      expect(detail.headline).toBeTruthy();
      expect(detail.features).toBeTruthy();
      expect(detail.faqs).toBeTruthy();
    }
  });

  it("detail slugs match AUTOMATIONS ids", () => {
    const automationIds = new Set(AUTOMATIONS.map((a) => a.id));
    for (const detail of AUTOMATIONS_DETAILS) {
      expect(automationIds.has(detail.slug)).toBe(true);
    }
  });
});
