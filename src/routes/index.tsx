import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdBanner } from "@/components/AdBanner";
import { CreatePostForm, type CreatePostPayload } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { Logo } from "@/components/Logo";
import { posts as mockPosts, me } from "@/lib/mock";
import type { Post } from "@/lib/mock";
import cover from "@/assets/cover-modelizm.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Лента — МоДелизМ Club" },
      { name: "description", content: "Главная лента сообщества моделистов: новые проекты, фото, обсуждения." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        status: "moderation",
      },
      ...posts,
    ]);
    setMobileOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <section className="relative -mx-3 overflow-hidden border-y lg:mx-0 lg:rounded-2xl lg:border">
          <img
            src={cover}
            alt="МоДелизМ Club"
            width={1920}
            height={640}
            className="h-[200px] w-full object-cover lg:h-[280px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <Logo size={56} showText={false} />
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              МоДелизМ <span className="text-primary">Club</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
              Моделизм — это жизнь, остальное детали
            </p>
          </div>
        </section>

        <AdBanner />

        <div className="hidden lg:block">
          <CreatePostForm onCreate={addPost} />
        </div>

        <div className="-mx-3 space-y-3 sm:mx-0 sm:space-y-4">
          {posts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </div>

      {/* Mobile floating "+" button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Создать публикацию"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 lg:hidden"
      >
        <Plus className="h-6 w-6" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-card"
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-display text-base font-semibold">Новая публикация</h3>
              <button onClick={() => setMobileOpen(false)} className="rounded-md p-1 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <CreatePostForm onCreate={addPost} compact />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
