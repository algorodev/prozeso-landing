export type ColorGroup = {
  id: string;
  label: string;
  color: string;
  areaIds: string[];
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "clientFacing",
    label: "Atención al cliente",
    color: "var(--color-primary)",
    areaIds: ["bookings", "customerSuccess"],
  },
  {
    id: "revenueGrowth",
    label: "Ingresos / Crecimiento",
    color: "var(--color-secondary)",
    areaIds: ["sales", "marketing"],
  },
  {
    id: "backendOps",
    label: "Operaciones / Logística",
    color: "var(--color-chart-2)",
    areaIds: ["operations", "stock"],
  },
  {
    id: "corporateSupport",
    label: "Corporativo / Soporte",
    color: "var(--color-accent)",
    areaIds: ["finance", "management", "hr"],
  },
];
