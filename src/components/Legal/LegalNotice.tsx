"use client";

import { useTranslations } from "next-intl";
import LegalContainer from "@/components/Legal/LegalContainer";

export default function LegalNotice() {
  const t = useTranslations("legal.notice");

  const tocKeys = [
    { id: "owner-identification", key: "ownerIdentification" },
    { id: "purpose", key: "purpose" },
    { id: "use-conditions", key: "useConditions" },
    { id: "intellectual-property", key: "intellectualProperty" },
    { id: "liability", key: "liability" },
    { id: "external-links", key: "externalLinks" },
    { id: "governing-law", key: "governingLaw" },
    { id: "contact", key: "contact" },
  ] as const;

  const toc = tocKeys.map(({ id, key }) => ({
    id,
    label: t(`toc.${key}`),
  }));

  return (
    <LegalContainer title={t("title")} updatedAt={t("updatedAt")} toc={toc}>
      <section id="owner-identification">
        <h2 className="font-semibold mb-2">{t("ownerIdentification.title")}</h2>
        <p>{t("ownerIdentification.text")}</p>
        <ul>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i}>{t(`ownerIdentification.items.${i}`)}</li>
          ))}
        </ul>
      </section>

      <section id="purpose" className="py-8">
        <h2 className="font-semibold mb-2">{t("purpose.title")}</h2>
        <p>{t("purpose.text")}</p>
      </section>

      <section id="use-conditions">
        <h2 className="font-semibold mb-2">{t("useConditions.title")}</h2>
        <p>{t("useConditions.text")}</p>
      </section>

      <section id="intellectual-property" className="py-8">
        <h2 className="font-semibold mb-2">
          {t("intellectualProperty.title")}
        </h2>
        <p>{t("intellectualProperty.text")}</p>
      </section>

      <section id="liability">
        <h2 className="font-semibold mb-2">{t("liability.title")}</h2>
        <p>{t("liability.text")}</p>
      </section>

      <section id="external-links" className="py-8">
        <h2 className="font-semibold mb-2">{t("externalLinks.title")}</h2>
        <p>{t("externalLinks.text")}</p>
      </section>

      <section id="governing-law">
        <h2 className="font-semibold mb-2">{t("governingLaw.title")}</h2>
        <p>{t("governingLaw.text")}</p>
      </section>

      <section id="contact" className="py-8">
        <h2 className="font-semibold mb-2">{t("contact.title")}</h2>
        <p>{t("contact.text")}</p>
      </section>
    </LegalContainer>
  );
}
