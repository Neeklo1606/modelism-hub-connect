import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdBanner } from "@/components/AdBanner";
import { CreatePostForm } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { posts as mockPosts, me } from "@/lib/mock";
import type { Post } from "@/lib/mock";
import hero from "@/assets/hero-modelizm.jpg";

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

  const addPost = (text: string, cat: string) => {
    setPosts([
      { id: `np${Date.now()}`, authorId: me.id, date: "только что", category: cat, title: text.slice(0, 60), text, likes: 0, comments: 0, status: "moderation" },
      ...posts,
    ]);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <section className="relative overflow-hidden rounded-2xl border">
          <img src={hero} alt="МоДелизМ Club" width={1920} height={640} className="h-44 w-full object-cover sm:h-64" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
            <h1 className="font-display text-2xl font-bold text-white sm:text-4xl">МоДелизМ Club</h1>
            <p className="mt-1 max-w-xl text-sm text-white/85 sm:text-base">Моделизм — это жизнь, остальное детали</p>
          </div>
        </section>

        <AdBanner />
        <CreatePostForm onCreate={addPost} />

        <div className="space-y-4">
          {posts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
    </AppLayout>
  );
}
