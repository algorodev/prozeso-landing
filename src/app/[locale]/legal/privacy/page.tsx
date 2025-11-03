import type { Metadata } from "next";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Prozeso collects, uses, and shares your data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <PrivacyPolicy />
    </main>
  );
}
