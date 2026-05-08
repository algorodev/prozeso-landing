"use client";

import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_bottom,theme(colors.border/15)_1px,transparent_1px),linear-gradient(to_right,theme(colors.border/15)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:radial-gradient(40rem_40rem_at_50%_0%,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 size-40 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 size-40 rounded-full bg-secondary/15 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full border border-border/50 bg-background/60 px-3 py-1 body-sm text-foreground-muted shadow-sm backdrop-blur">
            <AlertTriangle className="mr-2 size-3.5 text-primary" />
            <span>Something went wrong</span>
          </div>
          <h1 className="text-balance display-xl">
            We hit an unexpected error
          </h1>
          <p className="mt-4 text-pretty body-md leading-7 text-foreground-muted sm:text-lg">
            Sorry about that. You can try again, or head back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => reset()}>
              <RotateCcw className="mr-2 size-5" />
              Try again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 size-5" />
                Go back home
              </Link>
            </Button>
          </div>
          <div className="mt-10 w-full">
            <div className="mx-auto w-full max-w-xl rounded-xl border border-border/60 bg-gradient-to-b from-background/60 to-background/30 p-5 text-left shadow-sm">
              <div className="flex items-start gap-3 body-md text-foreground-muted">
                <span className="mt-1 inline-flex size-6 items-center justify-center rounded-full border border-border/60 bg-background/70 body-sm font-semibold text-foreground/80">
                  ERR
                </span>
                <div className="space-y-1">
                  {error?.message ? (
                    <p className="break-words body-md">{error.message}</p>
                  ) : (
                    <p className="body-md">An unexpected error occurred.</p>
                  )}
                  {error?.digest && (
                    <p className="body-sm">Digest: {error.digest}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
