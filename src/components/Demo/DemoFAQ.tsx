"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export function DemoFAQ() {
  const t = useTranslations("demo.faq");

  return (
    <section className="py-10 px-4">
      <h2 id="pricing-faq" className="text-xl font-semibold">
        {t("title")}
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="what-in-demo">
          <AccordionTrigger>{t("items.whatInDemo.q")}</AccordionTrigger>
          <AccordionContent>{t("items.whatInDemo.a")}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-long">
          <AccordionTrigger>{t("items.howLong.q")}</AccordionTrigger>
          <AccordionContent>{t("items.howLong.a")}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="next-step">
          <AccordionTrigger>{t("items.nextStep.q")}</AccordionTrigger>
          <AccordionContent>{t("items.nextStep.a")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
