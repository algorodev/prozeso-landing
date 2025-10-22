"use client";

import type { Automation } from "@/app/[locale]/automations/data";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { useTranslations } from 'next-intl'

function toArrayOfStrings(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (value && typeof value === "object") return Object.values(value as Record<string, string>);
  if (value == null) return [];
  return [String(value)];
}

const AutomationCard = ({ a }: { a: Automation }) => {
	const t = useTranslations('automations')
	const tId = useTranslations(`automations.${a.id}`);
  const Icon = a.icon;

	const categoriesRaw = tId.raw('categories') as Record<string, string> | string[] | undefined;
	const categoryKeys = Array.isArray(categoriesRaw)
    ? (categoriesRaw as string[])
    : categoriesRaw
    ? Object.keys(categoriesRaw as Record<string, string>)
    : [];
	const integrations = toArrayOfStrings(tId.raw('integrations'))

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <CardTitle className="truncate text-base sm:text-lg">
            {tId('title')}
          </CardTitle>
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            {categoryKeys.map((c: string) => (
              <span key={c} className="rounded bg-muted px-1.5 py-0.5">
                {tId(`categories.${c}`)}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {tId('tagline')}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {integrations.map((i: string) => (
            <span
              key={i}
              className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {i}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-col items-start sm:items-center justify-start sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground">
              {tId('timeSavedShort')}
            </span>
            <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
              {tId('roiShort')}
            </span>
          </div>
          <div className="flex items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <LocalizedLink href={`/automations/${a.id}`}>{t("actions.details")}</LocalizedLink>
            </Button>
            <Button
              asChild
              size="sm"
              variant="primary"
              className="w-full sm:w-auto"
            >
              <LocalizedLink href={`/contact?automation=${a.id}`}>
	              {t("actions.setup")}
              </LocalizedLink>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationCard;
