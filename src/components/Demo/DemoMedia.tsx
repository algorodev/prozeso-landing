"use client";

import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

type Props =
  | { mode: "video"; videoUrl: string }
  | { mode: "screens"; screenshots: string[] };

export function DemoMedia(props: Props) {
  return (
    <section className="py-10">
      <Card id="demo-media" className="border">
        <CardContent>
          {props.mode === "video" ? (
            <VideoEmbed url={props.videoUrl} />
          ) : (
            <ScreensCarousel images={props.screenshots} />
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function VideoEmbed({ url }: { url: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <iframe
        className="size-full"
        src={url}
        title="Product demo video"
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

function ScreensCarousel({ images = [] }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const has = images.length > 0;

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  if (!has) {
    return (
      <div className="aspect-video grid place-items-center rounded-xl border bg-muted/20">
        <p className="text-sm text-muted-foreground">
          Add screenshots to DemoMedia
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border bg-background">
        <img
          src={images[idx]}
          alt={`Screenshot ${idx + 1}`}
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
          aria-label="Previous"
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
          aria-label="Next"
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
