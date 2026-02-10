import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      bookCall: "Book a Call",
    };
    return translations[key] ?? key;
  },
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

import { BookCallButton } from "@/components/ui/BookCallButton/BookCallButton";
import { CALENDAR_URL } from "@/components/ui/BookCallButton/constants";

afterEach(cleanup);

describe("BookCallButton", () => {
  it("renders with calendar URL link", () => {
    render(<BookCallButton />);
    const link = screen.getByRole("link", { name: /Book a Call/i });
    expect(link.getAttribute("href")).toBe(CALENDAR_URL);
  });

  it("renders translated text", () => {
    render(<BookCallButton />);
    expect(screen.getByText("Book a Call")).toBeDefined();
  });

  it("shows phone icon by default", () => {
    render(<BookCallButton />);
    const link = screen.getByRole("link");
    const svg = link.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("hides icon when showIcon=false", () => {
    render(<BookCallButton showIcon={false} />);
    const link = screen.getByRole("link");
    const svg = link.querySelector("svg");
    expect(svg).toBeNull();
  });
});
