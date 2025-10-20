"use client";

import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function Highlights() {
  const t = useTranslations("demo.highlights");

  const items = [
    {
      icon: Sparkles,
      title: t("tailoredFlow.title"),
      desc: t("tailoredFlow.desc"),
    },
    {
      icon: MessageSquare,
      title: t("builtInComms.title"),
      desc: t("builtInComms.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("paymentsTrust.title"),
      desc: t("paymentsTrust.desc"),
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
              </CardHeader>
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
