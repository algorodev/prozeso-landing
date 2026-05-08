import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "@/components/ui";

afterEach(cleanup);

describe("Badge", () => {
  it("renders with default props", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeDefined();
  });

  it("has data-slot='badge'", () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText("Test").getAttribute("data-slot")).toBe("badge");
  });

  it("applies variant classes", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("text-foreground");
  });

  it("renders as child when asChild", () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "Link Badge" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/test");
  });
});
