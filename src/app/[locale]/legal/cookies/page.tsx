import type { Metadata } from "next";
import CookiesPolicy from "@/components/Legal/CookiesPolicy";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Understand how Prozeso uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <CookiesPolicy />
    </main>
  );
}
