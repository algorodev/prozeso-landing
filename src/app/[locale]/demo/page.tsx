"use client";

import type { Metadata } from "next";
import { ElevenlabsDemo } from "@/components/Demo/ElevenlabsDemo";
import { HeroDemo } from "@/components/Demo/HeroDemo";
import { Highlights } from "@/components/Demo/Highlights";

export default function DemoPage() {
  return (
    <main className="min-h-dvh max-w-7xl mx-auto">
      <HeroDemo />
      <Highlights />
      <div className="py-10">
        <ElevenlabsDemo />
      </div>
    </main>
  );
}
