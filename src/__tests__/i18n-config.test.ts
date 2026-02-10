import { describe, expect, it } from "vitest";
import { defaultLocale, locales } from "@/i18n/config";

describe("i18n config", () => {
  it("includes 'es' and 'en' locales", () => {
    expect(locales).toContain("es");
    expect(locales).toContain("en");
  });

  it("has exactly 2 locales", () => {
    expect(locales).toHaveLength(2);
  });

  it("sets defaultLocale to 'es'", () => {
    expect(defaultLocale).toBe("es");
  });

  it("defaultLocale is included in locales", () => {
    expect(locales).toContain(defaultLocale);
  });
});
