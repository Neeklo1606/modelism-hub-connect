import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ads as ALL_ADS } from "@/lib/mock";
import { AdCard } from "@/components/AdCard";
import { AdCardSkeleton } from "@/components/ads/AdCardSkeleton";
import { AdSortBar, type SortKey, type ViewMode } from "@/components/ads/AdSortBar";
import { AdFiltersDesktop, AdFiltersSheet, DEFAULT_FILTERS, type FiltersState } from "@/components/ads/AdFilters";
import { Plus, Inbox } from "lucide-react";

export const Route = createFileRoute("/ads")({
  head: () => ({ meta: [{ title: "Объявления — МоДелизМ Club" }] }),
  component: AdsPage,
});

const PAGE = 12;

function AdsPage() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sort, setSort] = useState<SortKey>("new");
  const [view, setView] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { setPage(1); }, [debounced, sort, filters]);

  const filtered = useMemo(() => {
    const out = ALL_ADS.filter((a) => {
      if (filters.category !== "Все" && a.category !== filters.category) return false;
      if (filters.subcategory !== "Все" && a.subcategory !== filters.subcategory) return false;
      if (filters.status !== "Все" && a.status !== filters.status) return false;
      if (filters.city && !a.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters.priceMin && a.price < filters.priceMin) return false;
      if (filters.priceMax && a.price > filters.priceMax) return false;
      if (filters.conditions.length && (!a.condition || !filters.conditions.includes(a.condition))) return false;
      if (filters.deliveries.length && !a.delivery.some((d) => filters.deliveries.includes(d))) return false;
      if (filters.withPhotoOnly && !(a.gallery && a.gallery.length > 0)) return false;
      if (debounced) {
        const hay = `${a.title} ${a.subcategory} ${a.description ?? ""}`.toLowerCase();
        if (!hay.includes(debounced)) return false;
      }
      return true;
    });
    out.sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      if (sort === "popular") return (b.views ?? 0) - (a.views ?? 0);
      return 0; // "new" = original order (newest first)
    });
    return out;
  }, [filters, sort, debounced]);

  const visible = filtered.slice(0, page * PAGE);
  const canLoadMore = visible.length < filtered.length;

  return (
    <AppLayout rightColumn={false}>
      <div className="flex flex-col gap-[24px]">
        <header className="flex flex-wrap items-end justify-between gap-[16px]">
          <div>
            <h1 className="font-display text-[28px] font-bold leading-none sm:text-[36px]"
              style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Объявления
            </h1>
            <p className="mt-[8px] text-[14px]" style={{ color: "var(--foreground-70)" }}>
              Купля, продажа и обмен запчастей, моделей и инструмента
            </p>
          </div>
          <Link
            to="/ads/new"
            className="inline-flex items-center gap-[8px] px-[20px] text-[14px] font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "var(--r-button)",
              boxShadow: "var(--shadow-button)",
              height: 44,
            }}
          >
            <Plus size={16} /> Разместить объявление
          </Link>
        </header>

        <div className="flex gap-[24px]">
          <AdFiltersDesktop
            value={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />

          <div className="min-w-0 flex-1 space-y-[16px]">
            <AdSortBar
              query={query} onQuery={setQuery}
              sort={sort} onSort={setSort}
              view={view} onView={setView}
              onOpenFilters={() => setSheetOpen(true)}
              count={filtered.length}
            />

            {loading ? (
              <div className={view === "grid"
                ? "grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-[12px]"}>
                {Array.from({ length: 6 }).map((_, i) => <AdCardSkeleton key={i} />)}
              </div>
            ) : visible.length === 0 ? (
              <EmptyAds onReset={() => { setFilters(DEFAULT_FILTERS); setQuery(""); }} />
            ) : (
              <>
                <div className={view === "grid"
                  ? "grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-[12px]"}>
                  {visible.map((a) => <AdCard key={a.id} ad={a} />)}
                </div>

                {canLoadMore && (
                  <div className="flex justify-center pt-[8px]">
                    <button
                      type="button"
                      onClick={() => setPage((p) => p + 1)}
                      className="inline-flex items-center px-[24px] text-[14px] font-semibold transition-colors"
                      style={{
                        background: "var(--background-elevated)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-button)",
                        height: 48,
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      Показать ещё {Math.min(PAGE, filtered.length - visible.length)}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <AdFiltersSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        value={filters}
        onChange={setFilters}
        onReset={() => { setFilters(DEFAULT_FILTERS); setSheetOpen(false); }}
      />
    </AppLayout>
  );
}

function EmptyAds({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="grid place-items-center gap-[12px] p-[48px] text-center"
      style={{
        background: "var(--background-elevated)",
        border: "1px dashed var(--border-strong)",
        borderRadius: "var(--r-card)",
      }}
    >
      <div
        className="grid h-[56px] w-[56px] place-items-center"
        style={{ background: "var(--background-surface)", color: "var(--foreground-50)", borderRadius: "var(--r-pill)" }}
      >
        <Inbox size={24} />
      </div>
      <h3 className="font-display text-[18px] font-bold" style={{ color: "var(--foreground)" }}>Ничего не найдено</h3>
      <p className="text-[13px]" style={{ color: "var(--foreground-70)" }}>
        Попробуйте смягчить фильтры или поискать другое
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-[4px] inline-flex items-center px-[18px] text-[13px] font-semibold"
        style={{ background: "var(--accent)", color: "#fff", borderRadius: "var(--r-button)", height: 40 }}
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
