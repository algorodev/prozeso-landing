"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/Card";

export function Highlights() {
  const t = useTranslations("demo.highlights");

  const items = [
    {
      desc: t("tailoredFlow.desc"),
    },
    {
      desc: t("builtInComms.desc"),
    },
    {
      desc: t("paymentsTrust.desc"),
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ desc }, idx) => (
            <Card key={idx} className="border">
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
