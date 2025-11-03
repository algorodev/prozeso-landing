import type { Metadata } from "next";
import TermsAndConditions from "@/components/Legal/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Terms and Conditions for using Prozeso services.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <TermsAndConditions />
    </main>
  );
}
