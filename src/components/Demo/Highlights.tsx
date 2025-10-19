import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Tailored flow",
    desc: "The experience adapts to each client’s goals for faster clarity.",
  },
  {
    icon: MessageSquare,
    title: "Built-in comms",
    desc: "Seamless messaging after confirmation keeps everything in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Payments & trust",
    desc: "Secure payments and transparent timelines from day one.",
  },
];

export function Highlights() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
