import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, Newspaper, UserPlus, Compass, Bookmark } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdBanner } from "@/components/AdBanner";
import { CreatePostForm, type CreatePostPayload } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { Logo } from "@/components/Logo";
import { PostCardSkeleton } from "@/components/feed/Skeleton";
import { FeedFilterTabs, type FeedFilter } from "@/components/feed/FeedFilterTabs";
import { EmptyFeedState } from "@/components/feed/EmptyFeedState";
import { posts as mockPosts, me, categories } from "@/lib/mock";
import type { Post } from "@/lib/mock";
import cover from "@/assets/cover-modelizm.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Лента — МоДелизМ Club" },
      { name: "description", content: "Главная лента сообщества моделистов: новые проекты, фото, обсуждения." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    composer: (search.composer as string) || undefined,
  }),
  component: FeedPage,
});

const PAGE_SIZE = 6;

function FeedPage() {
  const { composer } = Route.useSearch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (composer === "open") {
      setMobileOpen(true);
      navigate({ to: "/", search: {}, replace: true });
    }
  }, [composer, navigate]);

  const toggleSave = (id: string) =>
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // initial skeleton load
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "following") return posts.filter((p) => p.isFollowing);
    if (filter === "categories" && activeCategory) return posts.filter((p) => p.category === activeCategory);
    if (filter === "saved") return posts.filter((p) => savedIds.has(p.id));
    return posts;
  }, [posts, filter, activeCategory, savedIds]);

  // infinite loading
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filter, activeCategory]);

  useEffect(() => {
    if (initialLoading) return;
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && visible < filtered.length && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length));
            setLoadingMore(false);
          }, 600);
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [filtered.length, visible, loadingMore, initialLoading]);

  const addPost = (p: CreatePostPayload) => {
    setPosts([
      {
        id: `np${Date.now()}`,
        authorId: me.id,
        date: "только что",
        category: p.category,
        title: p.title,
        text: p.text,
        image: p.photos[0],
        images: p.photos,
        tags: p.subcategory ? [p.subcategory] : [],
        views: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        reposts: 0,
        status: "moderation",
        isFollowing: true,
        commentList: [],
      },
      ...posts,
    ]);
    setMobileOpen(false);
  };

  const slice = filtered.slice(0, visible);

  return (
    <AppLayout>
      <div className="space-y-[16px]">
        <section
          className="relative -mx-3 overflow-hidden border-y lg:mx-0 lg:rounded-[20px] lg:border"
          style={{ borderColor: "var(--border)" }}
        >
          <img src={cover} alt="МоДелизМ Club" width={1920} height={640} className="h-[200px] w-full object-cover lg:h-[280px]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[16px] text-center">
            <Logo size={56} showText={false} />
            <h1
              className="mt-[12px] text-[28px] font-bold tracking-tight sm:text-[44px]"
              style={{ fontFamily: "var(--font-display)", color: "#fff", letterSpacing: "-0.02em" }}
            >
              МоДелизМ <span style={{ color: "var(--accent)" }}>Club</span>
            </h1>
            <p className="mt-[8px] max-w-[480px] text-[13px] sm:text-[15px]" style={{ color: "rgba(255,255,255,0.80)" }}>
              Моделизм — это жизнь, остальное детали
            </p>
          </div>
        </section>

        <AdBanner />

        <div className="hidden lg:block">
          <CreatePostForm onCreate={addPost} />
        </div>

        <FeedFilterTabs value={filter} onChange={setFilter} />

        {filter === "categories" && (
          <div className="-mx-3 flex gap-[6px] overflow-x-auto px-[12px] pb-[4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0">
            {categories.map((c) => {
              const active = activeCategory === c.name;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(active ? null : c.name)}
                  className="shrink-0 rounded-[999px] border px-[14px] py-[6px] text-[13px] transition-colors"
                  style={{
                    background: active ? "var(--accent)" : "var(--background-elevated)",
                    color: active ? "#fff" : "var(--foreground)",
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="-mx-3 space-y-[16px] sm:mx-0">
          {initialLoading ? (
            Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
          ) : slice.length === 0 ? (
            filter === "following" ? (
              <EmptyFeedState
                icon={UserPlus}
                title="Здесь пока пусто"
                description="Подпишитесь на авторов и сообщества, чтобы видеть их публикации в ленте."
                ctaLabel="Найти авторов"
                onCta={() => setFilter("all")}
              />
            ) : filter === "categories" && !activeCategory ? (
              <EmptyFeedState
                icon={Compass}
                title="Выберите категорию"
                description="Отфильтруйте ленту по интересующему вас направлению моделизма."
              />
            ) : filter === "saved" ? (
              <EmptyFeedState
                icon={Bookmark}
                title="Нет сохранённых публикаций"
                description="Нажмите на иконку закладки у понравившейся публикации."
                ctaLabel="Вернуться в ленту"
                onCta={() => setFilter("all")}
              />
            ) : (
              <EmptyFeedState
                icon={Newspaper}
                title="Публикаций не найдено"
                description="В этой категории пока никто ничего не опубликовал."
                ctaLabel="Показать все"
                onCta={() => {
                  setFilter("all");
                  setActiveCategory(null);
                }}
              />
            )
          ) : (
            slice.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                isSavedExternal={savedIds.has(p.id)}
                onToggleSave={toggleSave}
              />
            ))
          )}

          {!initialLoading && visible < filtered.length && (
            <div ref={sentinelRef} className="flex items-center justify-center py-[24px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-[20px] w-[20px]" style={{ color: "var(--accent)" }} />
              </motion.div>
              <span className="ml-[10px] text-[13px]" style={{ color: "var(--foreground-50)" }}>
                Загружаем ещё…
              </span>
            </div>
          )}

          {!initialLoading && slice.length > 0 && visible >= filtered.length && (
            <p className="py-[24px] text-center text-[12px]" style={{ color: "var(--foreground-50)" }}>
              Вы посмотрели всю ленту
            </p>
          )}
        </div>
      </div>

      {/* FAB removed: BottomNav «+» is the single entry point for creating content */}


      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:hidden"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setMobileOpen(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-[20px]"
            style={{ background: "var(--background-elevated)" }}
          >
            <div
              className="flex items-center justify-between border-b px-[16px] py-[14px]"
              style={{ borderColor: "var(--border)" }}
            >
              <h3
                className="text-[16px] font-semibold"
                style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
              >
                Новая публикация
              </h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-[8px] p-[6px] hover:bg-[var(--background-surface)]"
                style={{ color: "var(--foreground-70)" }}
              >
                <X className="h-[20px] w-[20px]" />
              </button>
            </div>
            <CreatePostForm onCreate={addPost} compact />
          </motion.div>
        </div>
      )}
    </AppLayout>
  );
}
