import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { users, me } from "@/lib/mock";
import { Search, MapPin, UserPlus, MessageSquare, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/friends")({
  head: () => ({ meta: [{ title: "Друзья — МоДелизМ Club" }] }),
  component: FriendsPage,
});

function FriendsPage() {
  const [q, setQ] = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());

  const list = users.filter((u) => u.id !== me.id && (u.name.toLowerCase().includes(q.toLowerCase()) || u.interests.toLowerCase().includes(q.toLowerCase())));

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-2xl font-bold">Друзья</h1>
          <p className="text-sm text-muted-foreground">Найдите единомышленников</p>
        </header>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по имени, интересам" className="w-full rounded-lg border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((u) => {
            const isAdded = added.has(u.id);
            return (
              <article key={u.id} className="flex gap-3 rounded-xl border bg-card p-4">
                <img src={u.avatar} alt="" className="h-14 w-14 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{u.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{u.city}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{u.interests}</div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => { const n = new Set(added); isAdded ? n.delete(u.id) : n.add(u.id); setAdded(n); toast.success(isAdded ? "Удалён из друзей" : "Заявка отправлена"); }}
                      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium ${isAdded ? "border bg-card" : "bg-primary text-primary-foreground"}`}
                    >
                      {isAdded ? <><Check className="h-3 w-3" />В друзьях</> : <><UserPlus className="h-3 w-3" />Добавить</>}
                    </button>
                    <button className="flex items-center gap-1 rounded-md border px-3 py-1 text-xs hover:bg-muted"><MessageSquare className="h-3 w-3" />Написать</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
