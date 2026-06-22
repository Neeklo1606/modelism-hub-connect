import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Paperclip, Send, Smile } from "lucide-react";
import * as Icons from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { categoryById, chatMessages, userById, me } from "@/lib/mock";
import type { Message } from "@/lib/mock";

export const Route = createFileRoute("/categories/$id")({
  head: ({ params }) => {
    const c = categoryById(params.id);
    const title = c ? `${c.name} — чат сообщества` : "Категория";
    return { meta: [{ title: `${title} — МоДелизМ Форум` }] };
  },
  component: CategoryChatPage,
});

function onlineFor(id: string, members: number): number {
  const seed = id.split("").reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return Math.max(3, Math.round(members * 0.012)) + (seed % 17);
}

function CategoryChatPage() {
  const { id } = Route.useParams();
  const c = categoryById(id);

  const [messages, setMessages] = useState<Message[]>(() =>
    chatMessages.map((m) => ({ ...m })),
  );
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const online = useMemo(() => (c ? onlineFor(c.id, c.members) : 0), [c]);

  if (!c) {
    return (
      <AppLayout rightColumn={false}>
        <p>Категория не найдена</p>
      </AppLayout>
    );
  }

  const Icon =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ??
    Icons.Hash;

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        authorId: me.id,
        time: new Date().toISOString(),
        text: value,
        status: "sent",
      },
    ]);
    setText("");
  };

  return (
    <AppLayout rightColumn={false}>
      <div
        className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-[14px] border lg:h-[calc(100vh-64px)]"
        style={{ background: "var(--background-elevated)", borderColor: "var(--border)" }}
      >
        {/* Header */}
        <header
          className="flex items-center gap-[12px] border-b px-[16px] py-[12px]"
          style={{ borderColor: "var(--border)" }}
        >
          <Link
            to="/feed"
            className="grid h-[32px] w-[32px] place-items-center rounded-[8px] transition-colors hover:bg-[var(--background-surface)] lg:hidden"
            aria-label="Назад"
          >
            <ArrowLeft className="h-[16px] w-[16px]" style={{ color: "var(--foreground-70)" }} />
          </Link>
          <span
            className="grid h-[40px] w-[40px] place-items-center rounded-[10px]"
            style={{ background: "var(--background-surface)", color: "var(--accent)" }}
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-semibold" style={{ color: "var(--foreground)" }}>
              {c.name}
            </h1>
            <p className="flex items-center gap-[6px] text-[12px]" style={{ color: "var(--foreground-50)" }}>
              <span className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: "#22c55e" }} />
              {online} онлайн · {c.members.toLocaleString("ru")} участников
            </p>
          </div>
          <button
            className="hidden rounded-[8px] border px-[12px] py-[6px] text-[12px] font-medium transition-colors hover:bg-[var(--background-surface)] sm:block"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            Вступить
          </button>
        </header>

        {/* Subcategory pills */}
        {c.subcategories.length > 0 && (
          <div
            className="flex gap-[6px] overflow-x-auto border-b px-[16px] py-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {c.subcategories.map((s) => (
              <Link
                key={s.id}
                to="/categories/$id/$subId"
                params={{ id: c.id, subId: s.id }}
                className="shrink-0 rounded-[999px] border px-[10px] py-[4px] text-[12px] transition-colors hover:bg-[var(--background-surface)]"
                style={{ borderColor: "var(--border)", color: "var(--foreground-70)" }}
              >
                {s.name}
              </Link>
            ))}
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-[10px] overflow-y-auto px-[16px] py-[14px]">
          {messages.map((m) => {
            const u = userById(m.authorId);
            const mine = m.authorId === me.id;
            return (
              <div key={m.id} className={`flex gap-[10px] ${mine ? "flex-row-reverse" : ""}`}>
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="h-[32px] w-[32px] shrink-0 rounded-full"
                />
                <div className={`max-w-[78%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                  <div className="mb-[2px] flex items-center gap-[6px] text-[11px]" style={{ color: "var(--foreground-50)" }}>
                    <span className="font-medium" style={{ color: "var(--foreground-70)" }}>{u.name}</span>
                    <span>{formatTime(m.time)}</span>
                  </div>
                  <div
                    className="rounded-[12px] px-[12px] py-[8px] text-[14px] leading-[1.4]"
                    style={{
                      background: mine ? "var(--accent)" : "var(--background-surface)",
                      color: mine ? "#fff" : "var(--foreground)",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <div
          className="flex items-end gap-[8px] border-t px-[12px] py-[10px]"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[10px] transition-colors hover:bg-[var(--background-surface)]"
            aria-label="Вложение"
          >
            <Paperclip className="h-[16px] w-[16px]" style={{ color: "var(--foreground-50)" }} />
          </button>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={`Написать в чат «${c.name}»…`}
            rows={1}
            className="min-h-[36px] max-h-[120px] flex-1 resize-none rounded-[10px] border px-[12px] py-[8px] text-[14px] outline-none focus:border-[var(--accent)]"
            style={{
              background: "var(--background-surface)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <button
            className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[10px] transition-colors hover:bg-[var(--background-surface)]"
            aria-label="Эмодзи"
          >
            <Smile className="h-[16px] w-[16px]" style={{ color: "var(--foreground-50)" }} />
          </button>
          <button
            onClick={send}
            disabled={!text.trim()}
            className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[10px] transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent)", color: "#fff" }}
            aria-label="Отправить"
          >
            <Send className="h-[16px] w-[16px]" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
