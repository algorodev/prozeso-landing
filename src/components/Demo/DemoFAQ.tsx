"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export function DemoFAQ() {
  return (
    <section className="py-10">
      <h2 id="pricing-faq" className="text-xl font-semibold">
        FAQs
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="what-in-demo">
          <AccordionTrigger>What will I see in the demo?</AccordionTrigger>
          <AccordionContent>
            A short walkthrough of the core flow so you can understand how we
            work together end-to-end.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-long">
          <AccordionTrigger>How long is it?</AccordionTrigger>
          <AccordionContent>
            Usually under 3 minutes — quick and to the point.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="next-step">
          <AccordionTrigger>
            What’s the next step after watching?
          </AccordionTrigger>
          <AccordionContent>
            Book a free assessment — we’ll tailor the plan to your needs and
            timeline.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
