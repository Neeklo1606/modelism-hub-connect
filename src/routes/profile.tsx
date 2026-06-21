import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell, BadgeCheck, FileText, MapPin, MessageSquare, Pencil, Tag, User as UserIcon,
  UserPlus, Users, X, Plus, Car, Plane, Ship, Send as SendIcon, Code2, Wrench, Cpu, BatteryCharging,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { me, posts, ads, communities, userById } from "@/lib/mock";
import type { User } from "@/lib/mock";
import { useStore, actions, selectors } from "@/lib/store";
import { PostCard } from "@/components/PostCard";
import { AdCard } from "@/components/AdCard";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Профиль — МоДелизМ Club" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const currentUser = useStore(selectors.currentUser);
  return <ProfileView user={currentUser} isOwn />;
}

type TabKey = "posts" | "ads" | "communities" | "about";

const TABS: { key: TabKey; label: string; Icon: typeof FileText }[] = [
  { key: "posts", label: "Публикации", Icon: FileText },
  { key: "ads", label: "Объявления", Icon: Tag },
  { key: "communities", label: "Сообщества", Icon: Users },
  { key: "about", label: "О себе", Icon: UserIcon },
];

const ICON_MAP: Record<string, typeof Car> = {
  Car, Plane, Ship, Send: SendIcon, Code2, Wrench, Cpu, BatteryCharging,
};

