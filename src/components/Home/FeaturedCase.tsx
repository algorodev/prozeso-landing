"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  ClipboardList,
  FileBarChart,
  type LucideIcon,
  Mail,
  TrendingUp,
  Truck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, SectionHeader } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const STATS = ["reports", "tables", "docs", "accuracy"] as const;

const PRODUCTION: { id: string; icon: LucideIcon }[] = [
  { id: "reports", icon: FileBarChart },
  { id: "assistant", icon: Bot },
  { id: "incidents", icon: Wrench },
  { id: "forms", icon: ClipboardList },
  { id: "news", icon: Mail },
];

const DEVELOPMENT: { id: string; icon: LucideIcon }[] = [
  { id: "shifts", icon: CalendarClock },
  { id: "profitability", icon: TrendingUp },
  { id: "delivery", icon: Truck },
];

type ModuleListProps = {
  badge: string;
  badgeClass: string;
  iconClass: string;
  modules: { id: string; icon: LucideIcon }[];
  namespace: "production" | "development";
};

const ModuleList = ({
  badge,
  badgeClass,
  iconClass,
  modules,
  namespace,
}: ModuleListProps) => {
  const t = useTranslations("home.featuredCase");

  return (
    <div>
      <span
        className={`inline-block w-fit px-3 py-1 mb-4 rounded-full text-xs font-medium border ${badgeClass}`}
      >
        {badge}
      </span>
      <ul className="flex flex-col gap-4">
        {modules.map(({ id, icon: Icon }) => (
          <li key={id} className="flex gap-3">
            <Icon
              className={`mt-0.5 size-5 shrink-0 ${iconClass}`}
              strokeWidth={1.5}
            />
            <div>
              <h4 className="font-sora font-semibold text-sm tracking-tight leading-snug">
                {t(`${namespace}.items.${id}.title`)}
              </h4>
              <p className="text-sm text-foreground-subtle leading-relaxed">
                {t(`${namespace}.items.${id}.desc`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeaturedCase = () => {
  const t = useTranslations("home.featuredCase");

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <SectionHeader
          title={t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
          subtitle={t("subtitle")}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-px"
          style={{ background: "var(--color-border-subtle)" }}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 rounded-[15px] bg-background p-6 md:p-10">
            <div className="flex flex-col">
              <Image
                src="/assets/clients/thefitzgerald-white.svg"
                alt="The Fitzgerald"
                width={160}
                height={48}
                className="h-10 w-auto self-start mb-6"
              />
              <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted mb-3">
                {t("eyebrow")}
              </p>
              <h3 className="font-sora font-semibold text-2xl md:text-3xl tracking-tight leading-snug mb-4">
                {t("headline")}
              </h3>
              <p className="text-foreground-subtle leading-relaxed mb-8">
                {t("body")}
              </p>

              <dl className="grid grid-cols-2 gap-6 mb-8">
                {STATS.map((id) => (
                  <div key={id}>
                    <dt className="font-sora font-semibold text-3xl tracking-tight text-primary">
                      {t(`stats.${id}.value`)}
                    </dt>
                    <dd className="text-sm text-foreground-subtle leading-snug mt-1">
                      {t(`stats.${id}.label`)}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="self-start"
              >
                <LocalizedLink href="/case-studies/the-fitzgerald">
                  {t("cta")}
                  <ArrowRight className="ml-1 size-5" />
                </LocalizedLink>
              </Button>
            </div>

            <div className="flex flex-col gap-8">
              <ModuleList
                badge={t("production.badge")}
                badgeClass="bg-mint/10 text-mint border-mint/20"
                iconClass="text-mint/70"
                modules={PRODUCTION}
                namespace="production"
              />
              <ModuleList
                badge={t("development.badge")}
                badgeClass="bg-foreground-muted/10 text-foreground-muted border-foreground-muted/20"
                iconClass="text-foreground-muted"
                modules={DEVELOPMENT}
                namespace="development"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCase;
