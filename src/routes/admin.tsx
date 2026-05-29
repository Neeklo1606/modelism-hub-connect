import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { users, ads, posts, banners, tariffs, categories, communities } from "@/lib/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { Users, Layers, Megaphone, Newspaper, ImageIcon, CreditCard, Flag, Settings, Home, FolderTree, Check, X, Ban, Eye, Plus, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Админка — МоДелизМ Club" }] }),
  component: AdminPage,
});

type Section = "users" | "categories" | "subcategories" | "ads" | "posts" | "banners" | "tariffs" | "reports" | "settings";

const sections: { id: Section; label: string; icon: typeof Users }[] = [
  { id: "users", label: "Пользователи", icon: Users },
  { id: "categories", label: "Категории", icon: Layers },
  { id: "subcategories", label: "Подкатегории", icon: FolderTree },
  { id: "ads", label: "Объявления", icon: Megaphone },
  { id: "posts", label: "Публикации", icon: Newspaper },
  { id: "banners", label: "Реклама", icon: ImageIcon },
  { id: "tariffs", label: "Тарифы", icon: CreditCard },
  { id: "reports", label: "Жалобы", icon: Flag },
  { id: "settings", label: "Настройки", icon: Settings },
];

function AdminPage() {
  const [section, setSection] = useState<Section>("users");
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/95 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <Logo size={28} showText={false} />
          <span className="font-display text-sm font-semibold">Админ-панель</span>
        </div>
        <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs hover:bg-muted">
          <Home className="h-3.5 w-3.5" />К сайту
        </Link>
      </header>
      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r p-2 sm:block">
          <nav className="space-y-0.5">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setSection(s.id)} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${section === s.id ? "bg-accent text-primary font-medium" : "hover:bg-muted"}`}>
                <s.icon className="h-4 w-4" />{s.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mb-4 sm:hidden">
            <select value={section} onChange={(e) => setSection(e.target.value as Section)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
              {sections.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <Section name={section} />
        </main>
      </div>
    </div>
  );
}

function Section({ name }: { name: Section }) {
  if (name === "users") return <UsersTable />;
  if (name === "categories") return <CategoriesAdmin />;
  if (name === "subcategories") return <SubcategoriesAdmin />;
  if (name === "ads") return <AdsAdmin />;
  if (name === "posts") return <PostsAdmin />;
  if (name === "banners") return <BannersAdmin />;
  if (name === "tariffs") return <TariffsAdmin />;
  if (name === "reports") return <ReportsAdmin />;
  return <SettingsAdmin />;
}

function H({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-bold">{children}</h2>{action}</div>;
}

function UsersTable() {
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  return (
    <div>
      <H>Пользователи</H>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="p-3">Имя</th><th className="p-3">Контакт</th><th className="p-3">Подписка</th><th className="p-3">Регистрация</th><th className="p-3">Статус</th><th className="p-3">Действия</th></tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isBlocked = blocked.has(u.id);
              return (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="p-3"><div className="flex items-center gap-2"><img src={u.avatar} className="h-7 w-7 rounded-full" alt="" />{u.name}</div></td>
                  <td className="p-3 text-muted-foreground">user_{u.id}@modelizm.ru</td>
                  <td className="p-3">{u.subscription ?? "—"}</td>
                  <td className="p-3 text-muted-foreground">12.03.2025</td>
                  <td className="p-3">{isBlocked ? <StatusBadge variant="rejected">Заблокирован</StatusBadge> : <StatusBadge variant="published">Активен</StatusBadge>}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="rounded-md border p-1.5 hover:bg-muted"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => { const n = new Set(blocked); isBlocked ? n.delete(u.id) : n.add(u.id); setBlocked(n); toast.success(isBlocked ? "Разблокирован" : "Заблокирован"); }} className="rounded-md border p-1.5 hover:bg-muted"><Ban className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesAdmin() {
  return (
    <div>
      <H action={<button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"><Plus className="h-3.5 w-3.5" />Добавить</button>}>Категории</H>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[500px] text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Название</th><th className="p-3">Подкатегории</th><th className="p-3">Участники</th><th className="p-3">Действия</th></tr></thead>
          <tbody>{categories.map((c) => (
            <tr key={c.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{c.name}</td>
              <td className="p-3">{c.subcategories.length}</td>
              <td className="p-3 text-muted-foreground">{c.members.toLocaleString("ru")}</td>
              <td className="p-3"><div className="flex gap-1"><button className="rounded-md border px-2 py-1 text-xs hover:bg-muted">Изменить</button><button className="rounded-md border px-2 py-1 text-xs text-destructive hover:bg-destructive/10">Удалить</button></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function SubcategoriesAdmin() {
  return (
    <div>
      <H action={<button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"><Plus className="h-3.5 w-3.5" />Добавить</button>}>Подкатегории — Автомодели</H>
      <ul className="space-y-1">
        {categories[0].subcategories.map((s) => (
          <li key={s.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <span className="text-sm font-medium">{s.name}</span>
            <div className="flex gap-1">
              <button className="rounded-md border px-2 py-1 text-xs hover:bg-muted">Изменить</button>
              <button className="rounded-md border px-2 py-1 text-xs text-destructive hover:bg-destructive/10">Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdsAdmin() {
  const [statuses, setStatuses] = useState<Record<string, "published" | "moderation" | "rejected">>(() => Object.fromEntries(ads.map((a, i) => [a.id, i < 7 ? "published" : i === 7 ? "moderation" : "rejected"])));
  return (
    <div>
      <H>Объявления</H>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Объявление</th><th className="p-3">Автор</th><th className="p-3">Цена</th><th className="p-3">Категория</th><th className="p-3">Статус</th><th className="p-3">Действия</th></tr></thead>
          <tbody>{ads.map((a) => {
            const st = statuses[a.id];
            return (
              <tr key={a.id} className="border-b last:border-0">
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3 text-muted-foreground">{a.authorId}</td>
                <td className="p-3">{a.price.toLocaleString("ru")} ₽</td>
                <td className="p-3 text-muted-foreground">{a.category}</td>
                <td className="p-3"><StatusBadge variant={st}>{st === "published" ? "Опубликовано" : st === "moderation" ? "На модерации" : "Отклонено"}</StatusBadge></td>
                <td className="p-3"><div className="flex gap-1">
                  <button onClick={() => { setStatuses({ ...statuses, [a.id]: "published" }); toast.success("Одобрено"); }} className="rounded-md border p-1.5 hover:bg-success/10"><Check className="h-3.5 w-3.5 text-success" /></button>
                  <button onClick={() => { setStatuses({ ...statuses, [a.id]: "rejected" }); toast.error("Отклонено"); }} className="rounded-md border p-1.5 hover:bg-destructive/10"><X className="h-3.5 w-3.5 text-destructive" /></button>
                </div></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

function PostsAdmin() {
  return (
    <div>
      <H>Публикации</H>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Заголовок</th><th className="p-3">Автор</th><th className="p-3">Категория</th><th className="p-3">Статус</th><th className="p-3">Действия</th></tr></thead>
          <tbody>{posts.map((p, i) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{p.title}</td>
              <td className="p-3 text-muted-foreground">{p.authorId}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3"><StatusBadge variant={i < 8 ? "published" : "moderation"}>{i < 8 ? "Опубликовано" : "На модерации"}</StatusBadge></td>
              <td className="p-3"><div className="flex gap-1">
                <button onClick={() => toast.success("Одобрено")} className="rounded-md border p-1.5"><Check className="h-3.5 w-3.5 text-success" /></button>
                <button onClick={() => toast.error("Отклонено")} className="rounded-md border p-1.5"><X className="h-3.5 w-3.5 text-destructive" /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function BannersAdmin() {
  return (
    <div>
      <H action={<button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"><Plus className="h-3.5 w-3.5" />Добавить рекламу</button>}>Реклама</H>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="border-b bg-muted/50 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Название</th><th className="p-3">Начало</th><th className="p-3">Окончание</th><th className="p-3">Статус</th><th className="p-3">Действия</th></tr></thead>
          <tbody>{banners.map((b, i) => (
            <tr key={b.id} className="border-b last:border-0">
              <td className="p-3 font-medium">{b.title}</td>
              <td className="p-3 text-muted-foreground">01.06.2026</td>
              <td className="p-3 text-muted-foreground">{b.until}</td>
              <td className="p-3"><StatusBadge variant={i < 2 ? "published" : "default"}>{i < 2 ? "Активен" : "Выключен"}</StatusBadge></td>
              <td className="p-3"><button className="rounded-md border px-2 py-1 text-xs">Изменить</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function TariffsAdmin() {
  const [vals, setVals] = useState({ test: 1, month: 100, half: 500, year: 800, ad: 20 });
  return (
    <div>
      <H>Тарифы</H>
      <div className="grid max-w-md gap-3 rounded-xl border bg-card p-4">
        {([
          ["test", "Тестовый доступ (1 день), ₽"],
          ["month", "Месяц, ₽"],
          ["half", "Полгода, ₽"],
          ["year", "Год, ₽"],
          ["ad", "Размещение объявления, ₽"],
        ] as const).map(([k, label]) => (
          <label key={k} className="grid grid-cols-[1fr_120px] items-center gap-3 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <input type="number" value={vals[k]} onChange={(e) => setVals({ ...vals, [k]: +e.target.value })} className="rounded-lg border bg-background px-3 py-1.5 text-right" />
          </label>
        ))}
        <button onClick={() => toast.success("Тарифы сохранены")} className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          <Save className="h-3.5 w-3.5" />Сохранить
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Текущие значения по умолчанию: {tariffs.map((t) => `${t.name} — ${t.price}₽`).join(" · ")}</p>
    </div>
  );
}

function ReportsAdmin() {
  const rep = [
    { id: 1, from: "Сергей ДВС", target: "Объявление #a3", reason: "Подозрение на мошенничество" },
    { id: 2, from: "Михаил Квадро", target: "Пост #p4", reason: "Спам" },
    { id: 3, from: "Андрей Самолёты", target: "Пользователь Олег", reason: "Оскорбление" },
  ];
  return (
    <div>
      <H>Жалобы</H>
      <ul className="space-y-2">
        {rep.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-xl border bg-card p-3 text-sm">
            <div>
              <div className="font-medium">{r.target}</div>
              <div className="text-xs text-muted-foreground">От: {r.from} · {r.reason}</div>
            </div>
            <div className="flex gap-1">
              <button className="rounded-md border px-2 py-1 text-xs hover:bg-muted">Открыть</button>
              <button className="rounded-md border px-2 py-1 text-xs text-success hover:bg-success/10">Принять</button>
              <button className="rounded-md border px-2 py-1 text-xs text-destructive hover:bg-destructive/10">Отклонить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingsAdmin() {
  return (
    <div>
      <H>Настройки</H>
      <div className="grid max-w-md gap-3 rounded-xl border bg-card p-4 text-sm">
        <label className="grid gap-1"><span className="text-muted-foreground text-xs">Название проекта</span><input defaultValue="МоДелизМ Club" className="rounded-lg border bg-background px-3 py-1.5" /></label>
        <label className="grid gap-1"><span className="text-muted-foreground text-xs">Email поддержки</span><input defaultValue="support@modelizm-club.ru" className="rounded-lg border bg-background px-3 py-1.5" /></label>
        <label className="grid gap-1"><span className="text-muted-foreground text-xs">URL магазина</span><input defaultValue="https://modelizm23.ru" className="rounded-lg border bg-background px-3 py-1.5" /></label>
        <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" />Модерация постов вручную</label>
        <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" />Модерация объявлений вручную</label>
        <button onClick={() => toast.success("Настройки сохранены")} className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          <Save className="h-3.5 w-3.5" />Сохранить
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Сообществ всего: {communities.length}</p>
    </div>
  );
}
