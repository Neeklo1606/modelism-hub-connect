import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car, Plane, Ship, Send as SendIcon, Code2, Wrench, Cpu, BatteryCharging, Users,
  FileText, MessageSquare, Share2, Send,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  communities, communityById, posts, users, userById, me, chatMessages, formatRelativeTime,
} from "@/lib/mock";
import type { Message } from "@/lib/mock";
import { PostCard } from "@/components/PostCard";
import { toast } from "sonner";

export const Route = createFileRoute("/communities/$id")({
  head: ({ params }) => ({ meta: [{ title: `${communityById(params.id)?.name ?? "Сообщество"} — МоДелизМ Club` }] }),
  component: CommunityDetailPage,
});

const ICON_MAP: Record<string, typeof Car> = {
  Car, Plane, Ship, Send: SendIcon, Code2, Wrench, Cpu, BatteryCharging,
};

type Tab = "posts" | "chat" | "members";
const TABS: { key: Tab; label: string; Icon: typeof FileText }[] = [
  { key: "posts", label: "Публикации", Icon: FileText },
  { key: "chat", label: "Чат", Icon: MessageSquare },
  { key: "members", label: "Участники", Icon: Users },
];

function CommunityDetailPage() {
  const { id } = Route.useParams();
  const community = communities.find((c) => c.id === id);
  const [joined, setJoined] = useState(!!community?.joined);
  const [tab, setTab] = useState<Tab>("posts");
  const [msgs, setMsgs] = useState<Message[]>(chatMessages);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });

  useEffect(() => {
    const el = refs.current[tab];
    if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [tab]);

  useEffect(() => {
    if (scrollRef.current && tab === "chat") scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs.length, tab]);

  const communityPosts = useMemo(() => {
    if (!community) return [];
    return posts.filter((p) => community.postIds?.includes(p.id));
  }, [community]);

  const members = useMemo(() => {
    if (!community) return [];
    return users.slice(0, 8);
  }, [community]);

  if (!community) {
    return (
      <AppLayout rightColumn={false}>
        <div className="flex flex-col items-center justify-center py-[120px] text-center">
          <div className="font-display text-[24px] font-bold" style={{ color: "var(--foreground)" }}>Сообщество не найдено</div>
          <Link to="/communities" className="mt-[16px] inline-flex font-semibold" style={{ height: 40, padding: "0 20px", borderRadius: 10, background: "var(--accent)", color: "white", fontSize: 14, alignItems: "center" }}>
            Все сообщества
          </Link>
        </div>
      </AppLayout>
    );
  }

  const Icon = ICON_MAP[community.avatarIcon ?? "Users"] ?? Users;
  const admin = community.adminId ? userById(community.adminId) : null;

  const sendMessage = () => {
    if (!text.trim()) return;
    setMsgs((p) => [
      ...p,
      { id: `cm${Date.now()}`, authorId: me.id, time: new Date().toISOString(), text: text.trim(), status: "sent" },
    ]);
    setText("");
  };

  return (
    <AppLayout rightColumn={false}>
      <div className="overflow-hidden" style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "var(--r-card)" }}>
        {/* Cover */}
        <div className="relative">
          {community.coverImage ? (
            <img src={community.coverImage} alt="" className="w-full object-cover" style={{ height: "min(200px, 28vw)" }} />
          ) : (
            <div className="w-full" style={{ height: 200, background: "linear-gradient(135deg, var(--accent), var(--accent-muted))" }} />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))" }} />
          <div className="absolute left-[24px] bottom-[20px] right-[24px] md:left-[32px] md:bottom-[24px]">
            <div className="flex flex-wrap items-end gap-[12px]">
              <h1 className="font-display text-[24px] font-extrabold text-white md:text-[28px]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                {community.name}
              </h1>
              <span
                className="inline-flex items-center text-white"
                style={{
                  background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                  padding: "4px 12px", borderRadius: 999, fontSize: 12,
                }}
              >
                {community.category}
              </span>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-[16px] px-[24px] py-[24px] md:flex-row md:items-start md:px-[32px]">
          <div className="min-w-0 flex-1">
            {admin && (
              <Link to="/user/$id" params={{ id: admin.id }} className="inline-flex items-center gap-[8px] text-[14px]" style={{ color: "var(--foreground-70)" }}>
                <img src={admin.avatar} alt="" className="h-[32px] w-[32px] rounded-full object-cover" />
                <span>Администратор: <span className="font-semibold" style={{ color: "var(--foreground)" }}>{admin.name}</span></span>
              </Link>
            )}
            <p className="mt-[8px] max-w-[700px] text-[15px] leading-[1.6]" style={{ color: "var(--foreground-70)" }}>
              {community.description}
            </p>
          </div>
          <div className="flex shrink-0 gap-[8px]">
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => {
                setJoined((s) => !s);
                toast.success(joined ? "Вы покинули сообщество" : `Вы вступили в «${community.name}»`);
              }}
              className="font-semibold transition-colors duration-150"
              style={{
                height: 44, padding: "0 24px", borderRadius: 12, fontSize: 14,
                background: joined ? "transparent" : "var(--accent)",
                color: joined ? "var(--foreground-70)" : "white",
                border: joined ? "1px solid var(--border)" : "none",
              }}
            >
              {joined ? "Покинуть" : "Вступить"}
            </motion.button>
            <button
              onClick={() => {
                if (typeof navigator !== "undefined") navigator.clipboard?.writeText(window.location.href);
                toast.success("Ссылка скопирована");
              }}
              className="inline-flex items-center gap-[6px] font-medium transition-colors duration-150"
              style={{
                height: 44, padding: "0 18px", borderRadius: 12, fontSize: 14,
                border: "1px solid var(--border)", background: "transparent", color: "var(--foreground-70)",
              }}
            >
              <Share2 size={14} /> Поделиться
            </button>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="px-[24px] py-[20px] text-center" style={{ borderRight: "1px solid var(--border)" }}>
            <div className="font-display text-[20px] font-bold" style={{ color: "var(--foreground)" }}>{community.members.toLocaleString("ru")}</div>
            <div className="mt-[4px] text-[12px]" style={{ color: "var(--foreground-50)" }}>участников</div>
          </div>
          <div className="px-[24px] py-[20px] text-center">
            <div className="font-display text-[20px] font-bold" style={{ color: "var(--foreground)" }}>{communityPosts.length}</div>
            <div className="mt-[4px] text-[12px]" style={{ color: "var(--foreground-50)" }}>публикаций</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-10 overflow-x-auto" style={{ background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
          <div className="relative flex">
            {TABS.map(({ key, label, Icon: TI }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  ref={(el) => { refs.current[key] = el; }}
                  onClick={() => setTab(key)}
                  className="inline-flex shrink-0 items-center gap-[8px] font-display transition-colors duration-200"
                  style={{
                    height: 48, padding: "0 20px", fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? "var(--accent)" : "var(--foreground-50)",
                  }}
                >
                  <TI size={16} /> {label}
                </button>
              );
            })}
            <motion.div
              className="absolute bottom-0 h-[3px]"
              style={{ background: "var(--accent)", borderRadius: "3px 3px 0 0" }}
              animate={{ x: indicator.x, width: indicator.w }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="px-[16px] py-[24px] md:px-[32px]"
          >
            {tab === "posts" && (
              communityPosts.length === 0 ? (
                <div className="py-[60px] text-center text-[14px]" style={{ color: "var(--foreground-50)" }}>В сообществе ещё нет публикаций</div>
              ) : (
                <div className="space-y-[16px]">{communityPosts.map((p) => <PostCard key={p.id} post={p} />)}</div>
              )
            )}

            {tab === "chat" && (
              <div className="flex flex-col" style={{ height: "calc(100vh - 480px)", minHeight: 400, border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", background: "var(--background)" }}>
                <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-[20px]">
                  {msgs.map((m) => {
                    const isMe = m.authorId === me.id;
                    const author = userById(m.authorId);
                    return (
                      <div key={m.id} className={`mb-[12px] flex items-end gap-[8px] ${isMe ? "justify-end" : "justify-start"}`}>
                        {!isMe && <img src={author.avatar} alt="" className="h-[28px] w-[28px] rounded-full object-cover" />}
                        <div className="max-w-[70%] px-[14px] py-[10px]" style={{
                          background: isMe ? "var(--accent)" : "var(--background-surface)",
                          color: isMe ? "white" : "var(--foreground)",
                          borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        }}>
                          {!isMe && <div className="mb-[2px] text-[11px] font-semibold" style={{ color: "var(--accent)" }}>{author.name}</div>}
                          <div className="text-[14px] leading-[1.4]">{m.text}</div>
                          <div className="mt-[4px] text-right font-mono text-[10px]" style={{ color: isMe ? "rgba(255,255,255,0.6)" : "var(--foreground-30)" }}>
                            {formatRelativeTime(m.time)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-end gap-[8px] p-[12px]" style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), sendMessage())}
                    placeholder="Сообщение..."
                    className="flex-1 text-[14px] outline-none"
                    style={{ height: 40, background: "var(--background-surface)", borderRadius: 20, padding: "0 16px", color: "var(--foreground)" }}
                  />
                  <motion.button whileTap={{ scale: 0.95 }} onClick={sendMessage} disabled={!text.trim()}
                    className="grid h-[40px] w-[40px] place-items-center rounded-full"
                    style={{ background: "var(--accent)", color: "white", opacity: text.trim() ? 1 : 0.4 }}>
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            )}

            {tab === "members" && (
              <div className="grid gap-[20px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))" }}>
                {members.map((u) => (
                  <Link key={u.id} to="/user/$id" params={{ id: u.id }} className="flex flex-col items-center gap-[8px] text-center">
                    <div className="relative">
                      <img src={u.avatar} alt="" className="h-[64px] w-[64px] rounded-full object-cover" />
                      {u.online && <span className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full" style={{ background: "var(--success)", border: "2px solid var(--background)" }} />}
                    </div>
                    <div className="line-clamp-1 text-[12px] font-medium" style={{ color: "var(--foreground)" }}>{u.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
