import { Link, useRouterState } from "@tanstack/react-router";
import { Newspaper, MessageSquare, Plus, Megaphone, User } from "lucide-react";
import { useState } from "react";
import { CreateChooserModal } from "@/components/CreateChooserModal";
import { getActiveSection } from "@/lib/routes";

type Item = { to: "/" | "/messenger" | "/ads" | "/profile"; label: string; icon: typeof Newspaper; section: string };


const LEFT: Item[] = [
  { to: "/", label: "Лента", icon: Newspaper, section: "feed" },
  { to: "/messenger", label: "Чаты", icon: MessageSquare, section: "messenger" },
];
const RIGHT: Item[] = [
  { to: "/ads", label: "Объявления", icon: Megaphone, section: "ads" },
  { to: "/profile", label: "Профиль", icon: User, section: "profile" },
];


export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeSection = getActiveSection(pathname);
  const [open, setOpen] = useState(false);


  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: "color-mix(in oklab, var(--background) 94%, transparent)",
          backdropFilter: "saturate(180%) blur(14px)",
          WebkitBackdropFilter: "saturate(180%) blur(14px)",
          borderTop: "1px solid var(--border)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <ul className="grid grid-cols-5 items-center" style={{ height: 60 }}>
          {LEFT.map((it) => <NavTab key={it.to} item={it} active={activeSection === it.section} />)}
          <li className="flex items-center justify-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Создать"
              className="grid place-items-center transition-transform duration-150 active:scale-95"
              style={{
                width: 44, height: 44,
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 14,
                boxShadow: "0 6px 16px -4px color-mix(in oklab, var(--accent) 55%, transparent)",
              }}
            >
              <Plus size={22} strokeWidth={2.4} />
            </button>
          </li>
          {RIGHT.map((it) => <NavTab key={it.to} item={it} active={pathname === it.to || (it.to === "/profile" && pathname.startsWith("/profile"))} />)}
        </ul>
      </nav>
      <CreateChooserModal open={open} onOpenChange={setOpen} />
    </>
  );
}

function NavTab({ item, active }: { item: Item; active: boolean }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        to={item.to}
        className="flex h-full flex-col items-center justify-center gap-[3px] transition-colors duration-150"
        style={{
          color: active ? "var(--accent)" : "var(--foreground-50)",
          height: 60,
        }}
      >
        <Icon size={22} strokeWidth={active ? 2.4 : 2} />
        <span
          className="font-medium"
          style={{ fontSize: 10.5, letterSpacing: "0.01em", lineHeight: 1 }}
        >
          {item.label}
        </span>
      </Link>
    </li>
  );
}
