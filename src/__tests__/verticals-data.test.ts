import { describe, expect, it } from "vitest";
import { AUTOMATIONS } from "@/data/automations";
import { VERTICALS } from "@/data/verticals";

const expectedKeys = [
  "clinics-and-health",
  "hair-and-beauty",
  "hotels",
  "restaurants",
  "real-estate",
];

describe("VERTICALS", () => {
  it("has all expected vertical keys", () => {
    for (const key of expectedKeys) {
      expect(VERTICALS).toHaveProperty(key);
    }
  });

  it("each vertical has required fields", () => {
    for (const key of expectedKeys) {
      const vertical = VERTICALS[key as keyof typeof VERTICALS];
      expect(vertical.name).toBeTruthy();
      expect(vertical.slug).toBeTruthy();
      expect(vertical.description).toBeTruthy();
      expect(vertical.headline).toBeTruthy();
      expect(vertical.problems.length).toBeGreaterThan(0);
      expect(vertical.solution.length).toBeGreaterThan(0);
      expect(vertical.recommendedAutomations.length).toBeGreaterThan(0);
      expect(vertical.metrics.length).toBeGreaterThan(0);
      expect(vertical.faqs.length).toBeGreaterThan(0);
    }
  });

  it("each vertical slug matches its key", () => {
    for (const key of expectedKeys) {
      const vertical = VERTICALS[key as keyof typeof VERTICALS];
      expect(vertical.slug).toBe(key);
    }
  });

  it("recommendedAutomations reference valid AUTOMATIONS ids", () => {
    const automationIds = new Set(AUTOMATIONS.map((a) => a.id));
    for (const key of expectedKeys) {
      const vertical = VERTICALS[key as keyof typeof VERTICALS];
      for (const recId of vertical.recommendedAutomations) {
        expect(automationIds.has(recId)).toBe(true);
      }
    }
  });
});
