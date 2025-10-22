"use client"

import { ElevenlabsDemo } from '@/components/Demo/ElevenlabsDemo'
import type { Metadata } from "next";
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
