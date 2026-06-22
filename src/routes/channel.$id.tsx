import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Users, Check, BadgeCheck, Heart, Eye, Clock, ShieldCheck, AlertTriangle, Radio, Newspaper, Star, Megaphone, Tag, Send } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  getChannel, useChannelPosts, useSubscriptions, toggleSubscribe, createChannelPost,
  formatCount, formatDate, kindLabel,
  POST_KIND_LABEL,
  type ChannelPost, type PostStatus, type PostKind,
} from "@/lib/channels";
import { toast } from "sonner";


export const Route = createFileRoute("/channel/$id")({
  loader: ({ params }) => {
    const channel = getChannel(params.id);
    if (!channel) throw notFound();
    return { channel };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.channel.name} — канал · МоДелизМ Club` },
          { name: "description", content: loaderData.channel.description },
        ]
      : [{ title: "Канал" }],
  }),
  notFoundComponent: () => (
    <AppLayout rightColumn={false}>
      <div className="grid place-items-center gap-3 py-20 text-center">
        <Radio size={28} style={{ color: "var(--foreground-50)" }} />
        <div className="text-[16px] font-semibold">Канал не найден</div>
        <Link to="/channels" className="text-[13px] font-semibold" style={{ color: "var(--accent)" }}>
          Все каналы
        </Link>
      </div>
    </AppLayout>
  ),
  component: ChannelPage,
});

type PostFilter = "all" | "mine";

function ChannelPage() {
  const { channel } = Route.useLoaderData();
  const subs = useSubscriptions();
  const subscribed = subs.has(channel.id);
  const posts = useChannelPosts(channel.id);

  const visiblePublic = posts.filter((p: ChannelPost) => p.status === "published");
  const [showOwnerView, setShowOwnerView] = useState<boolean>(!!channel.isOwner);
  const list = channel.isOwner && showOwnerView ? posts : visiblePublic;


  const onToggle = () => {
    toggleSubscribe(channel.id);
    toast.success(subscribed ? `Отписка от «${channel.name}»` : `Подписка на «${channel.name}»`);
  };

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        {/* back */}
        <Link
          to="/channels"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: "var(--foreground-70)" }}
        >
          <ArrowLeft size={14} /> Все каналы
        </Link>

        {/* header card */}
        <section
          className="overflow-hidden"
          style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 16 }}
        >
          <div className="h-28 sm:h-36" style={{ background: channel.bannerColor }} />
          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
            <div className="-mt-8 sm:-mt-10 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-3">
              <div
                className="grid h-16 w-16 sm:h-20 sm:w-20 shrink-0 place-items-center font-display text-[24px] sm:text-[28px] font-bold text-white"
                style={{ background: channel.avatarColor, borderRadius: 16, border: "3px solid var(--background)" }}
              >
                {channel.name.slice(0, 1)}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <h1 className="font-display text-[20px] sm:text-[24px] font-bold" style={{ color: "var(--foreground)" }}>
                  {channel.name}
                </h1>
                {channel.kind === "official" && <BadgeCheck size={18} style={{ color: "var(--accent)" }} />}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span
                  className="text-[11px] font-medium"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)", padding: "3px 8px", borderRadius: 6 }}
                >
                  {kindLabel(channel.kind)}
                </span>
                <span className="text-[12px]" style={{ color: "var(--foreground-50)" }}>
                  {channel.category}
                </span>
              </div>
              <p className="mt-3 text-[14px]" style={{ color: "var(--foreground-70)" }}>
                {channel.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px]" style={{ color: "var(--foreground-50)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={13} /> <b style={{ color: "var(--foreground)" }}>{formatCount(channel.subscribers)}</b> подписчиков
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} /> Премодерация постов
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                {!channel.isOwner && (
                  <button
                    onClick={onToggle}
                    className="inline-flex h-11 items-center justify-center gap-2 px-5 text-[14px] font-semibold transition-colors"
                    style={{
                      borderRadius: 12,
                      background: subscribed ? "transparent" : "var(--accent)",
                      color: subscribed ? "var(--foreground)" : "white",
                      border: subscribed ? "1px solid var(--border-strong)" : "none",
                      flex: 1,
                    }}
                  >
                    {subscribed ? (<><Check size={16} /> Вы подписаны</>) : "Подписаться"}
                  </button>
                )}
                {channel.isOwner && (
                  <div
                    className="inline-flex h-11 items-center justify-center gap-2 px-5 text-[13px] font-semibold"
                    style={{ borderRadius: 12, background: "var(--accent-soft)", color: "var(--accent)", flex: 1 }}
                  >
                    Вы — владелец канала
                  </div>
                )}
              </div>

              {/* explanation strip */}
              <div
                className="mt-3 flex items-start gap-2 p-3 text-[12px]"
                style={{ background: "var(--background-surface)", borderRadius: 10, color: "var(--foreground-70)" }}
              >
                <Radio size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                <span>
                  Это публичный канал: посты публикует только владелец. Подписчики читают и не могут писать в ленту канала.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* owner toggle */}
        {channel.isOwner && (
          <div
            className="flex items-center justify-between gap-3 p-3"
            style={{ background: "var(--background-surface)", borderRadius: 12 }}
          >
            <div className="min-w-0">
              <div className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>
                Вид владельца
              </div>
              <div className="text-[12px]" style={{ color: "var(--foreground-50)" }}>
                Видны посты на модерации и отклонённые
              </div>
            </div>
            <Segmented
              value={showOwnerView ? "mine" : "all"}
              onChange={(v) => setShowOwnerView(v === "mine")}
            />
          </div>
        )}

        {/* composer (owner only) */}
        {channel.isOwner && <Composer channelId={channel.id} ownerName={channel.ownerName} />}

        {/* posts */}
        <h2 className="font-display text-[16px] font-semibold" style={{ color: "var(--foreground)" }}>
          Посты канала
        </h2>

        {list.length === 0 ? (
          <div className="grid place-items-center gap-2 py-12 text-center" style={{ border: "1px dashed var(--border-strong)", borderRadius: 14 }}>
            <div className="text-[14px]" style={{ color: "var(--foreground-50)" }}>В этом канале пока нет постов</div>
          </div>
        ) : (
          <ul className="space-y-3">
            {list.map((p: ChannelPost) => (
              <PostItem key={p.id} post={p} isOwner={!!channel.isOwner} />
            ))}
          </ul>
        )}

      </div>
    </AppLayout>
  );
}

function Segmented({ value, onChange }: { value: PostFilter; onChange: (v: PostFilter) => void }) {
  const opts: [PostFilter, string][] = [["all", "Только опубл."], ["mine", "Все"]];
  return (
    <div className="flex shrink-0" style={{ background: "var(--background)", borderRadius: 9, padding: 3 }}>
      {opts.map(([k, l]) => {
        const active = value === k;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            className="text-[12px]"
            style={{
              padding: "6px 10px",
              borderRadius: 7,
              background: active ? "var(--accent-soft)" : "transparent",
              color: active ? "var(--accent)" : "var(--foreground-50)",
              fontWeight: active ? 600 : 500,
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

const STATUS: Record<PostStatus, { label: string; bg: string; color: string; Icon: typeof Clock }> = {
  published: { label: "Опубликовано", bg: "rgba(16,185,129,0.12)", color: "rgb(16,185,129)", Icon: ShieldCheck },
  moderation: { label: "На проверке", bg: "rgba(245,158,11,0.14)", color: "rgb(217,119,6)", Icon: Clock },
  rejected: { label: "Отклонено", bg: "rgba(239,68,68,0.12)", color: "rgb(239,68,68)", Icon: AlertTriangle },
};

function PostItem({ post, isOwner }: { post: ChannelPost; isOwner: boolean }) {
  const s = STATUS[post.status];
  return (
    <li
      className="p-4"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        opacity: post.status === "rejected" ? 0.7 : 1,
      }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold truncate" style={{ color: "var(--foreground)" }}>
            {post.authorName}
          </div>
          <div className="text-[11px]" style={{ color: "var(--foreground-50)" }}>
            {formatDate(post.createdAt)}
          </div>
        </div>
        {(isOwner || post.status !== "published") && (
          <span
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold"
            style={{ background: s.bg, color: s.color, padding: "4px 8px", borderRadius: 6 }}
          >
            <s.Icon size={11} /> {s.label}
          </span>
        )}
      </div>
      <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed" style={{ color: "var(--foreground)" }}>
        {post.text}
      </p>
      {post.status === "published" && (
        <div className="mt-3 flex items-center gap-4 text-[12px]" style={{ color: "var(--foreground-50)" }}>
          <span className="inline-flex items-center gap-1"><Heart size={13} /> {post.likes}</span>
          <span className="inline-flex items-center gap-1"><Eye size={13} /> {post.views}</span>
        </div>
      )}
    </li>
  );
}
