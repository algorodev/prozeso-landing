"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";

const Testimonials = () => {
  const items = [
    {
      quote:
        "We replaced three manual handoffs with a single n8n flow. Reports that took all Friday now arrive before 9am.",
      name: "María López",
      role: "Head of Operations",
      company: "CleverMarket",
      avatar: "/images/avatars/maria.jpg",
      rating: 5,
    },
    {
      quote:
        "The dashboard gave us visibility we didn’t have. We spotted a leaking segment and recovered ~12% MRR in two weeks.",
      name: "James Patel",
      role: "Growth Lead",
      company: "Finly",
      avatar: "/images/avatars/james.jpg",
      rating: 5,
    },
    {
      quote:
        "Security reviews were smooth: RBAC, encrypted secrets, and logs out‑of‑the‑box. Zero production incidents in 6 months.",
      name: "Sofia Nguyen",
      role: "CTO",
      company: "Horizon Health",
      avatar: "/images/avatars/sofia.jpg",
      rating: 5,
    },
  ];

  return (
    <section
      className="relative overflow-x-clip"
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            What our customers say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-3 text-muted-foreground"
          >
            Proof that automation pays off — in hours saved, errors prevented,
            and revenue protected.
          </motion.p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.article
              key={t.name}
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/Review"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Card className="h-full bg-card/60 backdrop-blur-sm shadow-sm ring-1 ring-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`size-4 ${idx < t.rating ? "fill-current" : "opacity-30"}`}
                      />
                    ))}
                  </div>
                  <blockquote
                    className="mt-3 text-base leading-relaxed"
                    itemProp="reviewBody"
                  >
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>
                        {t.name
                          .split(" ")
                          .map((s) => s[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium" itemProp="author">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mt-14 grid grid-cols-2 items-center justify-items-center gap-6 opacity-80 sm:grid-cols-3 lg:grid-cols-6"
        >
          {[
            "/images/logos/logo1.svg",
            "/images/logos/logo2.svg",
            "/images/logos/logo3.svg",
            "/images/logos/logo4.svg",
            "/images/logos/logo5.svg",
            "/images/logos/logo6.svg",
          ].map((src) => (
            <img
              key={src}
              src={src}
              alt="Client logo"
              className="h-8 w-auto object-contain"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
