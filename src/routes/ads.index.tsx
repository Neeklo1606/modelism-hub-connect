import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Inbox, Eye, Heart, TrendingUp, MessageCircle, X } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { type Ad } from "@/lib/mock";
import { useStore, actions, selectors, type AdStatusKey } from "@/lib/store";
import { MyAdCard, type MyAdStatus } from "@/components/MyAdCard";

export const Route = createFileRoute("/ads/")({
  head: () => ({ meta: [{ title: "Мои объявления — МоДелизМ Club" }] }),
  component: MyAdsPage,
});

const CURRENT_USER_ID = "u1";

type TabKey = "active" | "archived" | "drafts";

const TABS: { key: TabKey; label: string }[] = [
  { key: "active",    label: "Активные" },
  { key: "archived",  label: "Архив" },
  { key: "drafts",    label: "Неопубликованные" },
];

interface DecoratedAd { ad: Ad; status: MyAdStatus }

function mapStatus(s: AdStatusKey): MyAdStatus | null {
  if (s === "deleted") return null;
  if (s === "archived") return "archived";
  if (s === "moderation") return "moderation";
  if (s === "rejected") return "rejected";
  return "active";
}

function MyAdsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("active");
  const allMyAds = useStore(selectors.myAds(CURRENT_USER_ID));
  const adStatus = useStore((s) => s.adStatus);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const myAds = useMemo<DecoratedAd[]>(() => {
    const out: DecoratedAd[] = [];
    for (const a of allMyAds) {
      const mapped = mapStatus(adStatus[a.id] ?? "active");
      if (!mapped) continue;
      out.push({ ad: a, status: mapped });
    }
    return out;
  }, [allMyAds, adStatus]);

  const counts = useMemo(() => ({
    active:   myAds.filter((x) => x.status === "active").length,
    archived: myAds.filter((x) => x.status === "archived").length,
    drafts:   myAds.filter((x) => x.status === "moderation" || x.status === "rejected").length,
  }), [myAds]);

  const visible = useMemo(() => {
    if (tab === "active")   return myAds.filter((x) => x.status === "active");
    if (tab === "archived") return myAds.filter((x) => x.status === "archived");
    return myAds.filter((x) => x.status === "moderation" || x.status === "rejected");
  }, [tab, myAds]);

  // Aggregate stats from active ads
  const stats = useMemo(() => {
    const active = myAds.filter((x) => x.status === "active");
    const views = active.reduce((s, x) => s + (x.ad.views ?? 0), 0);
    const likes = active.reduce((s, x) => s + (x.ad.likes ?? 0), 0);
    const earnings = active.reduce((s, x) => s + x.ad.price, 0);
    return { count: active.length, views, likes, earnings };
  }, [myAds]);

  const handleCreate = () => navigate({ to: "/ads/new" });
  const handleSelect = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  };
  const clearSelection = () => setSelected(new Set());
  const archiveSelected = () => {
    selected.forEach((id) => actions.archiveAd(id));
    clearSelection();
  };
  const deleteSelected = () => {
    selected.forEach((id) => actions.deleteAd(id));
    clearSelection();
  };


  return (
    <AppLayout rightColumn={false}>
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[20px]">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-[16px]">
          <div>
            <h1
              className="font-display text-[28px] font-bold leading-[1.1] sm:text-[32px]"
              style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
            >
              Мои объявления
            </h1>
            <p className="mt-[6px] text-[14px]" style={{ color: "var(--foreground-70)" }}>
              Управляйте своими публикациями, статистикой и архивом
            </p>
          </div>

          {/* Desktop sticky CTA */}
          <button
            type="button"
            onClick={handleCreate}
            className="hidden items-center gap-[8px] px-[20px] text-[14px] font-semibold transition-all md:inline-flex"
            style={{
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "var(--r-button)",
              boxShadow: "var(--shadow-button)",
              height: 44,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
          >
            <Plus size={16} /> Разместить объявление
          </button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-[12px] md:grid-cols-4">
          <StatCard icon={<TrendingUp size={18} />} label="Активных" value={stats.count.toString()} accent />
          <StatCard icon={<Eye size={18} />} label="Просмотров" value={stats.views.toLocaleString("ru")} />
          <StatCard icon={<Heart size={18} />} label="Лайков" value={stats.likes.toLocaleString("ru")} />
          <StatCard icon={<MessageCircle size={18} />} label="Сумма" value={`${stats.earnings.toLocaleString("ru")} ₽`} />
        </section>

        {/* Tabs */}
        <nav
          className="sticky top-0 z-10 flex items-center gap-[4px] overflow-x-auto py-[8px]"
          style={{
            background: "var(--background)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--border)",
          }}
          role="tablist"
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            const count = counts[t.key];
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className="relative inline-flex items-center gap-[8px] whitespace-nowrap px-[16px] py-[10px] text-[14px] font-semibold transition-colors"
                style={{ color: active ? "var(--foreground)" : "var(--foreground-50)" }}
              >
                {t.label}
                <span
                  className="inline-flex h-[20px] min-w-[20px] items-center justify-center px-[6px] text-[11px] font-bold"
                  style={{
                    background: active ? "var(--accent-soft)" : "var(--background-surface)",
                    color: active ? "var(--accent)" : "var(--foreground-50)",
                    borderRadius: "var(--r-pill)",
                  }}
                >
                  {count}
                </span>
                {active && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-[8px] right-[8px]"
                    style={{ height: 3, background: "var(--accent)", borderRadius: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bulk toolbar */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-wrap items-center justify-between gap-[12px] px-[16px] py-[12px]"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--accent)",
                borderRadius: "var(--r-card-sm)",
              }}
            >
              <span className="text-[14px] font-semibold" style={{ color: "var(--accent)" }}>
                Выбрано: {selected.size}
              </span>
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={archiveSelected}
                  className="inline-flex items-center px-[14px] text-[13px] font-semibold"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--foreground)",
                    borderRadius: "var(--r-button)",
                    height: 34,
                  }}
                >
                  Архивировать
                </button>
                <button
                  type="button"
                  onClick={deleteSelected}
                  className="inline-flex items-center px-[14px] text-[13px] font-semibold"
                  style={{
                    background: "var(--error)",
                    color: "#fff",
                    borderRadius: "var(--r-button)",
                    height: 34,
                  }}
                >
                  Удалить
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="grid h-[34px] w-[34px] place-items-center"
                  style={{
                    background: "transparent",
                    color: "var(--foreground-50)",
                    borderRadius: "var(--r-pill)",
                  }}
                  aria-label="Отменить выбор"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-[12px] pb-[120px] md:pb-[40px]"
          >
            {visible.length === 0 ? (
              <EmptyTab tab={tab} onCreate={handleCreate} />
            ) : (
              visible.map(({ ad, status }) => (
                <MyAdCard
                  key={ad.id}
                  ad={ad}
                  status={status}
                  selected={selected.has(ad.id)}
                  onSelect={handleSelect}
                  onArchive={(id) => actions.archiveAd(id)}
                  onPublish={(id) => actions.setAdStatus(id, "active")}
                  onDelete={(id) => actions.deleteAd(id)}
                />

              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={handleCreate}
        aria-label="Разместить объявление"
        className="fixed right-[20px] bottom-[20px] z-30 grid h-[56px] w-[56px] place-items-center md:hidden"
        style={{
          background: "var(--accent)",
          color: "#fff",
          borderRadius: "var(--r-pill)",
          boxShadow: "var(--shadow-glow-accent), var(--shadow-float)",
        }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </AppLayout>
  );
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="flex flex-col gap-[6px] p-[14px]"
      style={{
        background: accent ? "var(--accent-soft)" : "var(--background-surface)",
        border: `1px solid ${accent ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--r-card-sm)",
      }}
    >
      <div className="flex items-center gap-[6px] text-[12px] font-medium" style={{ color: accent ? "var(--accent)" : "var(--foreground-50)" }}>
        {icon}
        <span style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      </div>
      <div
        className="font-display text-[22px] font-bold leading-none"
        style={{ color: accent ? "var(--accent)" : "var(--foreground)" }}
      >
        {value}
      </div>
    </div>
  );
}

function EmptyTab({ tab, onCreate }: { tab: TabKey; onCreate: () => void }) {
  const config = {
    active:   { title: "Нет активных объявлений",   desc: "Создайте первое — это бесплатно и занимает 2 минуты." },
    archived: { title: "Архив пуст",                desc: "Архивированные объявления можно вернуть в любой момент." },
    drafts:   { title: "Нет неопубликованных",      desc: "Здесь появятся объявления на модерации или отклонённые." },
  }[tab];

  return (
    <div
      className="grid place-items-center gap-[14px] p-[56px] text-center"
      style={{
        background: "var(--background-surface)",
        border: "1px dashed var(--border-strong)",
        borderRadius: "var(--r-card)",
      }}
    >
      <div
        className="grid h-[64px] w-[64px] place-items-center"
        style={{ background: "var(--background-elevated)", color: "var(--foreground-50)", borderRadius: "var(--r-pill)" }}
      >
        <Inbox size={26} />
      </div>
      <div>
        <h3 className="font-display text-[20px] font-bold" style={{ color: "var(--foreground)" }}>{config.title}</h3>
        <p className="mt-[6px] text-[14px]" style={{ color: "var(--foreground-70)" }}>{config.desc}</p>
      </div>
      {tab === "active" && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-[4px] inline-flex items-center gap-[8px] px-[20px] text-[14px] font-semibold"
          style={{
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "var(--r-button)",
            boxShadow: "var(--shadow-button)",
            height: 42,
          }}
        >
          <Plus size={16} /> Разместить объявление
        </button>
      )}
    </div>
  );
}
