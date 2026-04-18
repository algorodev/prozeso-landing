"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";

const TESTIMONIAL_IDS = ["1", "2", "3", "7", "4", "5", "6"] as const;
const SPEED_PX_PER_SEC = 40;

const Testimonials = () => {
  const t = useTranslations("home.testimonials");

  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (halfWidth === 0) return;
    const next = x.get() - (delta / 1000) * SPEED_PX_PER_SEC;
    x.set(next <= -halfWidth ? next + halfWidth : next);
  });

  const items = TESTIMONIAL_IDS.map((id) => ({
    id,
    quote: t(`items.${id}.quote`),
    name: t(`items.${id}.name`),
    role: t(`items.${id}.role`),
    avatar: t(`items.${id}.avatar`),
    web: t(`items.${id}.web`),
  }));

  const loop = [...items, ...items];

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 scroll-mt-24"
      aria-labelledby="testimonials-title"
    >
      <div className="container mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="testimonials-title" className="section-title mb-4">
            {t("title")}
          </h2>
          <p className="hero-subtitle text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch gap-6 w-max py-2"
        >
          {loop.map((item, idx) => {
            const initials = item.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            const cardInner = (
              <Card
                className={`h-full w-[320px] sm:w-[380px] border-border/60 bg-transparent transition-colors ${
                  item.web
                    ? "hover:border-primary/60 hover:bg-card/30"
                    : "hover:border-border"
                }`}
              >
                <CardContent className="pt-6 pb-6 flex flex-col h-full">
                  <figure className="flex flex-col h-full m-0">
                    <Quote
                      className="size-7 text-primary/60 mb-4 shrink-0"
                      aria-hidden="true"
                    />
                    <blockquote className="text-sm leading-relaxed text-foreground mb-6 flex-1 m-0">
                      <p className="m-0">{`“${item.quote}”`}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-3 mt-auto">
                      <Avatar className="size-11 border border-border/60">
                        <AvatarImage
                          src={item.avatar}
                          alt={item.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <cite className="text-sm font-semibold text-foreground not-italic">
                          {item.name}
                        </cite>
                        <span className="text-xs text-muted-foreground">
                          {item.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            );

            return (
              <div
                key={`${item.id}-${idx}`}
                className="shrink-0"
                aria-hidden={idx >= items.length ? true : undefined}
              >
                {item.web ? (
                  <a
                    href={item.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} — ${item.role}`}
                    tabIndex={idx >= items.length ? -1 : 0}
                    className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {cardInner}
                  </a>
                ) : (
                  cardInner
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-10 px-6"
      >
        {t("moreComing")}
      </motion.p>
    </section>
  );
};

export default Testimonials;
