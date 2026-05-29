import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { dialogs as initial, userById, me } from "@/lib/mock";
import type { Message } from "@/lib/mock";
import { Send, Search } from "lucide-react";

export const Route = createFileRoute("/messenger")({
  head: () => ({ meta: [{ title: "Мессенджер — МоДелизМ Club" }] }),
  component: MessengerPage,
});

function MessengerPage() {
  const [dlgs, setDlgs] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0].id);
  const [text, setText] = useState("");
  const active = dlgs.find((d) => d.id === activeId)!;
  const partner = userById(active.userId);

  const send = () => {
    if (!text.trim()) return;
    const m: Message = { id: `mm${Date.now()}`, authorId: me.id, time: "сейчас", text };
    setDlgs(dlgs.map((d) => d.id === activeId ? { ...d, messages: [...d.messages, m], lastMessage: text, time: "сейчас" } : d));
    setText("");
  };

  return (
    <AppLayout rightColumn={false}>
      <div className="grid h-[calc(100vh-9rem)] grid-cols-1 gap-3 sm:h-[calc(100vh-7rem)] sm:grid-cols-[280px_1fr]">
        <aside className="overflow-y-auto rounded-xl border bg-card">
          <div className="sticky top-0 border-b bg-card p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input placeholder="Поиск диалога" className="w-full rounded-lg border bg-background py-2 pl-8 pr-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <ul>
            {dlgs.map((d) => {
              const u = userById(d.userId);
              const active = d.id === activeId;
              return (
                <li key={d.id}>
                  <button onClick={() => setActiveId(d.id)} className={`flex w-full items-center gap-3 border-b px-3 py-3 text-left hover:bg-muted ${active ? "bg-accent" : ""}`}>
                    <img src={u.avatar} alt="" className="h-10 w-10 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium">{u.name}</span>
                        <span className="text-[10px] text-muted-foreground">{d.time}</span>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{d.lastMessage}</div>
                    </div>
                    {d.unread && <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{d.unread}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="flex min-h-0 flex-col rounded-xl border bg-card">
          <header className="flex items-center gap-3 border-b p-3">
            <img src={partner.avatar} alt="" className="h-9 w-9 rounded-full" />
            <div>
              <div className="text-sm font-medium">{partner.name}</div>
              <div className="text-[11px] text-muted-foreground">{partner.city} · {partner.interests}</div>
            </div>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {active.messages.map((m) => {
              const isMe = m.authorId === me.id;
              return (
                <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {m.text}
                    <div className="mt-1 text-[10px] opacity-70">{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 border-t p-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Сообщение..."
              className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm outline-none focus:bg-background focus:ring-1 focus:ring-primary"
            />
            <button onClick={send} className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90"><Send className="h-4 w-4" /></button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
