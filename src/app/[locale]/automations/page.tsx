"use client";

import { useTranslations } from 'next-intl'
import { useMemo, useState } from "react";
import AutomationFilters from "@/components/Automations/AutomationFilters";
import AutomationGrid from "@/components/Automations/AutomationGrid";
import { AUTOMATIONS, type SortKey } from "./data";

function toArrayOfStrings(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (value && typeof value === "object") return Object.values(value as Record<string, string>);
  if (value == null) return [];
  return [String(value)];
}

function toKeysIfObject(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (value && typeof value === "object") return Object.keys(value as Record<string, unknown>);
  return [];
}

function parseRoiPercent(text: string | undefined): number {
  if (!text) return 0;
  const m = String(text).match(/(-?\d+(?:\.\d+)?)\s*%/);
  return m ? parseFloat(m[1]) : 0;
}

export default function AutomationsPage() {
  const [q, setQ] = useState("");
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("Popularity");
  const t = useTranslations();

  const filtered = useMemo(() => {
    let list = AUTOMATIONS.filter((a) => {
      const base = `automations.${a.id}`;
      const title = t(`${base}.title`);
      const description = t(`${base}.description`);
      const categoriesRaw = t.raw(`${base}.categories`);
      const integrationsRaw = t.raw(`${base}.integrations`);

      const categoriesKeys = toKeysIfObject(categoriesRaw);
      const integrations = toArrayOfStrings(integrationsRaw);

      const qText = (title + " " + description + " " + integrations.join(" ")).toLowerCase();
      const matchesQ = qText.includes(q.trim().toLowerCase());
      const matchesCat =
        activeCats.length === 0 || activeCats.every((c) => categoriesKeys.includes(c));

      return matchesQ && matchesCat;
    });

    switch (sort) {
      case "ROI": {
        list = [...list].sort((a, b) => {
          const ra = parseRoiPercent(t(`automations.${a.id}.roiShort`));
          const rb = parseRoiPercent(t(`automations.${b.id}.roiShort`));
          return rb - ra;
        });
        break;
      }
      case "Newest": {
        list = [...list].sort((a, b) => b.id.localeCompare(a.id));
        break;
      }
      default: {
        list = [...list].sort((a, b) => {
          const ta = t(`automations.${a.id}.title`);
          const tb = t(`automations.${b.id}.title`);
          return ta.localeCompare(tb);
        });
      }
    }

    return list;
  }, [q, activeCats, sort, t]);

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
