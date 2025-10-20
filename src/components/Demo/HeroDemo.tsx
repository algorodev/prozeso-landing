"use client";

import {useTranslations} from 'next-intl';
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export function HeroDemo() {
	const t = useTranslations('demo.hero');

  return (
    <section className="pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
	        {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground">
	        {t('subtitle')}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg" asChild>
            <LocalizedLink href="/start">
	            {t('cta')}
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
