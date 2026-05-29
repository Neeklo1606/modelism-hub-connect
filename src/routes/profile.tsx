import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { me, posts, ads } from "@/lib/mock";
import { PostCard } from "@/components/PostCard";
import { AdCard } from "@/components/AdCard";
import { MapPin, Pencil, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Профиль — МоДелизМ Club" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [tab, setTab] = useState<"posts" | "ads">("posts");
  const [edit, setEdit] = useState(false);
  const myPosts = posts.filter((p) => p.authorId === me.id);
  const myAds = ads.filter((a) => a.authorId === me.id);

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        <section className="rounded-2xl border bg-card p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img src={me.avatar} alt="" className="h-20 w-20 rounded-full sm:h-24 sm:w-24" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold sm:text-2xl">{me.name}</h1>
                {me.subscription && <BadgeCheck className="h-5 w-5 text-primary" />}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{me.city}</div>
              <p className="mt-1 text-sm">{me.interests}</p>
              {me.subscription && <p className="mt-1 text-xs text-primary">Подписка: {me.subscription} · активна</p>}
            </div>
            <button onClick={() => setEdit(true)} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs hover:bg-muted">
              <Pencil className="h-3.5 w-3.5" />Редактировать
            </button>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t pt-4">
            <Stat label="Публикаций" value={myPosts.length} />
            <Stat label="Объявлений" value={myAds.length} />
            <Stat label="Друзей" value={48} />
          </div>
        </section>

        <div className="grid grid-cols-2 rounded-lg bg-muted p-1">
          <button onClick={() => setTab("posts")} className={`rounded-md py-1.5 text-sm font-medium ${tab === "posts" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Мои публикации</button>
          <button onClick={() => setTab("ads")} className={`rounded-md py-1.5 text-sm font-medium ${tab === "ads" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Мои объявления</button>
        </div>

        {tab === "posts" ? (
          <div className="space-y-4">{myPosts.map((p) => <PostCard key={p.id} post={p} />)}</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{myAds.map((a) => <AdCard key={a.id} ad={a} />)}</div>
        )}
      </div>

      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3" onClick={() => setEdit(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-card p-5 shadow-xl">
            <h3 className="font-display text-base font-semibold">Редактирование профиля</h3>
            <div className="mt-4 space-y-3">
              <input defaultValue={me.name} placeholder="ФИО" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
              <input defaultValue={me.city} placeholder="Город" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
              <input defaultValue={me.interests} placeholder="Интересы" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setEdit(false)} className="flex-1 rounded-lg border px-3 py-2 text-sm">Отмена</button>
              <button onClick={() => { setEdit(false); toast.success("Профиль сохранён"); }} className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="font-display text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
