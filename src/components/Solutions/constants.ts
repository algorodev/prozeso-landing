export type ColorGroup = {
  id: string;
  color: string;
  areaIds: string[];
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "clientFacing",
    color: "var(--color-primary)",
    areaIds: ["bookings", "customerSuccess"],
  },
  {
    id: "revenueGrowth",
    color: "var(--color-secondary)",
    areaIds: ["sales", "marketing"],
  },
  {
    id: "backendOps",
    color: "var(--color-chart-2)",
    areaIds: ["operations", "stock"],
  },
  {
    id: "corporateSupport",
    color: "var(--color-accent)",
    areaIds: ["finance", "management", "hr"],
  },
];
