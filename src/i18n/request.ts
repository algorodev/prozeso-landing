import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const isSupported = (l: unknown): l is (typeof locales)[number] =>
    typeof l === "string" && (locales as readonly string[]).includes(l);

  const locale = isSupported(requestLocale) ? requestLocale : defaultLocale;

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
