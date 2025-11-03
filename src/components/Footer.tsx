"use client";

import { LocalizedLink } from '@/i18n/LocalizedLink'
import { useLocale } from "next-intl";

export function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();

  return (
    <footer className="w-full border-t">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 py-8">
        <nav aria-label="Legal" className="mb-4 text-sm text-muted-foreground">
          <ul className="flex flex-wrap justify-center gap-4">
            <li>
              <LocalizedLink href={`/${locale}/legal/terms`} className="hover:underline">
                Terms
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink href={`/${locale}/legal/privacy`} className="hover:underline">
                Privacy
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink href={`/${locale}/legal/cookies`} className="hover:underline">
                Cookies
              </LocalizedLink>
            </li>
          </ul>
        </nav>
        <p className="text-center text-sm text-muted-foreground">
          © {year} Prozeso. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
