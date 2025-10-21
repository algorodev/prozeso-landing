"use client";

import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

type Props =
  | { mode: "video"; videoUrl: string }
  | { mode: "screens"; screenshots: string[] };

export function DemoMedia(props: Props) {
  const t = useTranslations("demo.media");

  return (
    <section className="py-10 px-4">
      <Card id="demo-media" className="border">
        <CardContent>
          {props.mode === "video" ? (
            <VideoEmbed url={props.videoUrl} title={t("videoTitle")} />
          ) : (
            <ScreensCarousel
              images={props.screenshots}
              i18n={{
                placeholder: t("screensPlaceholder"),
                prev: t("prev"),
                next: t("next"),
                altPrefix: t("screenshotAltPrefix"),
              }}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <iframe
        className="size-full"
        src={url}
        title={title}
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <PlayCircle className="size-12 opacity-20" />
      </div>
    </div>
  );
}

function ScreensCarousel({
  images = [],
  i18n,
}: {
  images: string[];
  i18n: { placeholder: string; prev: string; next: string; altPrefix: string };
}) {
  const [idx, setIdx] = useState(0);
  const has = images.length > 0;

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  if (!has) {
    return (
      <div className="aspect-video grid place-items-center rounded-xl border bg-muted/20">
        <p className="text-sm text-muted-foreground">{i18n.placeholder}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border bg-background">
        <img
          src={images[idx]}
          alt={`${i18n.altPrefix} ${idx + 1}`}
          className="block w-full h-auto select-none"
          draggable={false}
        />
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="secondary"
          size="icon"
          className="ms-2"
          onClick={prev}
          aria-label={i18n.prev}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="secondary"
          size="icon"
          className="me-2"
          onClick={next}
          aria-label={i18n.next}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={[
              "inline-block h-1.5 w-6 rounded-full",
              i === idx ? "bg-foreground" : "bg-muted-foreground/30",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
