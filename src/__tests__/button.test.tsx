import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Button from "@/components/ui/Button/Button";

afterEach(cleanup);

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });

  it("has data-slot='button'", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button").getAttribute("data-slot")).toBe("button");
  });

  it("applies variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border");
  });

  it("renders as child element when asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("forwards additional props", () => {
    render(<Button disabled>Disabled</Button>);
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
