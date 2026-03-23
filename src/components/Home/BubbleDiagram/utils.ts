import { COLOR_GROUPS } from "@/components/Solutions/constants";

export const AREA_TO_GROUP: Record<string, string> = Object.fromEntries(
  COLOR_GROUPS.flatMap((group) =>
    group.areaIds.map((areaId) => [areaId, group.id]),
  ),
);
