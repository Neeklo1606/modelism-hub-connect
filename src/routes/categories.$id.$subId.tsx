import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { categoryById, chatMessages as initial, userById, me, ads } from "@/lib/mock";
import type { Message } from "@/lib/mock";
import { Pin, Paperclip, Send } from "lucide-react";
import { AdCard } from "@/components/AdCard";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/categories/$id/$subId")({
  component: SubcategoryPage,
});

function SubcategoryPage() {
  const { id, subId } = Route.useParams();
  const c = categoryById(id);
  const sub = c?.subcategories.find((s) => s.id === subId);
  const [tab, setTab] = useState<"chat" | "ads">("chat");
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");

  if (!c || !sub) return <AppLayout rightColumn={false}><p>Не найдено</p></AppLayout>;

  const send = () => {
    if (!text.trim()) return;
    setMessages([...messages, { id: `nm${Date.now()}`, authorId: me.id, time: "сейчас", text }]);
    setText("");
  };

  const subAds = ads.filter((a) => a.category === c.name).slice(0, 4);

  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-4">
        <nav className="text-xs text-muted-foreground">
          <Link to="/categories" className="hover:text-primary">Категории</Link> / <Link to="/categories/$id" params={{ id: c.id }} className="hover:text-primary">{c.name}</Link> / {sub.name}
        </nav>
        <header>
          <h1 className="font-display text-2xl font-bold">{sub.name}</h1>
          <p className="text-sm text-muted-foreground">{c.name}</p>
        </header>

        <div className="grid grid-cols-2 rounded-lg bg-muted p-1">
          <button onClick={() => setTab("chat")} className={`rounded-md py-1.5 text-sm font-medium ${tab === "chat" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Чат</button>
          <button onClick={() => setTab("ads")} className={`rounded-md py-1.5 text-sm font-medium ${tab === "ads" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Объявления</button>
        </div>

        {tab === "chat" ? (
          <div className="rounded-xl border bg-card">
            <div className="flex items-start gap-2 border-b bg-accent/40 p-3 text-xs">
              <Pin className="h-4 w-4 shrink-0 text-primary" />
              <p><b>Правила чата:</b> уважение к участникам, без рекламы вне темы, по делу. Объявления — во вкладке «Объявления».</p>
            </div>
            <div className="max-h-[420px] space-y-3 overflow-y-auto p-4">
              {messages.length === 0 ? <EmptyState title="Пока пусто" description="Будьте первым, кто напишет в чат" /> : messages.map((m) => {
                const u = userById(m.authorId);
                const isMe = m.authorId === me.id;
                return (
                  <div key={m.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                    <img src={u.avatar} alt="" className="h-8 w-8 shrink-0 rounded-full" />
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <div className="mb-0.5 flex items-center gap-2 text-[10px] opacity-75">
                        <span className="font-medium">{u.name}</span><span>{m.time}</span>
                      </div>
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 border-t p-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted"><Paperclip className="h-4 w-4" /></button>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Написать сообщение..."
                className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm outline-none focus:bg-background focus:ring-1 focus:ring-primary"
              />
              <button onClick={send} className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        ) : (
          subAds.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {subAds.map((a) => <AdCard key={a.id} ad={a} />)}
            </div>
          ) : <EmptyState title="Нет объявлений" description="В этой подкатегории пока нет объявлений" />
        )}
      </div>
    </AppLayout>
  );
}
