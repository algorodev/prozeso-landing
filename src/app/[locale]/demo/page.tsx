import { DemoFAQ } from "@/components/Demo/DemoFAQ";
import { DemoMedia } from "@/components/Demo/DemoMedia";
import { HeroDemo } from "@/components/Demo/HeroDemo";
import { Highlights } from "@/components/Demo/Highlights";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Product Demo",
	description: "See how it works in a quick walkthrough.",
};

export default function DemoPage() {
	return (
		<main className="min-h-dvh max-w-7xl mx-auto">
			<HeroDemo />
			<DemoMedia
				mode="video"
				videoUrl={
					process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ||
					"https://www.youtube.com/embed/dQw4w9WgXcQ"
				}
			/>
			<Highlights />
			<DemoFAQ />
		</main>
	);
}
