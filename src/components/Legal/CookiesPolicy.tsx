"use client";

import { useTranslations } from "next-intl";
import LegalContainer from "@/components/Legal/LegalContainer";

export default function CookiesPolicy() {
  const t = useTranslations("legal.cookies");

  const tocKeys = [
    { id: "what-are-cookies", key: "whatAreCookies" },
    { id: "how-we-use-cookies", key: "howWeUseCookies" },
    { id: "types-of-cookies", key: "typesOfCookies" },
    { id: "manage-cookies", key: "manageCookies" },
    { id: "changes", key: "changes" },
    { id: "contact", key: "contact" },
  ] as const;

  const toc = tocKeys.map(({ id, key }) => ({
    id,
    label: t(`toc.${key}`),
  }));

  return (
    <LegalContainer title={t("title")} updatedAt={t("updatedAt")} toc={toc}>
      <section id="what-are-cookies">
        <h2 className="font-semibold mb-2">{t("whatAreCookies.title")}</h2>
        <p>{t("whatAreCookies.text")}</p>
      </section>

      <section id="how-we-use-cookies" className="py-8">
        <h2 className="font-semibold mb-2">{t("howWeUseCookies.title")}</h2>
        <ul>
          {[0, 1, 2, 3].map((i) => (
            <li key={i}>{t(`howWeUseCookies.items.${i}`)}</li>
          ))}
        </ul>
      </section>

      <section id="types-of-cookies">
        <h2 className="font-semibold mb-2">{t("typesOfCookies.title")}</h2>
        <ul>
          {[0, 1, 2, 3].map((i) => (
            <li key={i}>{t(`typesOfCookies.items.${i}`)}</li>
          ))}
        </ul>
      </section>

      <section id="manage-cookies" className="py-8">
        <h2 className="font-semibold mb-2">{t("manageCookies.title")}</h2>
        <p>{t("manageCookies.text")}</p>
      </section>

      <section id="changes">
        <h2 className="font-semibold mb-2">{t("changes.title")}</h2>
        <p>{t("changes.text")}</p>
      </section>

      <section id="contact" className="py-8">
        <h2 className="font-semibold mb-2">{t("contact.title")}</h2>
        <p>{t("contact.text")}</p>
      </section>
    </LegalContainer>
  );
}
