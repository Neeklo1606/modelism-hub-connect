import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { Category } from "@/lib/mock";

export function CategoryCard({ c }: { c: Category }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Icons.Box;
  return (
    <article className="flex flex-col rounded-xl border bg-card p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-base font-semibold">{c.name}</h3>
          <p className="text-xs text-muted-foreground">{c.members.toLocaleString("ru")} участников</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
      <Link to="/categories/$id" params={{ id: c.id }} className="mt-3 inline-flex w-fit items-center rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
        Открыть
      </Link>
    </article>
  );
}
