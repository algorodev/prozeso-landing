"use client";

import { useTranslations } from "next-intl";
import { type ComponentType, Fragment } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { LocalizedLink } from "@/i18n/LocalizedLink";

function toArrayOfStrings(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (value && typeof value === "object")
    return Object.values(value as Record<string, string>);
  if (value == null) return [];
  return [String(value)];
}

export default function DetailHero({
  automationId,
  icon,
}: {
  automationId: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const t = useTranslations("automations");
  const tId = useTranslations(`automations.${automationId}`);
  const Icon = icon;

  const outcomes = toArrayOfStrings(tId.raw("outcomes"));

  return (
    <section className="relative overflow-hidden text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
        <div className="flex items-start gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-white/20 text-white ring-1 ring-white/40 shrink-0">
            <Icon className="size-6" />
          </div>
          <div>
            <h1 className="text-balance page-title">
              {tId("title")}
            </h1>
            <p className="my-6 max-w-2xl body-text text-white/90">
              {tId("description")
                .split("\n")
                .map((part, i) => (
                  <Fragment key={i}>
                    {i > 0 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                    {part}
                  </Fragment>
                ))}
            </p>
            <Separator />
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 caption-text text-white/90">
              {outcomes.map((o: string) => (
                <li key={o} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-white/90 shrink-0" />{" "}
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-3 w-full md:w-auto md:mt-0 mt-4">
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="w-full md:w-auto"
          >
            <LocalizedLink href={`/start?automation=${automationId}`}>
              {t("actions.setup")}
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
