import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { categoryById } from "@/lib/mock";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/categories/$id")({
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useParams();
  const c = categoryById(id);
  if (!c) return <AppLayout rightColumn={false}><p>Категория не найдена</p></AppLayout>;
  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        <nav className="text-xs text-muted-foreground"><Link to="/categories" className="hover:text-primary">Категории</Link> / {c.name}</nav>
        <header>
          <h1 className="font-display text-2xl font-bold">{c.name}</h1>
          <p className="text-sm text-muted-foreground">{c.description} · {c.members.toLocaleString("ru")} участников</p>
        </header>
        <h2 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Подкатегории</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {c.subcategories.map((s) => (
            <li key={s.id}>
              <Link to="/categories/$id/$subId" params={{ id: c.id, subId: s.id }} className="flex items-center justify-between rounded-xl border bg-card p-4 hover:border-primary hover:shadow-sm">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Чат · Объявления</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
