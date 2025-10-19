"use client";

import { useMemo, useState } from "react";
import AutomationFilters from "@/components/Automations/AutomationFilters";
import AutomationGrid from "@/components/Automations/AutomationGrid";
import { AUTOMATIONS, type SortKey, scoreROI } from "./data";

export default function AutomationsPage() {
	const [q, setQ] = useState("");
	const [activeCats, setActiveCats] = useState<string[]>([]);
	const [sort, setSort] = useState<SortKey>("Popularity");

	const filtered = useMemo(() => {
		let list = AUTOMATIONS.filter((a) => {
			const matchesQ = (
				a.title +
				" " +
				a.description +
				" " +
				a.integrations.join(" ")
			)
				.toLowerCase()
				.includes(q.trim().toLowerCase());
			const matchesCat =
				activeCats.length === 0 ||
				activeCats.every((c) => a.categories.includes(c as any));
			return matchesQ && matchesCat;
		});

		switch (sort) {
			case "ROI":
				list = [...list].sort((a, b) => scoreROI(b.roi) - scoreROI(a.roi));
				break;
			case "Newest":
				list = [...list].sort((a, b) => a.id.localeCompare(b.id));
				break;
			default:
				list = [...list].sort((a, b) => a.title.localeCompare(b.title));
		}

		return list;
	}, [q, activeCats, sort]);

	function toggleCat(cat: string) {
		setActiveCats((prev) =>
			prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
		);
	}

	return (
		<section className="relative">
			<div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-16">
				<AutomationFilters
					q={q}
					setQ={setQ}
					activeCats={activeCats}
					toggleCat={toggleCat}
					sort={sort}
					setSort={setSort}
				/>
				<AutomationGrid items={filtered} />
			</div>
		</section>
	);
}
