"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const LOGOS = [
  {
    src: "/assets/La_Vanguardia.png",
    alt: "La Vanguardia",
    href: "https://www.lavanguardia.com/",
  },
  {
    src: "/assets/Pimec-negatiu.png",
    alt: "Pimec",
    href: "https://pimec.org/es",
  },
] as const;

const TrustedBy = () => {
  const t = useTranslations("trustedBy");

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8"
        >
          {t("title")}
        </motion.p>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16"
        >
          {LOGOS.map((logo) => (
            <motion.li
              key={logo.src}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="flex items-center justify-center"
            >
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.alt}
                className="inline-flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <LocalizedLink
            href="/use-cases#testimonials"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("testimonialsLink")}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </LocalizedLink>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
