"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

type Stat = { title: string; desc: string; icon?: React.ReactNode };

export default function StoryDeck() {
  const t = useTranslations("storyDeck");

  const problemParagraphs =
    (t.raw("content.problem.paragraphs") as string[]) || [];
  const solutionBullets = (t.raw("content.solution.bullets") as string[]) || [];
  const impactParagraphs =
    (t.raw("content.impact.paragraphs") as string[]) || [];

  const stats: Stat[] = [
    {
      title: "content.impact.items.reservations.title",
      desc: "content.impact.items.reservations.body",
    },
    {
      title: "content.impact.items.hours.title",
      desc: "content.impact.items.hours.body",
    },
    {
      title: "content.impact.items.support.title",
      desc: "content.impact.items.support.body",
    },
    {
      title: "content.impact.items.costs.title",
      desc: "content.impact.items.costs.body",
    },
  ];

  const [tab, setTab] = React.useState<string>("problem");

  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
  };

  const listParent = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 },
    },
    exit: { opacity: 0 },
  };

  const listItem = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <section
      aria-label="Prozeso story"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-3 text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>
      </div>
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="mt-12 grid gap-6 md:grid-cols-12"
      >
        <div className="md:col-span-3 p-2 bg-muted rounded-2xl">
          <TabsList className="w-full justify-start gap-2 overflow-x-auto rounded-2xl md:flex md:flex-col md:gap-3 md:overflow-visible md:rounded-xl">
            <TabsTrigger
              value="problem"
              className="w-full justify-start md:text-left cursor-pointer"
            >
              {t("tabs.problemTitle")}
            </TabsTrigger>
            <TabsTrigger
              value="solution"
              className="w-full justify-start md:text-left cursor-pointer"
            >
              {t("tabs.solutionTitle")}
            </TabsTrigger>
            <TabsTrigger
              value="impact"
              className="w-full justify-start md:text-left cursor-pointer"
            >
              {t("tabs.impactTitle")}
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="md:col-span-9 space-y-8">
          <TabsContent value="problem" className="m-0">
            <AnimatePresence mode="wait">
              {tab === "problem" && (
                <motion.div key="problem" {...fadeUp}>
                  <Card className="rounded-2xl border-none shadow-sm bg-card">
                    <CardContent className="space-y-4 leading-relaxed">
                      <p className="text-pretty text-xl font-semibold leading-7">
                        {t("content.problem.lead")}
                      </p>
                      <div className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                        {problemParagraphs.map((p, i) => (
                          <motion.p
                            key={i}
                            variants={listItem}
                            initial="initial"
                            animate="animate"
                          >
                            {p}
                          </motion.p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="solution" className="m-0">
            <AnimatePresence mode="wait">
              {tab === "solution" && (
                <motion.div key="solution" {...fadeUp}>
                  <Card className="rounded-2xl border-none shadow-sm bg-card">
                    <CardContent className="space-y-5 leading-relaxed">
                      <p className="text-pretty text-xl font-semibold leading-7">
                        {t("content.solution.lead")}
                      </p>
                      <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
                        <p className="font-medium">
                          {t("content.solution.intro")}
                        </p>
                        <motion.ul
                          className="grid gap-3 md:grid-cols-2"
                          variants={listParent}
                          initial="initial"
                          animate="animate"
                        >
                          {solutionBullets.map((b, i) => (
                            <motion.li
                              key={i}
                              variants={listItem}
                              className="rounded-xl border bg-background text-sm text-foreground p-4"
                            >
                              {b}
                            </motion.li>
                          ))}
                        </motion.ul>
                        <Separator />
                        <p>{t("content.solution.outro")}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="impact" className="m-0">
            <AnimatePresence mode="wait">
              {tab === "impact" && (
                <motion.div key="impact" {...fadeUp}>
                  <Card className="rounded-2xl border-none shadow-sm bg-card">
                    <CardContent className="space-y-6 leading-relaxed">
                      <p className="text-pretty text-xl font-semibold leading-7">
                        {t("content.impact.lead")}
                      </p>
                      <div className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                        {impactParagraphs.map((p, i) => (
                          <motion.p
                            key={i}
                            variants={listItem}
                            initial="initial"
                            animate="animate"
                          >
                            {p}
                          </motion.p>
                        ))}
                      </div>
                      <motion.div
                        className="relative grid gap-3 md:grid-cols-4"
                        variants={listParent}
                        initial="initial"
                        animate="animate"
                      >
                        {stats.map((s, i) => (
                          <motion.div
                            key={s.title}
                            className="relative rounded-2xl border p-4 bg-background"
                            variants={listItem}
                          >
                            <div className="text-sm font-semibold text-foreground">
                              {t(s.title)}
                            </div>
                            <p className="mt-1 text-sm">{t(s.desc)}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
