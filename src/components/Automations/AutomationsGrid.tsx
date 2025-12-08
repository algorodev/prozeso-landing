"use client";

import { useMemo, useState } from "react";
import { AUTOMATIONS } from "@/data/automations";
import AutomationCard from "./AutomationCard";
import AutomationsFilter from "./AutomationsFilter";

export default function AutomationsGrid() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AUTOMATIONS.filter((a) => {
      const cats: unknown = (a as any).categories ?? (a as any).category ?? [];
      const inCategory = Array.isArray(cats)
        ? cats.includes(category)
        : typeof cats === "string"
          ? cats === category
          : false;
      const categoryOk = category === "all" ? true : inCategory;
      if (!categoryOk) return false;
      if (!q) return true;
      const inTitle = a.title.toLowerCase().includes(q);
      const inDesc = a.description.toLowerCase().includes(q);
      const inVerticals = (a.verticals || []).some((v) =>
        v.toLowerCase().includes(q),
      );
      return inTitle || inDesc || inVerticals;
    });
  }, [category, query]);

  return (
    <>
      <section className="py-16 px-6">
        <AutomationsFilter
          category={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
        />
      </section>
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((automation) => (
              <AutomationCard
                key={automation.id}
                automation={automation as any}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
