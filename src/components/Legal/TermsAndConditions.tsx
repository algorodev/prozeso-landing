"use client";

import { useTranslations } from "next-intl";
import LegalContainer from "@/components/Legal/LegalContainer";

export default function TermsAndConditions() {
  const t = useTranslations("legal.terms");

  const tocKeys = [
    { id: "agreement", key: "agreement" },
    { id: "intellectual-property", key: "intellectualProperty" },
    { id: "user-representations", key: "userRepresentations" },
    { id: "prohibited-activities", key: "prohibitedActivities" },
    { id: "limitation-of-liability", key: "limitationOfLiability" },
    { id: "governing-law", key: "governingLaw" },
    { id: "contact-us", key: "contactUs" },
  ] as const;

  const toc = tocKeys.map(({ id, key }) => ({
    id,
    label: t(`toc.${key}`),
  }));

  return (
    <LegalContainer title={t("title")} updatedAt={t("updatedAt")} toc={toc}>
      <section id="agreement">
        <h2 className="font-semibold mb-2">{t("agreement.title")}</h2>
        <p>{t("agreement.text")}</p>
      </section>

      <section id="intellectual-property" className="py-8">
        <h2 className="font-semibold mb-2">
          {t("intellectualProperty.title")}
        </h2>
        <p>{t("intellectualProperty.text")}</p>
      </section>

      <section id="user-representations">
        <h2 className="font-semibold mb-2">{t("userRepresentations.title")}</h2>
        <p>{t("userRepresentations.text")}</p>
      </section>

      <section id="prohibited-activities" className="py-8">
        <h2 className="font-semibold mb-2">
          {t("prohibitedActivities.title")}
        </h2>
        <ul>
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`prohibitedActivities.items.${i}`)}</li>
          ))}
        </ul>
      </section>

      <section id="limitation-of-liability">
        <h2 className="font-semibold mb-2">
          {t("limitationOfLiability.title")}
        </h2>
        <p>{t("limitationOfLiability.text")}</p>
      </section>

      <section id="governing-law" className="py-8">
        <h2 className="font-semibold mb-2">{t("governingLaw.title")}</h2>
        <p>{t("governingLaw.text")}</p>
      </section>

      <section id="contact-us">
        <h2 className="font-semibold mb-2">{t("contactUs.title")}</h2>
        <p>{t("contactUs.text")}</p>
      </section>
    </LegalContainer>
  );
}
