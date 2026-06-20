import { Link, useRouterState } from "@tanstack/react-router";
import { Newspaper, Users2, MessageSquare, Megaphone, UserPlus, User, ShoppingBag, HelpCircle, ExternalLink } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";


const items = [
  { to: "/", label: "Лента", icon: Newspaper },
  { to: "/communities", label: "Сообщества", icon: Users2 },
  { to: "/messenger", label: "Мессенджер", icon: MessageSquare },
  { to: "/ads", label: "Объявления", icon: Megaphone },
  { to: "/friends", label: "Друзья", icon: UserPlus },
  { to: "/profile", label: "Профиль", icon: User },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-4 space-y-1">
        <div className="flex items-center justify-between px-3 py-3">
          <Link to="/"><Logo /></Link>
          <ThemeToggle />
        </div>
        <nav className="space-y-0.5">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-accent text-primary font-medium" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
          <a
            href="https://modelizm23.ru"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4" />
              Маркет
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
          >
            <HelpCircle className="h-4 w-4" />
            Помощь
          </a>
        </nav>
        <div className="mt-4 rounded-xl border bg-card p-3">
          <div className="text-xs text-muted-foreground">Подписка</div>
          <div className="mt-1 text-sm font-medium">Год · активна</div>
          <Link to="/subscription" className="mt-2 inline-block text-xs text-primary hover:underline">
            Управлять
          </Link>
        </div>
      </div>
    </aside>
  );
}
