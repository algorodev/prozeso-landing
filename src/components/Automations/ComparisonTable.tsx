"use client";

import { Check, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type Row = {
  label: string;
  starter?: boolean | string | number;
  growth?: boolean | string | number;
  scale?: boolean | string | number;
};

const ROWS: Row[] = [
  { label: "Active workflows", starter: 3, growth: 15, scale: "Unlimited" },
  { label: "Tasks / month", starter: "2.5k", growth: "25k", scale: "150k+" },
  { label: "Dashboard & logs", starter: true, growth: true, scale: true },
  { label: "Slack / Email alerts", starter: false, growth: true, scale: true },
  { label: "SSO (SAML / OIDC)", starter: false, growth: false, scale: true },
  {
    label: "Support",
    starter: "Email",
    growth: "Priority (24h)",
    scale: "Priority (4h)",
  },
  { label: "DPA & residency", starter: false, growth: false, scale: true },
];

export default function ComparisonTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[720px]">
            <TableCaption className="text-xs">
              Feature availability across plans. Contact us for custom needs.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-[40%] text-muted-foreground">
                  Features
                </TableHead>
                <TableHead className="w-[20%] text-muted-foreground">
                  Starter
                </TableHead>
                <TableHead className="w-[20%] text-muted-foreground">
                  Growth
                </TableHead>
                <TableHead className="w-[20%] text-muted-foreground">
                  Scale
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r, i) => (
                <TableRow
                  key={r.label}
                  className={i % 2 ? "bg-card" : "bg-card/80"}
                >
                  <TableCell className="font-medium">{r.label}</TableCell>
                  <TableCell>{renderCell(r.starter)}</TableCell>
                  <TableCell>{renderCell(r.growth)}</TableCell>
                  <TableCell>{renderCell(r.scale)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function renderCell(v: Row["starter"]) {
  if (v === true)
    return <Check className="size-4 text-primary" aria-label="Included" />;
  if (v === false)
    return <Minus className="size-4 opacity-60" aria-label="Not included" />;
  return <span>{v}</span>;
}
