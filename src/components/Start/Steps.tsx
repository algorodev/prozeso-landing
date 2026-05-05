"use client";

import { MessagesSquare, PenTool, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function Steps() {
  const t = useTranslations("start.steps.items");

  const items = [
    {
      icon: MessagesSquare,
      title: t("intro.title"),
      desc: t("intro.desc"),
    },
    {
      icon: PenTool,
      title: t("call.title"),
      desc: t("call.desc"),
    },
    {
      icon: Rocket,
      title: t("launch.title"),
      desc: t("launch.desc"),
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
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="body-text text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
