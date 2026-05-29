import { Link, useRouterState } from "@tanstack/react-router";
import { Newspaper, MessageSquare, Plus, Megaphone, User } from "lucide-react";
import { useState } from "react";
import { CreateChooserModal } from "@/components/CreateChooserModal";

const items = [
  { to: "/", label: "Лента", icon: Newspaper },
  { to: "/messenger", label: "Чаты", icon: MessageSquare },
] as const;
const items2 = [
  { to: "/ads", label: "Объявления", icon: Megaphone },
  { to: "/profile", label: "Профиль", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur">
        <ul className="grid grid-cols-5 px-1 py-1.5">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link to={to} className={`flex flex-col items-center gap-0.5 py-1 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <button onClick={() => setOpen(true)} className="flex w-full flex-col items-center gap-0.5 py-1 text-[10px] text-primary-foreground">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary -mt-3 shadow-md">
                <Plus className="h-5 w-5" />
              </span>
              <span className="text-primary">Создать</span>
            </button>
          </li>
          {items2.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link to={to} className={`flex flex-col items-center gap-0.5 py-1 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <CreateChooserModal open={open} onOpenChange={setOpen} />
    </>
  );
}
