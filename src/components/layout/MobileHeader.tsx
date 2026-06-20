import { Link } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b bg-background/95 px-4 py-2.5 backdrop-blur">
      <Link to="/"><Logo /></Link>
      <div className="flex items-center gap-2">
        <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
          <Search className="h-4 w-4" />
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
          <Bell className="h-4 w-4" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
