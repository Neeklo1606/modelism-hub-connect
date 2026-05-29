import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { communities as initial } from "@/lib/mock";
import { Users2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/communities")({
  head: () => ({ meta: [{ title: "Сообщества — МоДелизМ Club" }] }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  const [list, setList] = useState(initial);
  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-2xl font-bold">Сообщества</h1>
          <p className="text-sm text-muted-foreground">Тематические группы моделистов</p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((g) => (
            <article key={g.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-primary">
                  <Users2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold">{g.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{g.category} · {g.members.toLocaleString("ru")} участников</p>
                  <p className="mt-2 text-sm">{g.description}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => { setList(list.map((c) => c.id === g.id ? { ...c, joined: !c.joined } : c)); toast.success(g.joined ? "Вышли из сообщества" : "Вы вступили"); }}
                  className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium ${g.joined ? "border bg-card" : "bg-primary text-primary-foreground"}`}
                >
                  {g.joined ? "Покинуть" : "Вступить"}
                </button>
                <button className="flex-1 rounded-lg border px-3 py-1.5 text-xs hover:bg-muted">Открыть</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