export function ProfileView({ user, isOwn }: { user: User; isOwn: boolean }) {
  const [tab, setTab] = useState<TabKey>("posts");
  const [editOpen, setEditOpen] = useState(false);
  const friendIds = useStore(selectors.friendsOf(me.id));
  const [isFriend, setIsFriend] = useState(!isOwn && friendIds.includes(user.id));
  const [subscribed, setSubscribed] = useState(false);
  const [draft, setDraft] = useState<User>(user);

  const userPosts = useMemo(() => posts.filter((p) => p.authorId === user.id), [user.id]);
  const userAds = useMemo(() => ads.filter((a) => a.authorId === user.id), [user.id]);
  const userCommunities = useStore(selectors.userCommunities(user.id));
  const friendsCountDerived = isOwn ? friendIds.length : (user.friendIds?.length ?? 0);
  const interestList = (user.interests || "").split(",").map((s) => s.trim()).filter(Boolean);


  return (
    <AppLayout rightColumn={false}>
      <div className="overflow-hidden" style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "var(--r-card)" }}>
        {/* Cover */}
        <div className="relative">
          {user.coverImage ? (
            <img src={user.coverImage} alt="" className="w-full object-cover" style={{ height: "clamp(140px, 26vw, 220px)" }} />
          ) : (
            <div className="w-full" style={{ height: "clamp(140px, 26vw, 220px)", background: "linear-gradient(135deg, var(--accent), var(--accent-muted))" }} />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px]" style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }} />
        </div>

        {/* Identity */}
        <div className="flex flex-col gap-[14px] px-[16px] pb-[16px] md:flex-row md:items-end md:gap-[24px] md:px-[32px]">
          <img
            src={user.avatar}
            alt=""
            className="h-[80px] w-[80px] shrink-0 rounded-full object-cover md:h-[96px] md:w-[96px]"
            style={{ marginTop: -40, border: "4px solid var(--background)", boxShadow: "var(--shadow-card)" }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-[8px]">
              <h1 className="truncate font-display text-[20px] font-bold md:text-[24px]" style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}>{user.name}</h1>
              {user.subscription && (
                <span
                  className="inline-flex items-center gap-[4px] font-semibold"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)", fontSize: 11, padding: "2px 8px", borderRadius: 999 }}
                >
                  <BadgeCheck size={11} /> Pro
                </span>
              )}
            </div>
            <div className="mt-[2px] flex items-center gap-[6px] text-[13px]" style={{ color: "var(--foreground-50)" }}>
              <MapPin size={12} /> {user.city}
            </div>
            {user.status && <div className="mt-[2px] text-[13px] italic" style={{ color: "var(--foreground-50)" }}>{user.status}</div>}
          </div>

          <div className="flex w-full gap-[8px] md:w-auto">
            {isOwn ? (
              <button
                onClick={() => setEditOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-[8px] font-medium transition-colors duration-150 md:flex-none"
                style={{ height: 40, padding: "0 18px", borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--foreground-70)", fontSize: 14 }}
              >
                <Pencil size={14} /> Редактировать
              </button>
            ) : (
              <>
                {isFriend ? (
                  <span
                    className="inline-flex flex-1 items-center justify-center gap-[6px] font-medium md:flex-none"
                    style={{ height: 40, padding: "0 16px", borderRadius: 10, background: "var(--background-surface)", color: "var(--foreground-70)", fontSize: 14 }}
                  >
                    <BadgeCheck size={14} style={{ color: "var(--success)" }} /> В друзьях
                  </span>
                ) : (
                  <button
                    onClick={() => { setIsFriend(true); toast.success("Заявка отправлена"); }}
                    className="inline-flex flex-1 items-center justify-center gap-[6px] font-semibold transition-colors duration-150 md:flex-none"
                    style={{ height: 40, padding: "0 18px", borderRadius: 10, background: "var(--accent)", color: "white", fontSize: 14 }}
                  >
                    <UserPlus size={14} /> В друзья
                  </button>
                )}
                <Link
                  to="/messenger"
                  className="inline-flex flex-1 items-center justify-center gap-[6px] font-medium transition-colors duration-150 md:flex-none"
                  style={{ height: 40, padding: "0 16px", borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--foreground-70)", fontSize: 14 }}
                >
                  <MessageSquare size={14} /> Написать
                </Link>
                <button
                  onClick={() => { setSubscribed((s) => !s); toast.success(subscribed ? "Вы отписались" : "Вы подписались"); }}
                  className="grid h-[40px] w-[40px] shrink-0 place-items-center transition-colors duration-150"
                  style={{ borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: subscribed ? "var(--accent)" : "var(--foreground-70)" }}
                  aria-label="Подписаться"
                >
                  <Bell size={14} />
                </button>
              </>
            )}
          </div>
        </div>


        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <Counter label="Публикаций" value={userPosts.length} divider />
          <Counter label="Объявлений" value={userAds.length} divider />
          <Counter label="Друзей" value={friendsCountDerived} divider />
          <Counter label="Сообществ" value={userCommunities.length} />
        </div>

        {/* Tabs */}
        <Tabs tab={tab} setTab={setTab} />

        {/* Tab content */}
        <div className="px-[16px] py-[24px] md:px-[32px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "posts" && (
                userPosts.length === 0 ? <EmptyTab text="Нет публикаций" /> : (
                  <div className="space-y-[16px]">{userPosts.map((p) => <PostCard key={p.id} post={p} />)}</div>
                )
              )}
              {tab === "ads" && (
                userAds.length === 0 ? (
                  <EmptyTab text="Нет объявлений">
                    <Link to="/ads/new" className="mt-[16px] inline-flex items-center gap-[6px] font-semibold" style={{ height: 40, padding: "0 20px", borderRadius: 10, background: "var(--accent)", color: "white", fontSize: 14 }}>
                      <Plus size={14} /> Создать объявление
                    </Link>
                  </EmptyTab>
                ) : (
                  <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">{userAds.map((a) => <AdCard key={a.id} ad={a} />)}</div>
                )
              )}
              {tab === "communities" && (
                userCommunities.length === 0 ? <EmptyTab text="Не состоит в сообществах" /> : (
                  <div className="grid gap-[12px] md:grid-cols-2">
                    {userCommunities.map((c) => {
                      const Icon = ICON_MAP[c.avatarIcon ?? "Users"] ?? Users;
                      return (
                        <Link
                          key={c.id}
                          to="/communities/$id"
                          params={{ id: c.id }}
                          className="flex items-center gap-[12px] p-[14px] transition-colors duration-150"
                          style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--background)" }}
                        >
                          <div className="grid h-[48px] w-[48px] place-items-center" style={{ background: "var(--accent-soft)", borderRadius: 10 }}>
                            <Icon size={24} style={{ color: "var(--accent)" }} />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-display text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>{c.name}</div>
                            <div className="text-[12px]" style={{ color: "var(--foreground-50)" }}>{c.members.toLocaleString("ru")} участников</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )
              )}
              {tab === "about" && (
                <div className="max-w-[600px]">
                  {user.bio ? (
                    <p className="text-[15px] leading-[1.6]" style={{ color: "var(--foreground-70)" }}>{user.bio}</p>
                  ) : (
                    <p className="text-[14px]" style={{ color: "var(--foreground-50)" }}>Пользователь ещё не заполнил раздел «О себе»</p>
                  )}
                  {interestList.length > 0 && (
                    <div className="mt-[20px] flex flex-wrap gap-[8px]">
                      {interestList.map((p) => (
                        <span
                          key={p}
                          className="font-medium"
                          style={{ background: "var(--accent-soft)", color: "var(--accent)", fontSize: 13, padding: "6px 14px", borderRadius: 999 }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {editOpen && (
          <EditSheet
            draft={draft}
            setDraft={setDraft}
            onClose={() => setEditOpen(false)}
            onSave={() => {
              if (isOwn) actions.updateProfile(user.id, draft);
              setEditOpen(false);
              toast.success("Профиль обновлён");
            }}

          />
        )}
      </AnimatePresence>
    </AppLayout>
  );
}

function Counter({ label, value, divider }: { label: string; value: number; divider?: boolean }) {
  return (
    <div className="px-[16px] py-[20px] text-center md:px-[24px]" style={{ borderRight: divider ? "1px solid var(--border)" : undefined }}>
      <div className="font-display text-[20px] font-bold" style={{ color: "var(--foreground)" }}>{value}</div>
      <div className="mt-[4px] text-[12px]" style={{ color: "var(--foreground-50)" }}>{label}</div>
    </div>
  );
}

function Tabs({ tab, setTab }: { tab: TabKey; setTab: (k: TabKey) => void }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });

  useEffect(() => {
    const el = refs.current[tab];
    if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [tab]);

  return (
    <div
      className="sticky top-0 z-10 overflow-x-auto"
      style={{ background: "var(--background)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="relative flex">
        {TABS.map(({ key, label, Icon }) => {
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
              <Icon size={16} /> {label}
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
  );
}

function EmptyTab({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-[60px] text-center">
      <div className="text-[14px]" style={{ color: "var(--foreground-50)" }}>{text}</div>
      {children}
    </div>
  );
}

function EditSheet({ draft, setDraft, onClose, onSave }: {
  draft: User; setDraft: (u: User) => void; onClose: () => void; onSave: () => void;
}) {
  const [newInterest, setNewInterest] = useState("");
  const interestList = (draft.interests || "").split(",").map((s) => s.trim()).filter(Boolean);

  const addInterest = () => {
    if (!newInterest.trim()) return;
    setDraft({ ...draft, interests: [...interestList, newInterest.trim()].join(", ") });
    setNewInterest("");
  };
  const removeInterest = (i: string) => {
    setDraft({ ...draft, interests: interestList.filter((x) => x !== i).join(", ") });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
        className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto"
        style={{ background: "var(--background)", borderRadius: "20px 20px 0 0", maxHeight: "85vh", padding: 24 }}
      >
        <div className="mx-auto h-[4px] w-[36px] rounded-[2px]" style={{ background: "var(--foreground-30)", marginBottom: 20 }} />
        <h3 className="font-display text-[18px] font-bold" style={{ color: "var(--foreground)" }}>Редактирование профиля</h3>

        <div className="mt-[20px] space-y-[20px]">
          <Field label="Имя">
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} style={inputStyle} className="w-full outline-none" />
          </Field>
          <Field label="Город">
            <input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} placeholder="Город" style={inputStyle} className="w-full outline-none" />
          </Field>
          <Field label="О себе">
            <textarea
              value={draft.bio ?? ""}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              placeholder="Расскажите о себе"
              rows={4}
              style={{ ...inputStyle, height: "auto", minHeight: 100, padding: 14, resize: "vertical" }}
              className="w-full outline-none"
            />
          </Field>
          <Field label="Интересы">
            <div className="flex flex-wrap gap-[8px]">
              {interestList.map((i) => (
                <span key={i} className="inline-flex items-center gap-[6px]" style={{ background: "var(--accent-soft)", color: "var(--accent)", fontSize: 13, padding: "6px 12px", borderRadius: 999 }}>
                  {i}
                  <button onClick={() => removeInterest(i)} aria-label="Убрать"><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="mt-[10px] flex gap-[8px]">
              <input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                placeholder="Добавить интерес"
                style={inputStyle}
                className="flex-1 outline-none"
              />
              <button onClick={addInterest} className="grid place-items-center font-bold" style={{ width: 48, height: 48, background: "var(--accent)", color: "white", borderRadius: 10 }}>
                <Plus size={18} />
              </button>
            </div>
          </Field>
        </div>

        <div className="mt-[24px] flex gap-[12px]">
          <button
            onClick={onClose}
            className="flex-1 font-medium transition-colors duration-150"
            style={{ height: 48, border: "1px solid var(--border)", borderRadius: 12, background: "transparent", color: "var(--foreground-70)" }}
          >
            Отмена
          </button>
          <button
            onClick={onSave}
            className="flex-1 font-semibold transition-colors duration-150"
            style={{ height: 48, background: "var(--accent)", color: "white", borderRadius: 12 }}
          >
            Сохранить
          </button>
        </div>
      </motion.div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  height: 48, border: "1px solid var(--border)", borderRadius: 10,
  padding: "0 14px", fontSize: 16, background: "var(--background-surface)", color: "var(--foreground)",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-[8px] block font-mono text-[12px] uppercase tracking-[0.05em]" style={{ color: "var(--foreground-50)" }}>{label}</label>
      {children}
    </div>
  );
}
