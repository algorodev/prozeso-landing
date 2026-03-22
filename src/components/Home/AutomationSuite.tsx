"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

import bookingsIcon from "@/assets/areas-icons/bookings-icon.svg";
import financesIcon from "@/assets/areas-icons/finances-icon.svg";
import marketingIcon from "@/assets/areas-icons/marketing-icon.svg";
import operationsIcon from "@/assets/areas-icons/operations-icon.svg";
import salesIcon from "@/assets/areas-icons/sales-icon.svg";
import serviceIcon from "@/assets/areas-icons/service-icon.svg";

const AREAS = [
  {
    id: "bookings",
    icon: bookingsIcon,
    colorVar: "var(--color-primary)",
    colorClasses: {
      text: "text-primary",
      border: "border-primary",
      hoverBorder: "hover:border-primary",
      bg: "bg-primary/10",
      borderSubtle: "border-primary/20",
      shadow: "hover:shadow-primary/5",
    },
  },
  {
    id: "sales",
    icon: salesIcon,
    colorVar: "var(--color-secondary)",
    colorClasses: {
      text: "text-secondary",
      border: "border-secondary",
      hoverBorder: "hover:border-secondary",
      bg: "bg-secondary/10",
      borderSubtle: "border-secondary/20",
      shadow: "hover:shadow-secondary/5",
    },
  },
  {
    id: "finance",
    icon: financesIcon,
    colorVar: "var(--color-accent)",
    colorClasses: {
      text: "text-accent",
      border: "border-accent",
      hoverBorder: "hover:border-accent",
      bg: "bg-accent/10",
      borderSubtle: "border-accent/20",
      shadow: "hover:shadow-accent/5",
    },
  },
  {
    id: "marketing",
    icon: marketingIcon,
    colorVar: "var(--color-chart-2)",
    colorClasses: {
      text: "text-chart-2",
      border: "border-chart-2",
      hoverBorder: "hover:border-chart-2",
      bg: "bg-chart-2/10",
      borderSubtle: "border-chart-2/20",
      shadow: "hover:shadow-chart-2/5",
    },
  },
  {
    id: "customerSuccess",
    icon: serviceIcon,
    colorVar: "var(--color-chart-5)",
    colorClasses: {
      text: "text-chart-5",
      border: "border-chart-5",
      hoverBorder: "hover:border-chart-5",
      bg: "bg-chart-5/10",
      borderSubtle: "border-chart-5/20",
      shadow: "hover:shadow-chart-5/5",
    },
  },
  {
    id: "operations",
    icon: operationsIcon,
    colorVar: "var(--color-secondary)",
    colorClasses: {
      text: "text-secondary",
      border: "border-secondary",
      hoverBorder: "hover:border-secondary",
      bg: "bg-secondary/10",
      borderSubtle: "border-secondary/20",
      shadow: "hover:shadow-secondary/5",
    },
  },
] as const;

const AutomationSuite = () => {
  const t = useTranslations("home.automationSuite");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance"
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-12 max-w-xl font-normal"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {AREAS.map((area, index) => {
            const c = area.colorClasses;
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;
            const hasGlow = isFirst || isSecond || isThird;

            return (
              <motion.div
                key={area.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse tracking for visual effect only */}
                <div
                  onMouseMove={handleMouseMove}
                  className="group relative rounded-2xl p-px overflow-hidden"
                  style={{ background: "var(--color-border)" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                    style={{
                      background: `radial-gradient(circle 150px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), ${area.colorVar}, transparent)`,
                    }}
                  />
                  <div
                    className={`relative z-10 w-full text-left rounded-[15px] bg-background p-6 transition-all hover:shadow-lg ${c.shadow} ${hasGlow ? "overflow-hidden" : ""}`}
                  >
                    {isFirst && (
                      <>
                        {/* Unmasked glow — bottom-right corner */}
                        <span
                          className="pointer-events-none absolute -bottom-32 -right-24 h-64 w-64 rounded-full blur-[100px] opacity-20"
                          style={{ background: "var(--brand-lavender)" }}
                          aria-hidden="true"
                        />

                        {/* Center glow masked by square */}
                        <div
                          className="pointer-events-none absolute overflow-hidden"
                          style={{
                            top: -2,
                            left: -2,
                            width: "55%",
                            height: "70%",
                          }}
                          aria-hidden="true"
                        >
                          <span
                            className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
                            style={{
                              background: "var(--brand-lavender)",
                              left: "calc(60% + 20px)",
                              top: "calc(60% + 2px)",
                            }}
                          />
                        </div>
                      </>
                    )}

                    {isSecond && (
                      <>
                        {/* Unmasked glow — top-left corner */}
                        <span
                          className="pointer-events-none absolute -top-32 -left-24 h-64 w-64 rounded-full blur-[100px] opacity-20"
                          style={{ background: area.colorVar }}
                          aria-hidden="true"
                        />

                        {/* Center glow masked by triangle */}
                        <div
                          className="pointer-events-none absolute"
                          style={{
                            top: "calc(30%)",
                            left: "calc(50%)",
                            width: "150%",
                            height: "130%",
                            transform: "translateX(-50%)",
                            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                          }}
                          aria-hidden="true"
                        >
                          <span
                            className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
                            style={{
                              background: area.colorVar,
                              left: "calc(60% + 20px)",
                              top: "calc(60% + 2px)",
                            }}
                          />
                        </div>
                      </>
                    )}

                    {isThird && (
                      <>
                        {/* Unmasked glow — bottom-left corner */}
                        <span
                          className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full blur-[100px] opacity-15"
                          style={{ background: area.colorVar }}
                          aria-hidden="true"
                        />

                        {/* Glow masked by circle — top-right */}
                        <div
                          className="pointer-events-none absolute"
                          style={{
                            top: "-100px",
                            left: "30%",
                            width: "130%",
                            height: "130%",
                            clipPath: "circle(50% at 50% 50%)",
                          }}
                          aria-hidden="true"
                        >
                          <span
                            className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
                            style={{
                              background: area.colorVar,
                              left: "30%",
                              top: "50%",
                            }}
                          />
                        </div>
                      </>
                    )}

                    <div className="relative flex items-center gap-3 mb-4">
                      <span
                        className="inline-block w-6 h-6 shrink-0"
                        style={{
                          maskImage: `url(${typeof area.icon === "string" ? area.icon : area.icon.src})`,
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskImage: `url(${typeof area.icon === "string" ? area.icon : area.icon.src})`,
                          WebkitMaskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          background: `linear-gradient(to top right, color-mix(in srgb, ${area.colorVar} 80%, transparent), color-mix(in srgb, ${area.colorVar} 30%, transparent))`,
                        }}
                      />
                      <h3
                        className="font-sora text-2xl font-semibold tracking-tight bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(to right, color-mix(in srgb, ${area.colorVar} 50%, white), white)`,
                        }}
                      >
                        {t(`areas.${area.id}.name`)}
                      </h3>
                    </div>
                    <p className="relative text-sm text-muted-foreground mb-4">
                      {t(`areas.${area.id}.tagline`)}
                    </p>
                    <div className="relative flex items-baseline gap-1.5">
                      <span
                        className={`font-sora text-2xl font-bold tracking-tighter ${c.text}/60`}
                      >
                        {t(`areas.${area.id}.heroMetric`)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t(`areas.${area.id}.heroMetricLabel`)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationSuite;
