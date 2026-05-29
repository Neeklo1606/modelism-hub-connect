import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/mock";

export function RightCategories() {
  const [openId, setOpenId] = useState<string | null>("c1");
  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-4 rounded-xl border bg-card">
        <div className="border-b px-4 py-3">
          <h3 className="font-display text-sm font-semibold">Категории</h3>
        </div>
        <ul className="p-2">
          {categories.map((c) => {
            const open = openId === c.id;
            return (
              <li key={c.id}>
                <button
                  onClick={() => setOpenId(open ? null : c.id)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.members.toLocaleString("ru")}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <ul className="ml-2 mt-1 space-y-0.5 border-l pl-3">
                    {c.subcategories.map((s) => (
                      <li key={s.id}>
                        <Link
                          to="/categories/$id/$subId"
                          params={{ id: c.id, subId: s.id }}
                          className="block rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-primary"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/categories/$id"
                        params={{ id: c.id }}
                        className="block rounded px-2 py-1 text-xs text-primary hover:underline"
                      >
                        Все подкатегории →
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
