"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Metrics({ automationId }: { automationId: string }) {
  const t = useTranslations("automations.metrics");
  const tId = useTranslations(`automations.${automationId}`);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <h2 className="text-xl font-semibold">Metrics</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("timeSavedTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tId("timeSaved")
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("roiTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tId("roi")
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
