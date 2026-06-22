import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car, Plane, Ship, Send, Code2, Wrench, Cpu, BatteryCharging, Users, Search,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useStore, actions, selectors } from "@/lib/store";
import type { Community } from "@/lib/mock";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export const Route = createFileRoute("/communities/")({
  head: () => ({ meta: [{ title: "Сообщества — МоДелизМ Форум" }] }),
  component: CommunitiesPage,
});

const ICON_MAP: Record<string, typeof Car> = {
  Car, Plane, Ship, Send, Code2, Wrench, Cpu, BatteryCharging,
};

const pulse = {
  animate: { opacity: [0.4, 0.7, 0.4] },
  transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
};

type SectionKey = "my" | "recommended";

function CommunitiesPage() {
  const currentUserId = useStore((s) => s.currentUserId);
  const myCommunities = useStore(selectors.userCommunities(currentUserId));
  const recommended = useStore(selectors.recommendedCommunities(currentUserId));

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 250);
  const [sort, setSort] = useState<"popular" | "new">("popular");
  const [section, setSection] = useState<SectionKey>("my");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // If user has no memberships, default to recommended
  useEffect(() => {
    if (myCommunities.length === 0) setSection("recommended");
  }, [myCommunities.length]);

  const apply = (list: Community[]) => {
    const q = debounced.trim().toLowerCase();
    const arr = list.filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
    if (sort === "popular") return [...arr].sort((a, b) => b.members - a.members);
    return [...arr].reverse();
  };

  const myFiltered = useMemo(() => apply(myCommunities), [myCommunities, debounced, sort]);
  const recFiltered = useMemo(() => apply(recommended), [recommended, debounced, sort]);

  const visible = section === "my" ? myFiltered : recFiltered;

  const handleToggle = (c: Community) => {
    const isMember = myCommunities.some((x) => x.id === c.id);
    if (isMember) {
      actions.leaveCommunity(currentUserId, c.id);
      toast.success("Вы покинули сообщество", { description: `Вы больше не участник «${c.name}»` });
    } else {
      actions.joinCommunity(currentUserId, c.id);
      toast.success(`Вы вступили в «${c.name}»`, { description: "Сообщество добавлено в ваш профиль" });
    }
  };

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-[20px]">
        <header>
          <h1 className="font-display text-[28px] font-bold" style={{ color: "var(--foreground)" }}>Сообщества</h1>
          <p className="mt-[4px] text-[14px]" style={{ color: "var(--foreground-50)" }}>Тематические группы моделистов</p>
        </header>

        {/* Section tabs */}
        <nav role="tablist" className="relative flex items-center gap-[4px]" style={{ borderBottom: "1px solid var(--border)" }}>
          {([
            { key: "my" as const, label: "Мои сообщества", count: myCommunities.length },
            { key: "recommended" as const, label: "Рекомендованные", count: recommended.length },
          ]).map((t) => {
            const active = section === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setSection(t.key)}
                className="relative inline-flex items-center gap-[8px] px-[16px] py-[12px] text-[14px] font-semibold transition-colors"
                style={{ color: active ? "var(--foreground)" : "var(--foreground-50)" }}
              >
                {t.label}
                <span
                  className="inline-flex h-[20px] min-w-[20px] items-center justify-center px-[6px] text-[11px] font-bold"
                  style={{
                    background: active ? "var(--accent-soft)" : "var(--background-surface)",
                    color: active ? "var(--accent)" : "var(--foreground-50)",
                    borderRadius: 999,
                  }}
                >
                  {t.count}
                </span>
                {active && (
                  <motion.span
                    layoutId="communities-tab-underline"
                    className="absolute bottom-[-1px] left-[8px] right-[8px]"
                    style={{ height: 3, background: "var(--accent)", borderRadius: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="grid place-items-center gap-[10px] py-[60px] text-center" style={{ border: "1px dashed var(--border-strong)", borderRadius: 14 }}>
            <div className="grid h-[56px] w-[56px] place-items-center rounded-full" style={{ background: "var(--background-surface)", color: "var(--foreground-50)" }}>
              <Users size={24} />
            </div>
            <div className="font-display text-[16px] font-semibold" style={{ color: "var(--foreground)" }}>
              {section === "my" ? "Вы ещё не вступили ни в одно сообщество" : "Ничего не найдено"}
            </div>
            {section === "my" && (
              <button
                onClick={() => setSection("recommended")}
                className="mt-[4px] inline-flex h-[36px] items-center px-[16px] text-[13px] font-semibold"
                style={{ background: "var(--accent)", color: "white", borderRadius: 10 }}
              >
                Посмотреть рекомендованные
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div key={section} className="grid gap-[16px] sm:grid-cols-2">
              {visible.map((g) => {
                const Icon = ICON_MAP[g.avatarIcon ?? "Users"] ?? Users;
                const isMember = myCommunities.some((x) => x.id === g.id);
                return (
                  <article
                    key={g.id}
                    className="flex flex-col gap-[14px] p-[20px]"
                    style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16 }}
                  >
                    <Link
                      to="/communities/$id"
                      params={{ id: g.id }}
                      className="flex items-start gap-[14px] rounded-lg -m-2 p-2 transition-colors hover:bg-[var(--background-surface)]"
                    >
                      <div className="grid h-[56px] w-[56px] shrink-0 place-items-center" style={{ background: "var(--accent-soft)", borderRadius: 10 }}>
                        <Icon size={28} style={{ color: "var(--accent)" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-[16px] font-semibold" style={{ color: "var(--foreground)" }}>
                          {g.name}
                        </div>
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
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => handleToggle(g)}
                      className="w-full font-semibold transition-colors duration-150"
                      style={{
                        height: 38, borderRadius: 10, fontSize: 13,
                        background: isMember ? "transparent" : "var(--accent)",
                        color: isMember ? "var(--foreground-70)" : "white",
                        border: isMember ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {isMember ? "Покинуть" : "Вступить"}
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
