import { describe, expect, it } from "vitest";
import {
  REPORT_GENERATOR_PROMPT,
  USE_CASE_ANALYZER_PROMPT,
} from "@/lib/prompts";
import type { UseCasePipelineInput } from "@/types/UseCaseReport";

const fakeInput: UseCasePipelineInput = {
  companySize: "10-50",
  industry: "restaurants",
  role: "founder",
  painPointChips: ["missedCalls"],
  painPointsDetail: "slow service",
  goal: "saveTime",
};

describe("USE_CASE_ANALYZER_PROMPT", () => {
  it("includes companySize, industry and painPoints in output", () => {
    const result = USE_CASE_ANALYZER_PROMPT(fakeInput);
    expect(result).toContain("10-50");
    expect(result).toContain("restaurants");
    expect(result).toContain("slow service");
    expect(result).toContain("missedCalls");
    expect(result).toContain("founder");
    expect(result).toContain("saveTime");
  });

  it("includes 'Spanish' when locale is 'es'", () => {
    const result = USE_CASE_ANALYZER_PROMPT(fakeInput, "es");
    expect(result).toContain("Spanish");
  });

  it("includes 'English' when locale is 'en'", () => {
    const result = USE_CASE_ANALYZER_PROMPT(fakeInput, "en");
    expect(result).toContain("English");
  });

  it("defaults to English when no locale provided", () => {
    const result = USE_CASE_ANALYZER_PROMPT(fakeInput);
    expect(result).toContain("English");
  });

  it("includes JSON structure keywords", () => {
    const result = USE_CASE_ANALYZER_PROMPT(fakeInput);
    expect(result).toContain("painPoints");
    expect(result).toContain("summary");
    expect(result).toContain("keyInsights");
    expect(result).toContain("recommendedFocusAreas");
  });
});

describe("REPORT_GENERATOR_PROMPT", () => {
  it("includes analysis, companySize and industry in output", () => {
    const result = REPORT_GENERATOR_PROMPT('{"test": true}', fakeInput);
    expect(result).toContain('{"test": true}');
    expect(result).toContain("10-50");
    expect(result).toContain("restaurants");
    expect(result).toContain("founder");
    expect(result).toContain("saveTime");
  });

  it("includes 'Spanish' when locale is 'es'", () => {
    const result = REPORT_GENERATOR_PROMPT("{}", fakeInput, "es");
    expect(result).toContain("Spanish");
  });

  it("includes 'English' when locale is 'en'", () => {
    const result = REPORT_GENERATOR_PROMPT("{}", fakeInput, "en");
    expect(result).toContain("English");
  });
});
