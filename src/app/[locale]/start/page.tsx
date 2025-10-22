import type { Metadata } from "next";
import { AssessmentForm } from "@/components/Start/AssessmentForm";
import { Hero } from "@/components/Start/Hero";
import { Steps } from "@/components/Start/Steps";

export const metadata: Metadata = {
  title: "Start • Free Assessment",
  description:
    "Begin with a short call so we can tailor the perfect plan for you.",
};

export default function StartPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-7xl">
      <Hero />
      <Steps />
      <section id="assessment" className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <AssessmentForm />
        </div>
      </section>
    </main>
  );
}
