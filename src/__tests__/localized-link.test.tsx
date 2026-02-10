import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "es",
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import { LocalizedLink } from "@/i18n/LocalizedLink";

afterEach(cleanup);

describe("LocalizedLink", () => {
  it("prepends locale to href", () => {
    render(<LocalizedLink href="/about">About</LocalizedLink>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link.getAttribute("href")).toBe("/es/about");
  });

  it("does not double-prefix when href already has locale", () => {
    render(<LocalizedLink href="/es/about">About</LocalizedLink>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link.getAttribute("href")).toBe("/es/about");
  });

  it("handles href without leading slash", () => {
    render(<LocalizedLink href="contact">Contact</LocalizedLink>);
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link.getAttribute("href")).toBe("/es/contact");
  });

  it("renders children", () => {
    render(
      <LocalizedLink href="/test">
        <span>Child</span>
      </LocalizedLink>,
    );
    expect(screen.getByText("Child")).toBeDefined();
  });

  it("passes additional props to Link", () => {
    render(
      <LocalizedLink href="/test" className="custom">
        Test
      </LocalizedLink>,
    );
    const link = screen.getByRole("link", { name: "Test" });
    expect(link.className).toBe("custom");
  });
});
