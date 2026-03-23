import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

async function detectLocale() {
  const headersStore = await headers();
  const acceptLang = headersStore.get("accept-language");
  if (!acceptLang) return defaultLocale;

  const preferred = acceptLang.split(",")[0]?.split("-")[0];
  return locales.includes(preferred as Locale)
    ? (preferred as Locale)
    : defaultLocale;
}

export default async function RootRedirectPage() {
  const locale = await detectLocale();
  redirect(`/${locale}`);
}
