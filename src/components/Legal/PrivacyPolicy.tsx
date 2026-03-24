"use client";

import { useTranslations } from "next-intl";
import LegalContainer from "@/components/Legal/LegalContainer";

export default function PrivacyPolicy() {
  const t = useTranslations("legal.privacy");

  const tocKeys = [
    { id: "overview", key: "overview" },
    { id: "data-we-collect", key: "dataWeCollect" },
    { id: "how-we-use-data", key: "howWeUseData" },
    { id: "sharing", key: "sharing" },
    { id: "data-retention", key: "dataRetention" },
    { id: "your-rights", key: "yourRights" },
    { id: "contact", key: "contact" },
  ] as const;

  const toc = tocKeys.map(({ id, key }) => ({
    id,
    label: t(`toc.${key}`),
  }));

  return (
    <LegalContainer title={t("title")} updatedAt={t("updatedAt")} toc={toc}>
      <section id="overview">
        <h2 className="font-semibold mb-2">{t("overview.title")}</h2>
        <p>{t("overview.text")}</p>
      </section>

      <section id="data-we-collect" className="py-8">
        <h2 className="font-semibold mb-2">{t("dataWeCollect.title")}</h2>
        <ul>
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`dataWeCollect.items.${i}`)}</li>
          ))}
        </ul>
      </section>

      <section id="how-we-use-data">
        <h2 className="font-semibold mb-2">{t("howWeUseData.title")}</h2>
        <ul>
          {[0, 1, 2].map((i) => (
            <li key={i}>{t(`howWeUseData.items.${i}`)}</li>
          ))}
        </ul>
      </section>

      <section id="sharing" className="py-8">
        <h2 className="font-semibold mb-2">{t("sharing.title")}</h2>
        <p>{t("sharing.text")}</p>
      </section>

      <section id="data-retention">
        <h2 className="font-semibold mb-2">{t("dataRetention.title")}</h2>
        <p>{t("dataRetention.text")}</p>
      </section>

      <section id="your-rights" className="py-8">
        <h2 className="font-semibold mb-2">{t("yourRights.title")}</h2>
        <p>{t("yourRights.text")}</p>
      </section>

      <section id="contact">
        <h2 className="font-semibold mb-2">{t("contact.title")}</h2>
        <p>{t("contact.text")}</p>
      </section>
    </LegalContainer>
  );
}
