import { describe, expect, it } from "vitest";
import {
  REPORT_GENERATOR_PROMPT,
  USE_CASE_ANALYZER_PROMPT,
} from "@/lib/prompts";

describe("USE_CASE_ANALYZER_PROMPT", () => {
  it("includes companySize, industry and painPoints in output", () => {
    const result = USE_CASE_ANALYZER_PROMPT(
      "10-50",
      "restaurants",
      "slow service",
    );
    expect(result).toContain("10-50");
    expect(result).toContain("restaurants");
    expect(result).toContain("slow service");
  });

  it("includes 'Spanish' when locale is 'es'", () => {
    const result = USE_CASE_ANALYZER_PROMPT(
      "10-50",
      "restaurants",
      "slow",
      "es",
    );
    expect(result).toContain("Spanish");
  });

  it("includes 'English' when locale is 'en'", () => {
    const result = USE_CASE_ANALYZER_PROMPT(
      "10-50",
      "restaurants",
      "slow",
      "en",
    );
    expect(result).toContain("English");
  });

  it("defaults to English when no locale provided", () => {
    const result = USE_CASE_ANALYZER_PROMPT("10-50", "restaurants", "slow");
    expect(result).toContain("English");
  });

  it("includes JSON structure keywords", () => {
    const result = USE_CASE_ANALYZER_PROMPT("10-50", "restaurants", "slow");
    expect(result).toContain("painPoints");
    expect(result).toContain("summary");
    expect(result).toContain("keyInsights");
    expect(result).toContain("recommendedFocusAreas");
  });
});

describe("REPORT_GENERATOR_PROMPT", () => {
  it("includes analysis, companySize and industry in output", () => {
    const result = REPORT_GENERATOR_PROMPT(
      '{"test": true}',
      "10-50",
      "restaurants",
    );
    expect(result).toContain('{"test": true}');
    expect(result).toContain("10-50");
    expect(result).toContain("restaurants");
  });

  it("includes 'Spanish' when locale is 'es'", () => {
    const result = REPORT_GENERATOR_PROMPT("{}", "10-50", "restaurants", "es");
    expect(result).toContain("Spanish");
  });

  it("includes 'English' when locale is 'en'", () => {
    const result = REPORT_GENERATOR_PROMPT("{}", "10-50", "restaurants", "en");
    expect(result).toContain("English");
  });
});
