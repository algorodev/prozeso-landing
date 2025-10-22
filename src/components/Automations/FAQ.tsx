"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export default function FAQ({ automationId }: { automationId: string }) {
  const t = useTranslations(`automations.${automationId}`);

  const faqs = t.raw("faqs");

  return (
    <section aria-labelledby="pricing-faq">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <h2 id="pricing-faq" className="text-xl font-semibold">
          FAQs
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((faq: { question: string; answer: string }, i: number) => (
            <AccordionItem key={i} value={i.toString()}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
