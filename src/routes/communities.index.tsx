import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car, Plane, Ship, Send, Code2, Wrench, Cpu, BatteryCharging, Users, Search,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { communities as initial } from "@/lib/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/communities")({
  head: () => ({ meta: [{ title: "Сообщества — МоДелизМ Club" }] }),
  component: CommunitiesPage,
});

const ICON_MAP: Record<string, typeof Car> = {
  Car, Plane, Ship, Send, Code2, Wrench, Cpu, BatteryCharging,
};

const pulse = {
  animate: { opacity: [0.4, 0.7, 0.4] },
  transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
};

function CommunitiesPage() {
  const [list, setList] = useState(initial);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"popular" | "new">("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const arr = list.filter((c) => !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    if (sort === "popular") return [...arr].sort((a, b) => b.members - a.members);
    return [...arr].reverse();
  }, [list, query, sort]);

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-[20px]">
        <header>
          <h1 className="font-display text-[28px] font-bold" style={{ color: "var(--foreground)" }}>Сообщества</h1>
          <p className="mt-[4px] text-[14px]" style={{ color: "var(--foreground-50)" }}>Тематические группы моделистов</p>
        </header>

        <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--foreground-50)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию или категории"
              className="w-full text-[14px] outline-none"
              style={{
                height: 40, paddingLeft: 36, paddingRight: 12,
                background: "var(--background-surface)", borderRadius: 10,
                border: "1.5px solid transparent", color: "var(--foreground)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
            />
          </div>

          <div className="flex shrink-0" style={{ background: "var(--background-surface)", borderRadius: 10, padding: 3 }}>
            {([["popular", "Популярные"], ["new", "Новые"]] as const).map(([key, label]) => {
              const active = sort === key;
              return (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className="text-[13px] transition-all duration-150"
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: active ? "var(--background)" : "transparent",
                    color: active ? "var(--foreground)" : "var(--foreground-50)",
                    fontWeight: active ? 600 : 500,
                    boxShadow: active ? "var(--shadow-card)" : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-[16px] sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-[20px]" style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16 }}>
                <div className="flex items-start gap-[12px]">
                  <motion.div {...pulse} className="h-[56px] w-[56px]" style={{ background: "var(--background-surface)", borderRadius: 10 }} />
                  <div className="flex-1 space-y-[8px]">
                    <motion.div {...pulse} className="h-[14px] rounded-[6px]" style={{ background: "var(--background-surface)", width: "60%" }} />
                    <motion.div {...pulse} className="h-[12px] rounded-[6px]" style={{ background: "var(--background-surface)", width: "90%" }} />
                    <motion.div {...pulse} className="h-[12px] rounded-[6px]" style={{ background: "var(--background-surface)", width: "80%" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="grid gap-[16px] sm:grid-cols-2">
              {filtered.map((g) => {
                const Icon = ICON_MAP[g.avatarIcon ?? "Users"] ?? Users;
                return (
                  <article
                    key={g.id}
                    className="flex flex-col gap-[14px] p-[20px]"
                    style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16 }}
                  >
                    <div className="flex items-start gap-[14px]">
                      <div className="grid h-[56px] w-[56px] shrink-0 place-items-center" style={{ background: "var(--accent-soft)", borderRadius: 10 }}>
                        <Icon size={28} style={{ color: "var(--accent)" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link to="/communities/$id" params={{ id: g.id }} className="font-display text-[16px] font-semibold" style={{ color: "var(--foreground)" }}>
                          {g.name}
                        </Link>
                        <p className="mt-[6px] text-[14px]" style={{ color: "var(--foreground-70)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {g.description}
                        </p>
                        <div className="mt-[8px] flex items-center gap-[12px]">
                          <span className="inline-flex items-center gap-[4px] text-[13px]" style={{ color: "var(--foreground-50)" }}>
                            <Users size={14} /> {g.members.toLocaleString("ru")}
                          </span>
                          <span className="text-[11px]" style={{ background: "var(--background-surface)", padding: "3px 8px", borderRadius: 6, color: "var(--foreground-70)" }}>
                            {g.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => {
                        setList((p) => p.map((c) => c.id === g.id ? { ...c, joined: !c.joined } : c));
                        toast.success(g.joined ? "Вы покинули сообщество" : `Вы вступили в сообщество «${g.name}»`);
                      }}
                      className="w-full font-semibold transition-colors duration-150"
                      style={{
                        height: 38, borderRadius: 10, fontSize: 13,
                        background: g.joined ? "transparent" : "var(--accent)",
                        color: g.joined ? "var(--foreground-70)" : "white",
                        border: g.joined ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {g.joined ? "Покинуть" : "Вступить"}
                    </motion.button>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </AppLayout>
  );
}
