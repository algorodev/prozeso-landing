import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/es/about",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
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

import { LocaleSwitcher } from "@/components/LocaleSwitcher";

afterEach(cleanup);

describe("LocaleSwitcher", () => {
  it("renders current locale uppercased", () => {
    render(<LocaleSwitcher current="es" />);
    expect(screen.getByText("ES")).toBeDefined();
  });

  it("renders dropdown trigger button", () => {
    render(<LocaleSwitcher current="es" />);
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });

  it("renders Globe icon", () => {
    render(<LocaleSwitcher current="en" />);
    const button = screen.getByRole("button");
    const svg = button.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("renders current locale text", () => {
    render(<LocaleSwitcher current="en" />);
    expect(screen.getByText("EN")).toBeDefined();
  });
});
