"use client";

import { Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const Footer = () => {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <LocalizedLink
              href="/"
              className="flex items-center gap-2 font-bold text-lg tracking-tight"
            >
              <Logo className="w-fit" />
            </LocalizedLink>
            <p className="text-sm text-foreground-subtle max-w-xs">
              {t("tagline")}
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="font-medium text-sm mb-4">
                {t("sections.product")}
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <LocalizedLink
                    href="/solutions"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.solutions")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink
                    href="/start"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.assessment")}
                  </LocalizedLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-4">
                {t("sections.company")}
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <LocalizedLink
                    href="/about"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.about")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink
                    href="/legal/notice"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.notice")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink
                    href="/legal/terms"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.terms")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink
                    href="/legal/privacy"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.privacy")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink
                    href="/legal/cookies"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.cookies")}
                  </LocalizedLink>
                </li>
                <li>
                  <a
                    href="mailto:admin@prozeso.com"
                    className="text-foreground-subtle hover:text-foreground transition-colors"
                  >
                    {t("links.contact")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground-muted">
          <p>{t("rights", { year })}</p>
          <div className="flex gap-6">
            <a
              href="https://instagram.com/prozeso.ai"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener"
              aria-label={t("social.instagram")}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/prozeso"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener"
              aria-label={t("social.linkedin")}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
