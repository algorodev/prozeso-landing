import { describe, expect, it } from "vitest";
import { emailColors, emailTypography } from "@/emails/theme";

describe("emailColors", () => {
  it("has all expected color keys", () => {
    const expectedKeys = [
      "primary",
      "primaryForeground",
      "secondary",
      "secondaryForeground",
      "accent",
      "accentForeground",
      "pageBg",
      "cardBg",
      "text",
      "mutedText",
      "subtleText",
      "border",
    ];
    for (const key of expectedKeys) {
      expect(emailColors).toHaveProperty(key);
    }
  });

  it("all color values are valid hex strings", () => {
    for (const value of Object.values(emailColors)) {
      expect(value).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("emailTypography", () => {
  it("has all expected typography keys", () => {
    const expectedKeys = [
      "titleSize",
      "titleLineHeight",
      "bodySize",
      "bodyLineHeight",
      "smallSize",
      "labelSize",
    ];
    for (const key of expectedKeys) {
      expect(emailTypography).toHaveProperty(key);
    }
  });

  it("all typography values are positive numbers", () => {
    for (const value of Object.values(emailTypography)) {
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThan(0);
    }
  });
});
