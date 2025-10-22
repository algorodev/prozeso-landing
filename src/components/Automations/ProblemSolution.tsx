"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function ProblemSolution({
  automationId,
}: {
  automationId: string;
}) {
  const t = useTranslations("automations.detail");
  const tId = useTranslations(`automations.${automationId}`);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("problemTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tId("problem")
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
              <CardTitle>{t("solutionTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tId("solution")
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
              <CardTitle>{t("resultsTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tId("results")
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
