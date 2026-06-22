import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { categories, posts } from "@/lib/mock";

export function RightCategories() {
  const [openId, setOpenId] = useState<string | null>("c1");

  const countByCategory = (name: string) =>
    posts.filter((p) => p.category === name).length;

  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div
        className="sticky top-4 rounded-[14px] border"
        style={{ background: "var(--background-elevated)", borderColor: "var(--border)" }}
      >
        <div className="border-b px-[16px] py-[14px]" style={{ borderColor: "var(--border)" }}>
          <h3
            className="text-[13px] font-semibold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-display)", color: "var(--foreground-70)" }}
          >
            Категории
          </h3>
        </div>
        <ul className="p-[8px]">
          {categories.map((c) => {
            const open = openId === c.id;
            const count = countByCategory(c.name);
            return (
              <li key={c.id}>
                <button
                  onClick={() => setOpenId(open ? null : c.id)}
                  className="flex w-full items-center justify-between rounded-[10px] px-[12px] py-[10px] text-[14px] transition-colors hover:bg-[var(--background-surface)]"
                  aria-expanded={open}
                >
                  <span className="flex flex-col items-start gap-[2px]">
                    <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{c.name}</span>
                    <span className="text-[11px]" style={{ color: "var(--foreground-50)" }}>
                      {count > 0 ? `${count} публ.` : `${c.members.toLocaleString("ru")} участн.`}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-[14px] w-[14px] transition-transform ${open ? "rotate-180" : ""}`}
                    style={{ color: "var(--foreground-50)" }}
                  />
                </button>
                {open && (
                  <ul className="mb-[6px] ml-[14px] mt-[2px] space-y-[2px] border-l pl-[12px]" style={{ borderColor: "var(--border)" }}>
                    {c.subcategories.map((s) => (
                      <li key={s.id}>
                        <Link
                          to="/categories/$id/$subId"
                          params={{ id: c.id, subId: s.id }}
                          className="block rounded-[6px] px-[10px] py-[6px] text-[13px] transition-colors hover:bg-[var(--background-surface)]"
                          style={{ color: "var(--foreground-70)" }}
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/categories/$id"
                        params={{ id: c.id }}
                        className="block rounded-[6px] px-[10px] py-[6px] text-[12px] font-medium"
                        style={{ color: "var(--accent)" }}
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
