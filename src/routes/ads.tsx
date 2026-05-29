import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ads as initial, categories } from "@/lib/mock";
import { AdCard } from "@/components/AdCard";
import { Search, Plus } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/ads")({
  head: () => ({ meta: [{ title: "Объявления — МоДелизМ Club" }] }),
  component: AdsPage,
});

function AdsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(30000);

  const list = initial.filter((a) =>
    (cat === "Все" || a.category === cat) &&
    a.price <= maxPrice &&
    (a.title.toLowerCase().includes(q.toLowerCase()) || a.subcategory.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Объявления</h1>
            <p className="text-sm text-muted-foreground">Покупка, продажа, обмен запчастями и моделями</p>
          </div>
          <Link to="/ads/new" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> Разместить
          </Link>
        </header>

        <div className="grid gap-3 rounded-xl border bg-card p-3 sm:grid-cols-[1fr_200px_220px]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск" className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm">
            <option>Все</option>
            {categories.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            До {maxPrice.toLocaleString("ru")} ₽
            <input type="range" min={500} max={30000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="flex-1 accent-primary" />
          </label>
        </div>

        {list.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => <AdCard key={a.id} ad={a} />)}
          </div>
        ) : (
          <EmptyState title="Ничего не найдено" description="Попробуйте изменить фильтры" />
        )}
      </div>
    </AppLayout>
  );
}
